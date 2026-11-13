// Published national public-school calendar, applicable to Eastern Cape.
// School admission dates are separate and must be confirmed by the school.
export const INTAKE_YEAR = "2027";
export const CALENDAR_SOURCE = "https://www.education.gov.za/portals/0/documents/publications/2025/Published%202027%20School%20Calendar.pdf";
export const SCHOOL_TERMS = [
  { name: "Term 1", dates: "13 January - 19 March", start: "2027-01-13", end: "2027-03-19" },
  { name: "Term 2", dates: "6 April - 25 June", start: "2027-04-06", end: "2027-06-25" },
  { name: "Term 3", dates: "20 July - 22 September", start: "2027-07-20", end: "2027-09-22" },
  { name: "Term 4", dates: "5 October - 8 December", start: "2027-10-05", end: "2027-12-08" },
] as const;
