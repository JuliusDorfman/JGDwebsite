import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Julius Dorfman",
  description: "Web Developer, Software Engineer, Customer Support and Relations",
};

export default async function Home() {
  const posts = await getAllPosts();

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

      {/* Blog post listing */}
      <main className="blog-post-list">
        {posts.length === 0 && (
          <p className="blog-empty">No posts yet. Check back soon.</p>
        )}
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-post-card"
          >
            <time className="blog-post-date">{post.date}</time>
            <h2 className="blog-post-title">{post.title}</h2>
            <p className="blog-post-description">{post.description}</p>
            {post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </main>
    </div>
  );
}
