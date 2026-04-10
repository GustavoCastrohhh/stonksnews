import { createImageUrlBuilder } from '@sanity/image-url';
import { sanityClient } from './sanity';
import type { SanityImage } from '../types/sanity';

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}

/**
 * Gera URL otimizada para imagem de capa de post
 * Retorna WebP com largura máxima de 800px e qualidade 85
 */
export function coverImageUrl(source: SanityImage, width = 800): string {
  return urlFor(source)
    .width(width)
    .format('webp')
    .quality(85)
    .fit('crop')
    .auto('format')
    .url();
}

/**
 * Gera URL para thumbnail de card de post
 * 400×250 WebP
 */
export function thumbnailUrl(source: SanityImage): string {
  return urlFor(source)
    .width(400)
    .height(250)
    .format('webp')
    .quality(80)
    .fit('crop')
    .url();
}

/**
 * Gera URL para Open Graph (1200×630)
 */
export function ogImageUrl(source: SanityImage): string {
  return urlFor(source)
    .width(1200)
    .height(630)
    .format('webp')
    .quality(85)
    .fit('crop')
    .url();
}
