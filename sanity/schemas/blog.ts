import { defineType, defineField, defineArrayMember } from 'sanity'

const blockContent = defineArrayMember({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' },
    { title: 'H1', value: 'h1' },
    { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' },
  ],
  lists: [],
  marks: {
    decorators: [
      { title: 'Bold', value: 'strong' },
      { title: 'Italic', value: 'em' },
    ],
    annotations: [],
  },
})

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      options: { dateFormat: 'MMMM D, YYYY' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Article Image',
      type: 'object',
      fields: [
        defineField({
          name: 'sanityImage',
          title: 'Upload Image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'cloudinaryUrl',
          title: 'Or: Cloudinary URL',
          type: 'url',
          description: 'Paste a Cloudinary URL as an alternative to uploading.',
        }),
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((image: { sanityImage?: { asset?: unknown }; cloudinaryUrl?: string } | undefined) => {
          if (!image?.sanityImage?.asset && !image?.cloudinaryUrl) {
            return 'Provide either an uploaded image or a Cloudinary URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on listing pages',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [blockContent],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'date', media: 'image.sanityImage' },
  },
})
