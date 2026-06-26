export function formatDate(dateStr: string): string {
  try {
    const timestamp = Date.parse(dateStr);
    if (isNaN(timestamp)) return dateStr;
    return new Date(timestamp).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch {
    return dateStr;
  }
}

export function formatYear(dateStr: string): string {
  try {
    if (/^\d{4}$/.test(dateStr)) return dateStr;
    const timestamp = Date.parse(dateStr);
    if (isNaN(timestamp)) return dateStr;
    return new Date(timestamp).getUTCFullYear().toString();
  } catch {
    return dateStr;
  }
}
