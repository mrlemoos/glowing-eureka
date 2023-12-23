"use client";

import { type JSX } from "react";

import Image from "next/image";
import ReactMarkdown, { Components as ReactMarkdownComponents } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

import { Anchor } from "@root/components/ui/anchor.module";
import { FontMono } from "@root/styles/fonts.module";
import { cn } from "@root/util/cn.module";

const codeStyle = {
  ...atomDark,
};

const markdownComponentMap: ReactMarkdownComponents = {
  a: function MarkdownAnchorAdapter({ href, target = "_blank", rel, children, className, ...props }) {
    return (
      <Anchor {...props} href={new URL(href ?? "#")} target={target} rel={rel}>
        {children}
      </Anchor>
    );
  },
  img: function MarkdownImageAdapter({ src, alt, style, className }) {
    if (!src) {
      return null;
    }

    return (
      <Image
        style={style}
        src={src}
        alt={alt ?? "Descriptive text not found."}
        layout="responsive"
        width={300}
        height={300}
        className={cn("rounded-lg", className)}
      />
    );
  },
  h1: function MarkdownH1Adapter({ children }) {
    return <h1 className="text-2xl font-semibold">{children}</h1>;
  },
  h2: function MarkdownH2Adapter({ children }) {
    return <h2 className="text-2xl font-medium">{children}</h2>;
  },
  h3: function MarkdownH3Adapter({ children }) {
    return <h3 className="text-xl font-semibold">{children}</h3>;
  },
  h4: function MarkdownH4Adapter({ children }) {
    return <h4 className="text-xl font-medium">{children}</h4>;
  },
  h5: function MarkdownH5Adapter({ children }) {
    return <h5 className="text-lg font-semibold">{children}</h5>;
  },
  h6: function MarkdownH6Adapter({ children }) {
    return <h6 className="text-base font-medium">{children}</h6>;
  },
  ol: function MarkdownOlAdapter({ children }) {
    return <ol className="list-decimal before:block before:ml-2">{children}</ol>;
  },
  code: function MarkdownCodeAdapter({ children, className, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    const codeSnippet = String(children).replace(/\n$/, "");

    return match ? (
      <SyntaxHighlighter
        PreTag="div"
        language={match[1]}
        style={codeStyle}
        wrapLines={true}
        codeTagProps={{
          className: FontMono.className,
        }}
        showLineNumbers={true}
      >
        {codeSnippet}
      </SyntaxHighlighter>
    ) : (
      <code {...props} className={cn(className, FontMono.className)}>
        {children}
      </code>
    );
  },
};

interface MarkdownProps {
  /**
   * The source is the Markdown notation of the content to
   * render.
   */
  source: string;
}

/**
 * This is the component that interprets the {@link MarkdownProps.source | raw}
 * markdown format notation and renders it as HTML on the
 * page. However, the product of this component is a JSX
 * expression.
 *
 * @example
 * ```tsx
 * import { type JSX } from "react";
 *
 * import { Markdown } from "@root/components/layout/markdown.module";
 *
 * function MyComponent() {
 *   return (
 *     <Markdown source={source} />
 *   )
 * }
 * ```
 */
export function Markdown({ source }: MarkdownProps): JSX.Element {
  return (
    <ReactMarkdown components={markdownComponentMap} rehypePlugins={[remarkGfm]}>
      {source}
    </ReactMarkdown>
  );
}
