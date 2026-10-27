import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

interface AiTrainingDatasetExport {
  version: string;
  dataset_strategy: string;
  generated_at: string;
  source_record_count: number;
  record_count: number;
  feature_columns: string[];
  target_column: string;
  records: Array<Record<string, unknown>>;
}

interface BackendResponse<T> {
  success: boolean;
  data: T;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

const DATASET_COLUMNS = [
  "observation_id",
  "search_id",
  "query",
  "normalized_query",
  "canonical_product_id",
  "marketplace",
  "external_offer_id",
  "external_product_id",
  "title",
  "normalized_title",
  "brand",
  "category",
  "model_number",
  "gtin",
  "price",
  "original_price",
  "currency",
  "rating",
  "review_count",
  "in_stock",
  "relevance_score",
  "confidence_score",
  "evaluation_score",
  "discount_percentage",
  "price_to_group_average",
  "query_title_overlap",
  "data_quality_score",
  "observation_count",
  "observed_at",
  "first_observed_at",
  "last_observed_at",
  "target_is_best_offer",
] as const;

export async function exportAiTrainingDataset(): Promise<void> {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/marketplace/ai-dataset-export`,
  );

  if (!response.ok) {
    throw new Error(`Unable to export the AI dataset (${response.status}).`);
  }

  const body = (await response.json()) as BackendResponse<AiTrainingDatasetExport>;
  if (!body.success || !body.data || !Array.isArray(body.data.records)) {
    throw new Error("The AI dataset export returned an invalid response.");
  }
  if (body.data.records.length === 0) {
    throw new Error("The AI dataset does not contain any observations yet.");
  }

  const csv = buildDatasetCsv(body.data);
  const date = body.data.generated_at.slice(0, 10);
  downloadCsv(csv, `prylensa-ai-training-dataset-${date}.csv`);
}

function buildDatasetCsv(dataset: AiTrainingDatasetExport): string {
  const metadataColumns = [
    "dataset_version",
    "dataset_strategy",
    "dataset_generated_at",
  ];
  const discoveredColumns = dataset.records.flatMap((record) => Object.keys(record));
  const extraColumns = [...new Set(discoveredColumns)].filter(
    (column) => !DATASET_COLUMNS.includes(column as (typeof DATASET_COLUMNS)[number]),
  );
  const columns = [...metadataColumns, ...DATASET_COLUMNS, ...extraColumns];
  const lines = [columns.map(escapeCsvValue).join(",")];

  for (const record of dataset.records) {
    const row: Record<string, unknown> = {
      dataset_version: dataset.version,
      dataset_strategy: dataset.dataset_strategy,
      dataset_generated_at: dataset.generated_at,
      ...record,
    };
    lines.push(columns.map((column) => escapeCsvValue(row[column])).join(","));
  }

  return `\uFEFF${lines.join("\r\n")}`;
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
