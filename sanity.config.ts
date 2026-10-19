import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import resource from './sanity/schemas/resource'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'kr1414q3',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'stark-legal',
  title: 'Stark Legal CMS',
  plugins: [structureTool()],
  schema: { types: [resource] },
})
