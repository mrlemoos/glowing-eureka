"use client";

import { useEffect, useState, type JSX } from "react";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

interface MarkdownProps {
  /**
   * The source is the Markdown notation of the content to render.
   */
  source: string;
}

/**
 * This is the component that interprets the {@link MarkdownProps.source | raw} markdown format notation and renders it
 * as HTML on the page. However, the product of this component is a JSX expression.
 */
export function Markdown({ source }: MarkdownProps): JSX.Element {
  const [serializedSource, setSerializedSource] = useState<MDXRemoteSerializeResult | undefined>();

  useEffect(
    function () {
      async function serializeSource() {
        const serializedSource = await serialize(source);
        setSerializedSource(serializedSource);
      }

      serializeSource();
    },
    [source]
  );

  return <MDXRemote source={serializedSource?.compiledSource ?? ""} />;
}
