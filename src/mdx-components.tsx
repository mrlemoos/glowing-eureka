import type { MDXComponents } from "mdx/types";

// Reference:
// https://nextjs.org/docs/app/building-your-application/configuring/mdx#getting-started
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
