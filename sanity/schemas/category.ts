import { defineType, defineField } from 'sanity'

export const categorySchema = defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  icon: () => '🗂️',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'name',
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
      name: 'description',
      title: 'Descrição (meta description)',
      type: 'text',
      rows: 3,
      description: 'Máximo 160 caracteres. Usado como meta description da página de categoria.',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (override)',
      type: 'string',
      description: 'Se em branco, usa "Nome da Categoria | Site".',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'icon',
      title: 'Ícone da categoria',
      type: 'image',
      description: 'SVG ou PNG. Usado na Navbar e cards.',
      options: { hotspot: false },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
  },
})
