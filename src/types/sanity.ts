// Tipagem dos dados retornados pelo Sanity

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  alt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  seoTitle?: string;
  icon?: SanityImage;
}

export interface Author {
  name: string;
  bio?: string;
  avatar?: SanityImage;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImage;
  body: PortableTextBlock[];
  category: Category;
  author?: Author;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  coverImage?: SanityImage;
  category: Pick<Category, 'name' | 'slug'>;
}

// Portable Text block types básicos
export type PortableTextBlock = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};
