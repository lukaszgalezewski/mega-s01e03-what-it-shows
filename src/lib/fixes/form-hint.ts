// Fix for issue #2: on `booking-v3`, the form printed `MM/DD/YYYY` as a hint but then parsed
// what people typed as if it were day-first for a day-first-locale tenant — the opposite of
// what the hint told them to type.
//
// Before: the form always parsed the field in the tenant's locale order, ignoring its own
// printed hint.
// After: the form parses the field in the order its own hint says, because that is the order
// its own users were told to type in.

type FormId = 'booking-v2' | 'booking-v3';

const DATE_HINT: Record<FormId, 'DD/MM/YYYY' | 'MM/DD/YYYY'> = {
  'booking-v2': 'DD/MM/YYYY',
  'booking-v3': 'MM/DD/YYYY',
};

export function parseFormDate(raw: string, form: FormId, year: number): Date {
  const [a, b] = raw.split('/').map(Number);
  const hintIsMonthFirst = DATE_HINT[form].startsWith('MM');
  const [month, day] = hintIsMonthFirst ? [a, b] : [b, a];
  return new Date(Date.UTC(year, month - 1, day, 12));
}
