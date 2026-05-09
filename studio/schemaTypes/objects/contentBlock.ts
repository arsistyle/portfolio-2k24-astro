import {defineType, defineField, defineArrayMember} from 'sanity'
import {StackCompactIcon} from '@sanity/icons'

/**
 * Mapea el componente <ContentBlock> de Astro:
 * un wrapper <div class="flex flex-col gap-y-4"> que agrupa
 * otros bloques (texto, imágenes, codeBlock, flowSteps, sources…)
 * dentro de un bloque reutilizable.
 */
export const contentBlock = defineType({
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        // Texto enriquecido estándar
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto']}),
                  }),
                  defineField({
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  }),
                ],
              }),
            ],
          },
        }),
        // Imagen en el cuerpo
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            }),
          ],
        }),
        // Componentes custom de Astro
        defineArrayMember({type: 'codeBlock'}),
        defineArrayMember({type: 'flowSteps'}),
        defineArrayMember({type: 'sources'}),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {body: 'body'},
    prepare({body}) {
      const count = Array.isArray(body) ? body.length : 0
      return {
        title: 'Content Block',
        subtitle: `${count} item${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
