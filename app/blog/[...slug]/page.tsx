import { Metadata } from "next"
import { notFound } from "next/navigation"

type Post = {
  slug: string
  title: string
  description: string
  content: string
}

async function getAllPosts(): Promise<Post[]> {
  // TODO: replace with your data source
  return []
}

async function getPost(slug: string): Promise<Post | null> {
  // TODO: replace with your data source
  return null
}

type Params = { slug: string[] }

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts()

  return posts.map((post) => ({
    slug: post.slug.split("/"),
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug.join("/"))

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = await getPost(slug.join("/"))

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
