import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import resource from './schemas/resource'
import blog from './schemas/blog'

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: { types: [resource, blog] },
  basePath: '/studio',
})
