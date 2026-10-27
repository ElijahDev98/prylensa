export type VisualRecognitionSource = "text" | "barcode" | "filename" | "none";

export interface VisualRecognitionResult {
  query: string;
  source: VisualRecognitionSource;
}

function normalizeQuery(value: string): string {
  return value
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[^\p{L}\p{N}\s+&.,'()\-/]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function queryFromFileName(file: Blob): string {
  if (!(file instanceof File)) {
    return "";
  }

  const candidate = normalizeQuery(
    file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\b(?:img|image|photo|picture|screenshot|dsc)\b/gi, " ")
      .replace(/\b\d{6,}\b/g, " "),
  );

  return /\p{L}{2,}/u.test(candidate) ? candidate : "";
}

async function detectText(source: ImageBitmap): Promise<string> {
  if (!window.TextDetector) {
    return "";
  }

  try {
    const blocks = await new window.TextDetector().detect(source);
    return normalizeQuery(blocks.map((block) => block.rawValue).join(" "));
  } catch {
    return "";
  }
}

async function detectBarcode(source: ImageBitmap): Promise<string> {
  if (!window.BarcodeDetector) {
    return "";
  }

  try {
    const barcodes = await new window.BarcodeDetector().detect(source);
    return normalizeQuery(barcodes[0]?.rawValue ?? "");
  } catch {
    return "";
  }
}

export async function recognizeProductImage(
  image: Blob,
): Promise<VisualRecognitionResult> {
  const bitmap = await createImageBitmap(image);

  try {
    const [text, barcode] = await Promise.all([
      detectText(bitmap),
      detectBarcode(bitmap),
    ]);

    if (text.length >= 3) {
      return { query: text, source: "text" };
    }

    if (barcode.length > 0) {
      return { query: barcode, source: "barcode" };
    }

    const filename = queryFromFileName(image);

    return filename.length > 0
      ? { query: filename, source: "filename" }
      : { query: "", source: "none" };
  } finally {
    bitmap.close();
  }
}

