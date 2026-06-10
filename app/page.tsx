import { Metadata } from "next";
import Link from "next/link";
import { getTimeline } from "@/lib/timeline";
import SubscribeButton from "./components/SubscribeButton";

export const metadata: Metadata = {
  title: "Julius Dorfman",
  description: "Web Developer, Software Engineer, Customer Support and Relations",
};

export default async function Home() {
  const items = await getTimeline();

  return (
    <div className="blog-page">
      <div className="page-slug">./home</div>

      {/* Console-style banner */}
      <div className="home-banner">
        <div className="home-content-wrapper">
          <div className="home-content">
            <h1 className="home-title">Julius Dorfman</h1>
            <p className="home-subtitle">
              Web Developer, Software Engineer, Customer Support and Relations
            </p>
            <nav className="home-nav">
              <a
                href="https://github.com/juliusdorfman"
                target="_blank"
                rel="noopener noreferrer"
                className="home-nav-link"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/juliusgdorfman"
                target="_blank"
                rel="noopener noreferrer"
                className="home-nav-link"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Timeline feed — blog posts, project releases, etc. */}
      <main className="blog-post-list">
        {items.length === 0 && (
          <p className="blog-empty">Nothing here yet. Check back soon.</p>
        )}
        {items.map((item) => (
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

      <SubscribeButton />
    </div>
  );
}
