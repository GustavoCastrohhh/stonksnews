import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: () => '📝',
  fields: [
    // ─── Conteúdo principal ────────────────────────────────────────────────

    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-'),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Nome', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'bio', title: 'Bio curta', type: 'text', rows: 2 }),
        defineField({
          name: 'avatar',
          title: 'Foto do autor',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // ─── Imagem de capa ────────────────────────────────────────────────────

    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      description: 'Gerada automaticamente como WebP pelo Sanity CDN.',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo (A11y / SEO)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // ─── Corpo (Rich Text) ─────────────────────────────────────────────────

    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({ scheme: ['http', 'https', 'mailto'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Abrir em nova aba',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        // Imagem inline no corpo do post
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Legenda',
            },
          ],
        },
      ],
    }),

    // ─── Resumo ────────────────────────────────────────────────────────────

    defineField({
      name: 'excerpt',
      title: 'Resumo / Chamada',
      type: 'text',
      rows: 3,
      description: 'Aparece nos cards e como meta description padrão. Máximo 160 caracteres.',
      validation: (Rule) => Rule.max(160),
    }),

    // ─── SEO / Open Graph ──────────────────────────────────────────────────

    defineField({
      name: 'seoTitle',
      title: 'Título SEO (override)',
      type: 'string',
      description: 'Se em branco, usa o Título principal.',
      validation: (Rule) => Rule.max(70),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description (override)',
      type: 'text',
      rows: 2,
      description: 'Se em branco, usa o Resumo.',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagem Open Graph (override)',
      type: 'image',
      description: 'Se em branco, usa a Imagem de Capa. Recomendado: 1200×630px.',
      options: { hotspot: false },
      group: 'seo',
    }),
  ],

  groups: [
    {
      name: 'seo',
      title: 'SEO & Open Graph',
      icon: () => '🔍',
    },
  ],

  preview: {
    select: {
      title: 'title',
      category: 'category.name',
      media: 'coverImage',
      date: 'publishedAt',
    },
    prepare({ title, category, media, date }) {
      const dateStr = date ? new Date(date).toLocaleDateString('pt-BR') : 'sem data'
      return {
        title,
        subtitle: `${category ?? 'Sem categoria'} · ${dateStr}`,
        media,
      }
    },
  },
})
