import { defineType, defineField, defineArrayMember } from 'sanity'
import { OlistIcon } from '@sanity/icons'

/**
 * Mapea el componente <FlowSteps> / <FlowStep icon title> de Astro
 */
export const flowSteps = defineType({
  name: 'flowSteps',
  title: 'Flow Steps',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'flowStep',
          title: 'Step',
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (emoji)',
              type: 'string',
              description: 'Emoji usado como icono del paso. Ej: 🍌',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Content',
              type: 'array',
              of: [defineArrayMember({ type: 'block' })],
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'icon' },
            prepare({ title, subtitle }) {
              return {
                title: title ?? 'Step',
                subtitle: subtitle ?? '',
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { steps: 'steps' },
    prepare({ steps }) {
      const count = Array.isArray(steps) ? steps.length : 0
      return {
        title: 'Flow Steps',
        subtitle: `${count} step${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
