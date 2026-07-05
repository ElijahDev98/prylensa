import type { DashboardMetric } from "../types/dashboard.types";

export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    id: "stores",
    label: "Connected Stores",
    value: "12",
    change: "+2",
  },
  {
    id: "products",
    label: "Tracked Products",
    value: "4,382",
    change: "+214",
  },
  {
    id: "savings",
    label: "Average Savings",
    value: "₦18,500",
    change: "+8%",
  },
  {
    id: "alerts",
    label: "Price Alerts",
    value: "23",
    change: "+5",
  },
];
