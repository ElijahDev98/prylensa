/**
 * -----------------------------------------------------------------------------
 * File: HeaderNotification.tsx
 * Feature: Header
 *
 * Purpose:
 * Displays notification summaries in the application header.
 * -----------------------------------------------------------------------------
 */

import { Bell, CircleAlert, TrendingDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { useGuestSession } from "@/features/auth";
import {
  fetchAlertNotifications,
  markAlertNotificationRead,
  subscribeAlertNotifications,
  type AlertNotification,
} from "@/features/alerts/services/alert-rules.service";
import { subscribeProductIntelligence } from "@/features/product-intelligence";

function HeaderNotification() {
  const navigate = useNavigate();
  const { session } = useGuestSession();
  const [notifications, setNotifications] = useState<AlertNotification[]>([]);

  const refreshNotifications = useCallback(async () => {
    if (!session) {
      setNotifications([]);
      return;
    }

    try {
      setNotifications(await fetchAlertNotifications(session.user.id, 10));
    } catch {
      // Header notifications remain quiet while the backend is unavailable.
    }
  }, [session]);

  useEffect(() => {
    queueMicrotask(() => void refreshNotifications());
    const unsubscribeIntelligence = subscribeProductIntelligence(() => void refreshNotifications());
    const controller = new AbortController();
    if (session) {
      void subscribeAlertNotifications((notification) => {
        setNotifications((current) => [
          notification,
          ...current.filter((item) => item.id !== notification.id),
        ].slice(0, 10));
      }, controller.signal).catch(() => {
        // Initial loading and local search events remain graceful fallbacks.
      });
    }

    return () => {
      controller.abort();
      unsubscribeIntelligence();
    };
  }, [refreshNotifications, session]);

  const unreadCount = notifications.filter((item) => !item.read).length;

  const openNotification = useCallback(
    async (notification: AlertNotification) => {
      if (session && !notification.read) {
        try {
          await markAlertNotificationRead(session.user.id, notification.id);
          setNotifications((current) =>
            current.map((item) =>
              item.id === notification.id ? { ...item, read: true } : item,
            ),
          );
        } catch {
          // Navigation remains available if read-state synchronization fails.
        }
      }
      navigate(ROUTES.ALERTS);
    },
    [navigate, session],
  );

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          aria-label={`${unreadCount} unread notifications`}
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-700
            transition-colors
            hover:bg-slate-100
          "
        >
          <Bell size={18} />

          {unreadCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"
            />
          )}
        </button>
      </DropdownTrigger>

      <DropdownContent className="min-w-80">
        <DropdownLabel>Notifications</DropdownLabel>

        {notifications.length === 0 ? (
          <DropdownItem
            leftIcon={<CircleAlert size={16} />}
            onSelect={() => navigate(ROUTES.ALERTS)}
          >
            No triggered alerts
          </DropdownItem>
        ) : (
          notifications.slice(0, 3).map((notification) => (
            <DropdownItem
              key={notification.id}
              leftIcon={<TrendingDown size={16} />}
              onSelect={() => void openNotification(notification)}
            >
              {notification.title}
            </DropdownItem>
          ))
        )}

        <DropdownSeparator />

        <DropdownItem onSelect={() => navigate(ROUTES.ALERTS)}>
          View all alerts
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export default HeaderNotification;
