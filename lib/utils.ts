export function formatDate(dateStr: string): string {
  try {
    const timestamp = Date.parse(dateStr);
    if (isNaN(timestamp)) return dateStr;
    return new Date(timestamp).toLocaleDateString("en-EN", {
      year: "numeric",
      month: "long",
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
    return new Date(timestamp).getFullYear().toString();
  } catch {
    return dateStr;
  }
}
