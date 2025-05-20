import type { MarkdownInstance } from "astro";

export interface PostFrontmatter {
  title: string;
  pubDate: string;            // e.g. "2025-05-17"
  desc: string;               // description
  author: string;
  image: {
    url: string;
    alt: string;
  };
  tags: string[];
}

export interface Post extends MarkdownInstance<PostFrontmatter> { };


