/**
 * Reads a Prylensa storage value and migrates its legacy Priciq value once.
 */
export function readMigratedStorageValue(
  storageKey: string,
  legacyStorageKey: string,
): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const currentValue = window.localStorage.getItem(storageKey);
  if (currentValue !== null) {
    return currentValue;
  }

  const legacyValue = window.localStorage.getItem(legacyStorageKey);
  if (legacyValue === null) {
    return null;
  }

  window.localStorage.setItem(storageKey, legacyValue);
  window.localStorage.removeItem(legacyStorageKey);
  return legacyValue;
}

export function removeMigratedStorageValue(
  storageKey: string,
  legacyStorageKey: string,
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(storageKey);
  window.localStorage.removeItem(legacyStorageKey);
}
