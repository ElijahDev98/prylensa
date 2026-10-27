export interface OfferFreshness {
  label: string;
  title: string;
  isStale: boolean;
}

export function getOfferFreshness(
  observedAt: string | undefined,
  dataSource: "live" | "persisted-snapshot",
  now = Date.now(),
): OfferFreshness {
  const observedTime = observedAt ? Date.parse(observedAt) : Number.NaN;
  if (!Number.isFinite(observedTime)) {
    return {
      label: dataSource === "live" ? "Live provider result" : "Stored observation",
      title: "The marketplace did not provide a precise observation time.",
      isStale: dataSource === "persisted-snapshot",
    };
  }

  const ageMs = Math.max(0, now - observedTime);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const relative =
    ageMs < minute
      ? "just now"
      : ageMs < hour
        ? `${Math.floor(ageMs / minute)} min ago`
        : ageMs < day
          ? `${Math.floor(ageMs / hour)} hr ago`
          : `${Math.floor(ageMs / day)} day${Math.floor(ageMs / day) === 1 ? "" : "s"} ago`;
  const prefix = dataSource === "live" ? "Observed" : "Snapshot from";

  return {
    label: `${prefix} ${relative}`,
    title: `Marketplace observation: ${new Date(observedTime).toLocaleString()}`,
    isStale: ageMs >= day,
  };
}
