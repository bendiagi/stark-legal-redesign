import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import resource from './schemas/resource'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: { types: [resource] },
  basePath: '/studio',
})
