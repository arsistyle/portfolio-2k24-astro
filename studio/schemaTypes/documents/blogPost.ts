import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

const CATEGORIES = [
  {title: 'AI', value: 'ai'},
  {title: 'Prompt', value: 'prompt'},
  {title: 'Nano Banana', value: 'nano-banana'},
  {title: 'Gemini', value: 'gemini'},
  {title: 'Blog', value: 'blog'},
  {title: 'Personal', value: 'personal'},
  {title: 'Front-End', value: 'front-end'},
  {title: 'UI/UX', value: 'ui-ux'},
  {title: 'Resources', value: 'resources'},
  {title: 'Templates', value: 'templates'},
  {title: 'Tools', value: 'tools'},
  {title: 'Astro', value: 'astro'},
  {title: 'React', value: 'react'},
  {title: 'CSS', value: 'css'},
  {title: 'JavaScript', value: 'javascript'},
  {title: 'TypeScript', value: 'typescript'},
  {title: 'HTML', value: 'html'},
  {title: 'SEO', value: 'seo'},
]

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
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
      name: 'body',
      title: 'Content',
      type: 'array',
      group: 'content',
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
        defineArrayMember({type: 'contentBlock'}),
        defineArrayMember({type: 'flowSteps'}),
        defineArrayMember({type: 'sources'}),
      ],
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
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'meta',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Draft', value: 'draft'},
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'datetime',
      group: 'meta',
      options: {dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'meta',
      of: [defineArrayMember({type: 'string'})],
      options: {list: CATEGORIES},
      validation: (rule) => rule.min(1).error('Add at least one category'),
    }),

    // ── SEO ──────────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Usado en listados y meta description.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'searchContext',
      title: 'Search Context',
      type: 'text',
      rows: 2,
      group: 'seo',
      description: 'Contexto adicional para búsqueda semántica.',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'seo',
      options: {hotspot: true},
      description: 'Si se deja vacío se usará Featured Image.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
      language: 'language',
      status: 'status',
    },
    prepare({title, subtitle, media, language, status}) {
      const flag = language === 'es' ? '🇪🇸' : '🇬🇧'
      const dot = status === 'draft' ? '⚫' : '🟢'
      return {
        title: `${dot} ${title ?? 'Untitled'}`,
        subtitle: `${flag} ${subtitle ? subtitle.slice(0, 10) : ''}`,
        media,
      }
    },
  },
})
