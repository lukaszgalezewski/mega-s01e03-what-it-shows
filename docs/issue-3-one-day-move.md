# Issue #3 · one-day-move investigation

5 reports (`R-41202`, `R-41209`, `R-41236`, `R-41344`, `R-41620`) described a date that was off
by exactly one day, with no month/day transposition: the pattern that `parser` (issue #1) and
`hint` (issue #2) both produce.

Reading the five together:

- `R-41209` (alder.physio): "Every booking in June is one day off. Only June."
- `R-41344` (pale.harbour): a Lisbon attendee and a Toronto attendee got different days for the
  same meeting.
- `R-41202`, `R-41236`, `R-41620`: a single day's booking landed on the day before it should.

None of these move by a month; all of them move by exactly one day, and one ties the shift to a
pair of time zones on the same meeting. That points at a day boundary computed in the wrong time
zone — the invite's date is taken from a UTC timestamp without converting to the tenant's local
time first, so a booking made late in the tenant's day (after local midnight UTC) prints the UTC
calendar day, one day behind the tenant's own.

This is why it is its own ticket: fixing `parser` or `hint` does nothing for these five, because
their dates were never transposed. The fix is to compute the invite date in the tenant's own time
zone, not UTC.
