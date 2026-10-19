import { defineType, defineField, defineArrayMember } from 'sanity'

const TAG_OPTIONS = [
  { title: 'Energy', value: 'energy' },
  { title: 'Transport', value: 'transport' },
  { title: 'Financial Services', value: 'financial-services' },
  { title: 'Corporate & Commercial Law', value: 'corporate-commercial' },
  { title: 'Dispute Resolution', value: 'dispute-resolution' },
]

const COMPANY_TAG_OPTIONS = [
  { title: 'People & Appointments', value: 'people-appointments' },
  { title: 'Careers & Graduates', value: 'careers-graduates' },
  { title: 'Awards & Recognition', value: 'awards-recognition' },
  { title: 'Milestones & Anniversaries', value: 'milestones-anniversaries' },
  { title: 'Deals & Mandates', value: 'deals-mandates' },
  { title: 'Partnerships & Alliances', value: 'partnerships-alliances' },
  { title: 'Events & Webinars', value: 'events-webinars' },
  { title: 'Community & CSR', value: 'community-csr' },
  { title: 'Firm News', value: 'firm-news' },
]

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
  name: 'resource',
  title: 'Resource',
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
      name: 'resourceType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Regulatory Update', value: 'regulatory-update' },
          { title: 'Company Updates', value: 'company-update' },
          { title: 'Newsletter', value: 'newsletter' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: { list: TAG_OPTIONS },
      hidden: ({ document }) =>
        document?.resourceType === 'newsletter' || document?.resourceType === 'company-update',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const t = context.document?.resourceType
          if (t !== 'newsletter' && t !== 'company-update' && !value) {
            return 'Tag is required for this type'
          }
          return true
        }),
    }),
    defineField({
      name: 'companyTag',
      title: 'Tag',
      type: 'string',
      options: { list: COMPANY_TAG_OPTIONS },
      hidden: ({ document }) => document?.resourceType !== 'company-update',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.resourceType === 'company-update' && !value) {
            return 'Tag is required for Company Updates'
          }
          return true
        }),
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
      description: 'Short summary shown on listing pages (max ~200 characters)',
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
    select: { title: 'title', subtitle: 'resourceType', media: 'image.sanityImage' },
  },
  orderings: [
    {
      title: 'Publication Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
})
