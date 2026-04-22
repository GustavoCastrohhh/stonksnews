import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Portal CMS',

  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'zqjtioxi',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Categorias')
              .icon(() => '🗂️')
              .child(S.documentTypeList('category').title('Categorias')),
            S.divider(),
            S.listItem()
              .title('Posts')
              .icon(() => '📝')
              .child(S.documentTypeList('post').title('Posts')),
          ]),
    }),
    visionTool(), // GROQ playground — remova em produção se desejar
  ],

  schema: {
    types: schemaTypes,
  },
})
