"use client";

import { useState } from "react";
import Link from "next/link";
import type { TimelineItem } from "@/lib/timeline";

type FilterKey = "all" | "project" | "blog";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "project", label: "Projects" },
  { key: "blog", label: "Blogs" },
];

function matches(item: TimelineItem, filter: FilterKey): boolean {
  if (filter === "all") return true;
  // "Projects" catches every project type (release, wip, …); "Blogs" is exact.
  if (filter === "project") return item.type.includes("project");
  return item.type === filter;
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const visible = items.filter((item) => matches(item, filter));

  return (
    <>
      <div
        className="timeline-filters"
        role="tablist"
        aria-label="Filter timeline"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            className={`timeline-filter${
              filter === f.key ? " timeline-filter-active" : ""
            }`}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <main className="blog-post-list">
        {visible.length === 0 && (
          <p className="blog-empty">Nothing here yet. Check back soon.</p>
        )}
        {visible.map((item) => (
          <Link key={item.href} href={item.href} className="blog-post-card">
            <time className="blog-post-date">{item.date}</time>
            <h2 className="blog-post-title">
              <span className={`timeline-label timeline-label-${item.type}`}>
                {item.label}:
              </span>{" "}
              {item.title}
            </h2>
            <p className="blog-post-description">{item.description}</p>
            {item.tags.length > 0 && (
              <div className="blog-post-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </main>
    </>
  );
}
