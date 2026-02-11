import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: (props) => <h1 className="blog-h1" {...props} />,
  h2: (props) => <h2 className="blog-h2" {...props} />,
  h3: (props) => <h3 className="blog-h3" {...props} />,
  p: (props) => <p className="blog-p" {...props} />,
  a: (props) => (
    <a
      className="blog-link"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => <ul className="blog-ul" {...props} />,
  ol: (props) => <ol className="blog-ol" {...props} />,
  li: (props) => <li className="blog-li" {...props} />,
  blockquote: (props) => <blockquote className="blog-blockquote" {...props} />,
  code: (props) => <code className="blog-code-inline" {...props} />,
  pre: (props) => <pre className="blog-code-block" {...props} />,
  hr: (props) => <hr className="blog-hr" {...props} />,
  img: (props) => <img className="blog-img" {...props} />,
};
