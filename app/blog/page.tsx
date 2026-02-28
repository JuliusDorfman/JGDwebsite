import { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - Julius Dorfman",
  description: "Thoughts on web development and technology.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="blog-page">
      <div className="page-slug">./blog</div>
      <header className="blog-header">
        <a href="/" className="blog-back-link">
          &larr; back
        </a>

        <p className="blog-page-subtitle">
          Thoughts on web development and technology.
        </p>
      </header>

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
