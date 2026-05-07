import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons'

const PROJECT_CATEGORIES = [
  {title: 'Web Development', value: 'Web development'},
  {title: 'UX / UI', value: 'UX / UI'},
  {title: 'Branding', value: 'Branding'},
  {title: 'Mobile', value: 'Mobile'},
  {title: 'Open Source', value: 'Open Source'},
]

const ACTION_TYPES = [
  {title: 'Website', value: 'website'},
  {title: 'Source Code', value: 'source'},
  {title: 'Demo', value: 'demo'},
  {title: 'Design (Figma)', value: 'figma'},
  {title: 'App Store', value: 'appstore'},
  {title: 'Play Store', value: 'playstore'},
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    // ── Content ──────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Descripción corta del proyecto (usada en tarjetas y meta).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      group: 'content',
      description: 'Contenido detallado del proyecto.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
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
                    validation: (rule) => rule.uri({scheme: ['http', 'https']}),
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
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', type: 'string', title: 'Alt text'}),
            defineField({name: 'caption', type: 'string', title: 'Caption'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'tools',
      title: 'Tools & Technologies',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'string'})],
      description: 'Ej: Astro, React, TailwindCSS, Figma…',
    }),
    defineField({
      name: 'actions',
      title: 'Links',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'action',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {list: ACTION_TYPES, layout: 'radio'},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'type', subtitle: 'url'},
          },
        }),
      ],
    }),

    // ── Media ────────────────────────────────────────────────
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (small)',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Imagen para tarjetas y listados (aprox. 400px).',
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image (large)',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Imagen principal del proyecto (hero, aprox. 1200px).',
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Si se deja vacío se usará Cover Image.',
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),

    // ── Metadata ─────────────────────────────────────────────
    // Campo gestionado automáticamente por @sanity/document-internationalization
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'date',
      title: 'Project Date (YYYYMM)',
      type: 'number',
      group: 'meta',
      description: 'Formato YYYYMM. Ej: 202410 = Octubre 2024.',
      validation: (rule) =>
        rule
          .required()
          .min(200001)
          .max(209912)
          .integer()
          .error('Formato esperado: YYYYMM. Ej: 202410'),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      of: [defineArrayMember({type: 'string'})],
      options: {list: PROJECT_CATEGORIES},
      validation: (rule) => rule.min(1).error('Add at least one category'),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'thumbnail',
      language: 'language',
    },
    prepare({title, subtitle, media, language}) {
      const flag = language === 'es' ? '🇪🇸' : '🇬🇧'
      return {
        title: title ?? 'Untitled Project',
        subtitle: `${flag} ${subtitle ?? ''}`,
        media,
      }
    },
  },
})
