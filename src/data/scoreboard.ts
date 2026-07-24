export type Status = "queued" | "building" | "shipped" | "killed" | "tbd";

export interface ScoreboardEntry {
  /** Month index 1–12 (Aug 2026 = 1 … Jul 2027 = 12). */
  month: number;
  /** Human date label, e.g. "Aug 2026". */
  date: string;
  /** App name, or null while the month is still empty. */
  app: string | null;
  /** Short description (rendered after an em dash), or null. */
  desc: string | null;
  status: Status;
  /** Live URL — set for shipped apps; renders the app name as a link. */
  link?: string;
  /** Public kill note — set for killed apps; renders as a second line. */
  killNote?: string;
}

// One object edit per monthly review. Months 2–12 stay null/tbd until announced.
export const scoreboard: ScoreboardEntry[] = [
  {
    month: 1,
    date: "Aug 2026",
    app: "App #1",
    desc: "announced August 1, with its bet.",
    status: "queued",
  },
  { month: 2, date: "Sep 2026", app: null, desc: null, status: "tbd" },
  { month: 3, date: "Oct 2026", app: null, desc: null, status: "tbd" },
  { month: 4, date: "Nov 2026", app: null, desc: null, status: "tbd" },
  { month: 5, date: "Dec 2026", app: null, desc: null, status: "tbd" },
  { month: 6, date: "Jan 2027", app: null, desc: null, status: "tbd" },
  { month: 7, date: "Feb 2027", app: null, desc: null, status: "tbd" },
  { month: 8, date: "Mar 2027", app: null, desc: null, status: "tbd" },
  { month: 9, date: "Apr 2027", app: null, desc: null, status: "tbd" },
  { month: 10, date: "May 2027", app: null, desc: null, status: "tbd" },
  { month: 11, date: "Jun 2027", app: null, desc: null, status: "tbd" },
  { month: 12, date: "Jul 2027", app: null, desc: null, status: "tbd" },
];

/** Uppercase-first label shown in the status cell; tbd renders a middot. */
export const statusLabel: Record<Status, string> = {
  queued: "Queued",
  building: "Building",
  shipped: "Shipped",
  killed: "Killed",
  tbd: "·",
};

/** Live tally derived from the ledger — "N shipped · N killed · N to go". */
export function tally(entries: ScoreboardEntry[] = scoreboard) {
  const shipped = entries.filter((e) => e.status === "shipped").length;
  const killed = entries.filter((e) => e.status === "killed").length;
  return { shipped, killed, toGo: entries.length - shipped - killed };
}
