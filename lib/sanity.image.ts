import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source)
}

interface ResourceImage {
  sanityImage?: { asset?: { _ref: string } }
  cloudinaryUrl?: string
  alt?: string
}

export function resolveResourceImage(image: ResourceImage): string | null {
  if (image?.sanityImage?.asset?._ref) {
    return urlForImage(image.sanityImage).width(1200).url()
  }
  if (image?.cloudinaryUrl) {
    return image.cloudinaryUrl
  }
  return null
}
