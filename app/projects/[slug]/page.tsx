import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProject, projects } from "@/lib/timeline";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title} - Julius Dorfman`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <div className="blog-page">
      <div className="page-slug">./projects/{slug}</div>
      <header className="blog-header">
        <a href="/" className="blog-back-link">
          &larr; back
        </a>
      </header>

      <article className="blog-article">
        <div className="blog-article-header">
          <time className="blog-post-date">{project.date}</time>
          <h1 className="blog-article-title">{project.title}</h1>
          <p className="blog-article-description">{project.description}</p>
          {project.tags.length > 0 && (
            <div className="blog-post-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="blog-content">
          <MDXRemote source={project.content} />
        </div>
      </article>
    </div>
  );
}
