const MATCHED_STORE_SEPARATOR = "::";

export function getComparisonGroupId(productId: string): string {
  const separatorIndex = productId.lastIndexOf(MATCHED_STORE_SEPARATOR);

  return separatorIndex === -1
    ? productId
    : productId.slice(0, separatorIndex);
}
