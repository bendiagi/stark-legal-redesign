import { sanityClient } from './sanity.client'

export interface Resource {
  _id: string
  title: string
  slug: { current: string }
  resourceType: 'article' | 'regulatory-update' | 'newsletter'
  tag?: string
  date: string
  excerpt?: string
  image?: {
    sanityImage?: { asset?: { _ref: string } }
    cloudinaryUrl?: string
    alt?: string
  }
  body?: unknown[]
}

const RESOURCE_CARD_FIELDS = `
  _id,
  title,
  slug,
  resourceType,
  tag,
  date,
  excerpt,
  image { sanityImage { asset }, cloudinaryUrl, alt }
`

export async function getLatestResources(count = 3): Promise<Resource[]> {
  return sanityClient.fetch(
    `*[_type == "resource"] | order(date desc) [0...$count] { ${RESOURCE_CARD_FIELDS} }`,
    { count: count - 1 }
  )
}

export async function getResourcesByType(type: string): Promise<Resource[]> {
  return sanityClient.fetch(
    `*[_type == "resource" && resourceType == $type] | order(date desc) { ${RESOURCE_CARD_FIELDS} }`,
    { type }
  )
}

export async function getResourcesByTypeAndTag(type: string, tag: string): Promise<Resource[]> {
  return sanityClient.fetch(
    `*[_type == "resource" && resourceType == $type && tag == $tag] | order(date desc) { ${RESOURCE_CARD_FIELDS} }`,
    { type, tag } as Record<string, unknown>
  )
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  return sanityClient.fetch(
    `*[_type == "resource" && slug.current == $slug][0] {
      ${RESOURCE_CARD_FIELDS},
      body
    }`,
    { slug }
  )
}

export async function getAllResourceSlugs(): Promise<{ slug: { current: string } }[]> {
  return sanityClient.fetch(`*[_type == "resource"] { slug }`)
}
