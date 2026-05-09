import { defineType, defineField, defineArrayMember } from 'sanity'
import { LinkIcon } from '@sanity/icons'

/**
 * Mapea el componente <Sources sources={[{url, title}]} /> de Astro
 */
export const sources = defineType({
  name: 'sources',
  title: 'Sources',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Sources',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'sourceItem',
          title: 'Source',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'url' },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: 'Sources',
        subtitle: `${count} source${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
