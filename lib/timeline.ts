import { getAllPosts } from "@/lib/blog";

export type TimelineType = "blog" | "project";

/** A single entry rendered in the homepage timeline feed. */
export type TimelineItem = {
  type: TimelineType;
  label: string; // drives the "Blog Post:" / "Project Release:" prefix
  title: string;
  description: string;
  date: string; // ISO "YYYY-MM-DD" — used for sorting newest-first
  tags: string[];
  href: string; // internal route
};

/** A project/release. Lives here (single data file) instead of MDX. */
export type Project = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  status?: "released" | "wip"; // defaults to "released" — drives the timeline label
  content: string; // markdown — rendered with MDXRemote on the detail page
};

/**
 * Add projects here. Each one gets its own page at /projects/<slug>
 * and shows up in the homepage timeline automatically.
 */
export const projects: Project[] = [
  {
    slug: "bahala-foundation",
    title: "Bahala Calendar",
    description:
      "An event consolidator and RSVP platform for the City of Santa Monica. Pulls events from 8 upstream sources (Notion, Eventbrite, scraped venue sites) into a unified per-source SQLite snapshot served by a small Express API, with a React calendar frontend and a Go ETL pipeline running nightly on DigitalOcean App Platform.",
    date: "2026-06-20",
    tags: [
      "react",
      "typescript",
      "vite",
      "express",
      "go",
      "sqlite",
      "digitalocean",
      "notion-api",
      "mailjet",
    ],
    content: `Bahala Calendar is the public-facing event calendar for the Bahala Foundation, consolidating events from across Santa Monica into a single, filterable, RSVP-able view at [calendar.bahala.org](https://calendar.bahala.org).

## Architecture

The system is a monorepo with three deployable components plus a serverless function, all on DigitalOcean App Platform:

- **\`web\`** — React 18 + TypeScript + Vite. The calendar UI: weekly grid view, tag/organization filtering, full-text search built from a client-side index, event modals with RSVP, and embed views for syndication.
- **\`api\`** — Express + TypeScript + better-sqlite3. Serves event data over a thin JSON API and owns a separate transactional SQLite database for RSVPs. Notion writes for the operational owner's view of "who's coming to what" happen here.
- **\`etl\`** — Go 1.25. A scheduled cron container that runs at midnight LA time, extracts events from 8 sources concurrently, transforms into a per-source SQLite snapshot, and uploads to DigitalOcean Spaces. A failure-alert system classifies each source's run as OK / FAILED / NO EVENTS / NOT SHIPPED and emails the operations owner via Mailjet when something needs attention.
- **\`functions/notion-sync\`** — A DO Function that fires on a Notion webhook so Deb's manual event edits propagate to the calendar within seconds instead of waiting for the next midnight cron.

## Architectural decisions worth calling out

- **Per-source SQLite snapshots, not a unified database.** Each source produces its own \`{source}.sqlite\` blob in Spaces. The API ATTACHes them at runtime as named aliases and queries with \`UNION ALL\`. The trade — query-layer complexity for fault isolation — pays off every time one upstream API breaks and the other seven keep shipping fresh data.
- **The API as a relay for events, but origin-of-truth for RSVPs.** Events live upstream (Notion, Eventbrite, etc.) so the API is just a cache. RSVPs are born inside the system, so the API persists them transactionally to local SQLite, backs the file up to Spaces on an interval, and writes a copy to Notion so the operational owner can see who's coming in the tool she already uses.
- **Manifest-driven SQLite refresh.** Each source has a \`{source}/manifest.json\` in Spaces pointing at the most recent SQLite blob. The API polls (or gets triggered) to compare versions and atomically swap to a new file via \`detach\` → \`rename\` → \`attach\`.

## Recent work

- ETL failure alerts (FAILED / NO EVENTS / NOT SHIPPED classification, Mailjet emails to operations)
- Confetti + form-anchored celebrations on successful RSVP submit, with sibling-widget state sync across modal and card instances
- Per-program location defaults for recurring events (Coffee & Connections fills in venue automatically when blank in Notion)
- Resilience fixes for upstream CDN changes (custom User-Agent header to defeat Cloudflare blocks on default Go HTTP clients)`,
  },
  {
    slug: "moto-cyberdeck",
    title: "Moto Cyberdeck",
    description:
      "Hardware and firmware for a mountable raspberry pi as the compute core to host actually helpful applications for the casual ride around on my Rebel 1100.",
    date: "2026-03-22",
    tags: ["hardware", "linux", "cyberdeck", "documentation"],
    status: "wip",
    content: `A personal project: a cyberdeck for my motorcycle. The goal is a mountable Raspberry Pi with a touchscreen that can run helpful apps for the casual ride around on my Rebel 1100 — navigation, music, maybe some custom telemetry from the bike's OBD-II port.

The repository is the build log and design documentation.

## Documentation lives in [\`docs/\`](https://github.com/juliusdorfman/moto-cyberdeck/tree/main/docs)

Includes the BOM, peripheral specs, and design notes. The README captures the high-level concept; the docs folder is where the build details and progress live.`,
  },
  {
    slug: "dgg-auto-image-embed",
    title: "dgg-auto-image-embed",
    description:
      "A userscript for the destiny.gg chat that automatically previews image links inline instead of requiring users to click out to the source. Distributed via GreasyFork.",
    date: "2025-08-25",
    tags: ["javascript", "userscript", "tampermonkey", "greasyfork"],
    content: `A small but heavily-used userscript that improves the chat experience on [destiny.gg](https://www.destiny.gg). When a chat message contains an image link, the script renders the image inline beneath the message — saving every viewer from the click-out / click-back ritual that an image-heavy chat otherwise demands.

Originally based on a script by legolas, itself derived from earlier work by Vyneer. This version maintains the lineage and adds:

- Support for additional image hosts
- Performance fixes for high-traffic streams
- A cleaner fallback when an image fails to load

## Install

Available on [GreasyFork](https://greasyfork.org). Tampermonkey, Violentmonkey, and similar userscript managers handle the install in one click.

## Status

Actively maintained. Issues and PRs welcome on the repo.`,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Merge blog posts + projects into one feed, newest first. */
export async function getTimeline(): Promise<TimelineItem[]> {
  const posts = await getAllPosts();

  const blogItems: TimelineItem[] = posts.map((post) => ({
    type: "blog",
    label: "Blog Post",
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    href: `/blog/${post.slug}`,
  }));

  const projectItems: TimelineItem[] = projects.map((project) => ({
    type: "project",
    label: project.status === "wip" ? "Project (WIP)" : "Project Release",
    title: project.title,
    description: project.description,
    date: project.date,
    tags: project.tags,
    href: `/projects/${project.slug}`,
  }));

  return [...blogItems, ...projectItems].sort((a, b) =>
    a.date > b.date ? -1 : 1
  );
}
