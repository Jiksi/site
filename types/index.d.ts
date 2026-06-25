export interface ContentItem {
  slug: string;
  title: string;
  publishDate: string; // ISO date string e.g. "2026-01-01"
  tags: string[];
}

export interface Project extends ContentItem {}
export interface BlogPost extends ContentItem {}
export interface Note extends ContentItem {}
