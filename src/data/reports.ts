// Reports, newest first. Each report is a self-contained page in public/reports/<slug>/index.html.
// The home page shows the first entry; /reports/ lists all of them.
export interface Report {
  slug: string;
  date: string; // ISO date, YYYY-MM-DD
  title: string;
  summary: string;
  meta: string;
  note?: string; // red margin note on /reports/
}

export const reports: Report[] = [
  {
    slug: "weight-space-programming",
    date: "2026-11-06",
    title: "Can Claude also write neural network weights from scratch?",
    summary:
      "I replicated Experiment 5 of the MIT post Sparks of Weight-Space Programming with Claude Opus 5.5. Claude wrote game-playing networks as text, in one reply, with no training. Its best networks came close to GPT-6 Astra. Its typical networks did not.",
    meta: "Replication · Claude Opus 5.5 · MinAtar · code and data on GitHub",
    note: "best replies: 87%, 97% and 86% of Astra",
  },
];

export const reportUrl = (r: Report) => `/reports/${r.slug}/`;

export const shortDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

export const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
