import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import BlogStyleToggle, { NeonProvider } from "../BlogStyleToggle";

type Params = { slug: string[] };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug.join("/"));

  if (!post) return {};

  return {
    title: `${post.title} - Julius Dorfman`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug.join("/"));

  if (!post) notFound();

  return (
    <NeonProvider>
      <div className="blog-page">
        <header className="blog-header">
          <a href="/blog" className="blog-back-link">
            &larr; back to blog
          </a>
          <BlogStyleToggle />
        </header>

        <article className="blog-article">
          <div className="blog-article-header">
            <time className="blog-post-date">{post.date}</time>
            <h1 className="blog-article-title support-team">{post.title}</h1>
            <p className="blog-article-description neon-cyan">{post.description}</p>
            {post.tags.length > 0 && (
              <div className="blog-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="blog-content">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </div>
    </NeonProvider>
  );
}
