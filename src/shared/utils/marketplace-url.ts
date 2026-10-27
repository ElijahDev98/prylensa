export function toExternalMarketplaceProductUrl(
  productUrl: string,
  storeId: string,
): string {
  if (!storeId.toLowerCase().includes("slot")) {
    return productUrl;
  }

  try {
    const url = new URL(productUrl);
    const storagePrefix = "/storage/";

    if (
      url.hostname !== "api-prod.slot.ng" ||
      !url.pathname.startsWith(storagePrefix) ||
      url.pathname.startsWith(`${storagePrefix}uploads/`)
    ) {
      return productUrl;
    }

    const slug = url.pathname.slice(storagePrefix.length).replace(/^\/+/, "");

    return slug ? `https://slot.ng/products/${slug}` : productUrl;
  } catch {
    return productUrl;
  }
}
