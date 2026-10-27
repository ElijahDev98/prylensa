import {
  Bell,
  BellOff,
  BellRing,
  Plus,
  Settings,
  Trash2,
  TrendingDown,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";
import useDashboard from "@/features/dashboard/hooks/useDashboard";
import { usePreferences } from "@/features/settings";
import { useGuestSession } from "@/features/auth";

import {
  deleteAlertRule,
  evaluateAlertRules,
  fetchAlertRules,
  persistAlertRule,
  updateAlertRule,
} from "./services/alert-rules.service";

import type {
  AlertRule,
  AlertRuleType,
} from "./services/alert-rules.service";

const PERCENTAGE_RULES: AlertRuleType[] = ["price-drop", "price-increase"];

function AlertsPage() {
  const dashboard = useDashboard();
  const { session } = useGuestSession();
  const preferences = usePreferences();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const suggestedProduct = searchParams.get("product")?.trim() ?? "";
  const suggestedType = searchParams.get("type") as AlertRuleType | null;
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [creatingRule, setCreatingRule] = useState(suggestedProduct.length > 0);
  const [newRuleName, setNewRuleName] = useState("");
  const [newRuleProduct, setNewRuleProduct] = useState(suggestedProduct);
  const [newRuleType, setNewRuleType] = useState<AlertRuleType>(
    suggestedType ?? "price-drop",
  );
  const [newRuleThreshold, setNewRuleThreshold] = useState("10");
  const [formError, setFormError] = useState("");
  const [syncError, setSyncError] = useState("");
  const [rulesLoading, setRulesLoading] = useState(false);

  const userId = session?.user.id;

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      setRulesLoading(true);
      setSyncError("");

      void evaluateAlertRules(userId)
        .then(() => fetchAlertRules(userId))
        .then((remoteRules) => {
          if (!cancelled) setRules(remoteRules);
        })
        .catch(() => {
          if (!cancelled) {
            setSyncError("Alert rules could not be loaded. Please retry when the service is available.");
          }
        })
        .finally(() => {
          if (!cancelled) setRulesLoading(false);
        });
    });

    return () => { cancelled = true; };
  }, [userId]);

  async function saveRule() {
    const threshold = Number(newRuleThreshold);

    if (!newRuleProduct.trim()) {
      setFormError("Choose a product or search phrase to monitor.");
      return;
    }

    if (PERCENTAGE_RULES.includes(newRuleType) && (!Number.isFinite(threshold) || threshold <= 0)) {
      setFormError("Enter a threshold greater than zero.");
      return;
    }

    const input = {
      name: newRuleName,
      productQuery: newRuleProduct,
      type: newRuleType,
      threshold: PERCENTAGE_RULES.includes(newRuleType) ? threshold : 0,
    };
    if (!userId) {
      setSyncError("Sign in to create an alert rule.");
      return;
    }

    let rule: AlertRule;
    try {
      rule = await persistAlertRule(userId, input);
      setSyncError("");
    } catch {
      setSyncError("The alert rule could not be saved. Please try again.");
      return;
    }

    setRules((current) => [rule, ...current]);
    setNewRuleName("");
    setNewRuleProduct("");
    setNewRuleType("price-drop");
    setNewRuleThreshold("10");
    setFormError("");
    setCreatingRule(false);
  }

  async function removeRule(rule: AlertRule) {
    setRules((current) => current.filter((item) => item.id !== rule.id));
    if (!userId) return;
    try {
      await deleteAlertRule(userId, rule.id);
      setSyncError("");
    } catch {
      setRules((current) => [rule, ...current]);
      setSyncError("The alert rule could not be deleted from the backend.");
    }
  }

  async function toggleRule(rule: AlertRule) {
    const enabled = !rule.enabled;
    setRules((current) => current.map((item) => item.id === rule.id ? { ...item, enabled } : item));
    if (!userId) return;
    try {
      const updated = await updateAlertRule(userId, rule.id, { enabled });
      setRules((current) => current.map((item) => item.id === rule.id ? updated : item));
      setSyncError("");
    } catch {
      setRules((current) => current.map((item) => item.id === rule.id ? rule : item));
      setSyncError("The alert rule status could not be synchronized.");
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
      <header className="border-b border-slate-200 bg-white px-1 pb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600">
              <Bell size={25} />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-600">Monitoring</p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-950">Alerts</h1>
              <p className="mt-2 text-sm text-slate-500">
                Live price movement and product-specific monitoring rules.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCreatingRule((current) => !current)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {creatingRule ? <X size={17} /> : <Plus size={17} />}
            {creatingRule ? "Close" : "New Alert Rule"}
          </button>
        </div>
      </header>

      {!preferences.notificationsEnabled && (
        <section className="flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-amber-800">
            <BellOff size={19} />
            <p className="text-sm font-medium">Alert notifications are paused globally.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(ROUTES.SETTINGS)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800"
          >
            <Settings size={16} /> Settings
          </button>
        </section>
      )}

      {(rulesLoading || syncError) && (
        <p
          role={syncError ? "alert" : "status"}
          className={`text-sm ${syncError ? "text-amber-700" : "text-slate-500"}`}
        >
          {syncError || "Synchronizing alert rules..."}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="mb-5 flex items-center gap-3">
            <TrendingDown size={22} className="text-emerald-600" />
            <h2 className="text-lg font-semibold text-slate-900">Live Price Activity</h2>
          </div>
          {dashboard.loading ? (
            <p className="text-sm text-slate-500">Loading alert activity...</p>
          ) : dashboard.priceAlerts.length === 0 ? (
            <div className="max-w-xl text-sm leading-6 text-slate-500">
              <p>No qualifying price changes detected yet.</p>
              <p className="mt-1">
                Activity appears after a monitored listing is observed at a
                different price and meets its alert-rule threshold.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {dashboard.priceAlerts.map((alert) => (
                <article key={alert.id} className="flex items-start justify-between gap-4 py-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">{alert.product}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {alert.store} moved from {alert.previousPriceLabel} to {alert.currentPriceLabel}
                    </p>
                  </div>
                  <span className={`text-sm font-semibold ${alert.directionColor}`}>
                    {alert.direction === "down" ? "Drop" : "Increase"}
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="border-l-0 border-slate-200 lg:col-span-5 lg:border-l lg:pl-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <BellRing size={22} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-900">Alert Rules</h2>
            </div>
            <span className="text-sm text-slate-500">
              {rules.filter((rule) => rule.enabled).length} active
            </span>
          </div>

          {creatingRule && (
            <form
              className="mb-5 space-y-3 rounded-lg border border-blue-100 bg-blue-50 p-4"
              onSubmit={(event) => {
                event.preventDefault();
                void saveRule();
              }}
            >
              <label className="block text-sm font-medium text-slate-700">
                Product
                <input
                  value={newRuleProduct}
                  onChange={(event) => setNewRuleProduct(event.target.value)}
                  placeholder="Samsung Galaxy A56"
                  className="mt-2 w-full rounded-lg border border-blue-100 bg-white px-3 py-2 outline-none focus:border-blue-500"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Rule name <span className="font-normal text-slate-400">Optional</span>
                <input
                  value={newRuleName}
                  onChange={(event) => setNewRuleName(event.target.value)}
                  placeholder="Phone deal watch"
                  className="mt-2 w-full rounded-lg border border-blue-100 bg-white px-3 py-2 outline-none focus:border-blue-500"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Trigger
                  <select
                    value={newRuleType}
                    onChange={(event) => setNewRuleType(event.target.value as AlertRuleType)}
                    className="mt-2 w-full rounded-lg border border-blue-100 bg-white px-3 py-2"
                  >
                    <option value="price-drop">Price drop</option>
                    <option value="price-increase">Price increase</option>
                    <option value="restock">Back in stock</option>
                    <option value="quality-improvement">Quality improvement</option>
                    <option value="best-price-change">Best price change</option>
                  </select>
                </label>
                {PERCENTAGE_RULES.includes(newRuleType) && (
                  <label className="block text-sm font-medium text-slate-700">
                    Threshold (%)
                    <input
                      value={newRuleThreshold}
                      onChange={(event) => setNewRuleThreshold(event.target.value)}
                      type="number"
                      min="0.1"
                      step="0.1"
                      className="mt-2 w-full rounded-lg border border-blue-100 bg-white px-3 py-2"
                    />
                  </label>
                )}
              </div>
              {formError && <p className="text-sm font-medium text-red-700">{formError}</p>}
              <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Save Rule
              </button>
            </form>
          )}

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {rules.map((rule) => (
              <article key={rule.id} className="flex items-start gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{rule.name}</h3>
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                      {rule.productQuery}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{rule.description}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Delete ${rule.name}`}
                  title="Delete alert rule"
                  onClick={() => void removeRule(rule)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  type="button"
                  aria-label={`${rule.enabled ? "Pause" : "Enable"} ${rule.name}`}
                  aria-pressed={rule.enabled}
                  onClick={() => void toggleRule(rule)}
                  className={`h-6 w-11 shrink-0 rounded-full p-1 ${rule.enabled ? "bg-blue-600" : "bg-slate-300"}`}
                >
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${rule.enabled ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

export default AlertsPage;
