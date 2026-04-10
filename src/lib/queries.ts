import { sanityClient } from './sanity';
import type { Category, Post, PostCard } from '../types/sanity';

// ─── Categorias ──────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  return sanityClient.fetch(
    `*[_type == "category"] | order(name asc) {
      _id,
      name,
      slug,
      description,
      seoTitle,
      icon
    }`
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return sanityClient.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      description,
      seoTitle,
      icon
    }`,
    { slug }
  );
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export async function getAllPostSlugs(): Promise<
  { categorySlug: string; postSlug: string }[]
> {
  const results = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current) && defined(category->slug.current)] {
      "postSlug": slug.current,
      "categorySlug": category->slug.current
    }`
  );
  return results;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      body,
      seoTitle,
      seoDescription,
      ogImage,
      author {
        name,
        bio,
        avatar
      },
      category-> {
        _id,
        name,
        slug,
        description,
        seoTitle
      }
    }`,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string): Promise<PostCard[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      "category": category-> {
        name,
        slug
      }
    }`,
    { categorySlug }
  );
}

export async function getRelatedPosts(
  categoryId: string,
  excludePostId: string,
  limit = 3
): Promise<PostCard[]> {
  return sanityClient.fetch(
    `*[_type == "post" && category._ref == $categoryId && _id != $excludePostId] | order(publishedAt desc) [0..$limit] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      "category": category-> {
        name,
        slug
      }
    }`,
    { categoryId, excludePostId, limit: limit - 1 }
  );
}

export async function getLatestPosts(limit = 6): Promise<PostCard[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0..$limit] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      coverImage,
      "category": category-> {
        name,
        slug
      }
    }`,
    { limit: limit - 1 }
  );
}
