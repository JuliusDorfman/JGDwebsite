import { Metadata } from "next";
import { getTimeline } from "@/lib/timeline";
import Timeline from "./components/Timeline";
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
      <Timeline items={items} />

      <SubscribeButton />
    </div>
  );
}
