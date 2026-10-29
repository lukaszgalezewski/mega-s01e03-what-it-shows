// Fix for issue #1: the shared parser read every date month-first.
// This makes it locale-aware: it reads day-first for day-first locales, as `dayFirst()`
// (support kb, `src/lib/kb/causes.ts`) already detects per tenant.

export function dayFirst(locale: string): boolean {
  const order = new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(new Date(Date.UTC(2026, 0, 2, 12)))
    .map((p) => p.type);
  return order.indexOf('day') < order.indexOf('month');
}

// Before: Date.parse(`${a}/${b}/${year}`) always read a as month, b as day.
// After: read in the order the tenant's locale actually writes dates.
export function parseTenantDate(raw: string, locale: string, year: number): Date {
  const [a, b] = raw.split('/').map(Number);
  const [month, day] = dayFirst(locale) ? [b, a] : [a, b];
  return new Date(Date.UTC(year, month - 1, day, 12));
}
