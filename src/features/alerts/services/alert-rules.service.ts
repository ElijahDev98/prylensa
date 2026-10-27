import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

export type AlertRuleType =
  | "price-drop"
  | "price-increase"
  | "quality-improvement"
  | "best-price-change"
  | "restock";

export interface AlertRule {
  id: string;
  name: string;
  productQuery: string;
  type: AlertRuleType;
  threshold: number;
  description: string;
  enabled: boolean;
  createdAt: string;
  lastEvaluatedAt?: string | null;
  lastTriggeredAt?: string | null;
}

export interface AlertNotification {
  id: string;
  alertId: string;
  title: string;
  message: string;
  productQuery: string;
  eventType: string;
  read: boolean;
  triggeredAt: string;
}

export interface CreateAlertRuleInput {
  name?: string;
  productQuery: string;
  type: AlertRuleType;
  threshold: number;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

async function readApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Alert request failed (${response.status}).`);
  }
  const body = (await response.json()) as ApiResponse<T>;
  if (!body.success) throw new Error("Alert request was unsuccessful.");
  return body.data;
}

export async function fetchAlertRules(userId: string): Promise<AlertRule[]> {
  void userId;
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/alerts`);
  return readApiResponse<AlertRule[]>(response);
}

export async function persistAlertRule(
  userId: string,
  input: CreateAlertRuleInput,
): Promise<AlertRule> {
  void userId;
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/alerts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readApiResponse<AlertRule>(response);
}

export async function updateAlertRule(
  userId: string,
  id: string,
  input: Partial<Pick<AlertRule, "name" | "productQuery" | "type" | "threshold" | "enabled">>,
): Promise<AlertRule> {
  void userId;
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/alerts/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    },
  );
  return readApiResponse<AlertRule>(response);
}

export async function deleteAlertRule(userId: string, id: string): Promise<void> {
  void userId;
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/alerts/${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
  if (!response.ok) throw new Error(`Unable to delete alert (${response.status}).`);
}

export async function evaluateAlertRules(userId: string): Promise<number> {
  void userId;
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/alerts/actions/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const data = await readApiResponse<{ triggered: number }>(response);
  return data.triggered;
}

export async function fetchAlertNotifications(
  userId: string,
  limit = 20,
): Promise<AlertNotification[]> {
  void userId;
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/alerts/events/notifications?limit=${limit}`,
  );
  return readApiResponse<AlertNotification[]>(response);
}

export async function markAlertNotificationRead(
  userId: string,
  id: string,
): Promise<void> {
  void userId;
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/alerts/events/notifications/${encodeURIComponent(id)}/read`,
    { method: "PATCH" },
  );
  if (!response.ok) throw new Error(`Unable to update notification (${response.status}).`);
}

export async function subscribeAlertNotifications(
  onNotification: (notification: AlertNotification) => void,
  signal: AbortSignal,
): Promise<void> {
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/alerts/events/stream`, {
    headers: { Accept: "text/event-stream" },
    signal,
  });
  if (!response.ok || !response.body) {
    throw new Error(`Unable to subscribe to alerts (${response.status}).`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (!signal.aborted) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      const event = frame.split("\n").find((line) => line.startsWith("event:"))?.slice(6).trim();
      const data = frame.split("\n").find((line) => line.startsWith("data:"))?.slice(5).trim();
      if (event === "notification" && data) {
        onNotification(JSON.parse(data) as AlertNotification);
      }
    }
  }
}
