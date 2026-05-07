import {defineType, defineField, defineArrayMember} from 'sanity'
import {BasketIcon} from '@sanity/icons'

const PRODUCT_CATEGORIES = [
  {title: 'Vector', value: 'Vector'},
  {title: 'Illustration', value: 'Illustration'},
  {title: 'UI Kit', value: 'UI Kit'},
  {title: 'Template', value: 'Template'},
  {title: 'Font', value: 'Font'},
  {title: 'Icon Pack', value: 'Icon Pack'},
  {title: 'Mockup', value: 'Mockup'},
  {title: 'Other', value: 'Other'},
]

const PAYMENT_NAMES = [
  {title: 'PayPal', value: 'paypal'},
  {title: 'Stripe', value: 'stripe'},
  {title: 'Gumroad', value: 'gumroad'},
  {title: 'Patreon', value: 'patreon'},
  {title: 'Ko-fi', value: 'kofi'},
  {title: 'Buy Me a Coffee', value: 'buymeacoffee'},
  {title: 'Other', value: 'other'},
]

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'commerce', title: 'Commerce'},
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
      description: 'Usado en la URL. Ej: bob-squarepants-faces',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {list: PRODUCT_CATEGORIES, layout: 'radio'},
      validation: (rule) => rule.required(),
    }),

    // ── Media ────────────────────────────────────────────────
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Imagen principal para la tarjeta del producto. Soporta GIF.',
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
            }),
          ],
        }),
      ],
      description: 'Imágenes de preview del producto.',
      validation: (rule) => rule.min(1).error('Add at least one gallery image'),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      description: 'Si se deja vacío se usará Thumbnail.',
      fields: [defineField({name: 'alt', type: 'string', title: 'Alt text'})],
    }),

    // ── Commerce ─────────────────────────────────────────────
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      group: 'commerce',
      validation: (rule) => rule.required().min(0).precision(2).error('Price must be 0 or greater'),
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Payment Methods',
      type: 'array',
      group: 'commerce',
      of: [
        defineArrayMember({
          name: 'paymentMethod',
          title: 'Payment Method',
          type: 'object',
          fields: [
            defineField({
              name: 'paymentName',
              title: 'Provider',
              type: 'string',
              options: {list: PAYMENT_NAMES, layout: 'radio'},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Button Label',
              type: 'string',
              description: 'Texto del botón. Ej: "PayPal purchase"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Payment URL',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'paymentName'},
          },
        }),
      ],
      validation: (rule) => rule.min(1).error('Add at least one payment method'),
    }),

    // ── Metadata ─────────────────────────────────────────────
    // Campo gestionado automáticamente por @sanity/document-internationalization
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'thumbnail',
      category: 'category',
      language: 'language',
    },
    prepare({title, subtitle, media, category, language}) {
      const flag = language === 'es' ? '🇪🇸' : '🇬🇧'
      return {
        title: title ?? 'Untitled Product',
        subtitle: `${flag} ${category ?? ''} · $${subtitle ?? 0}`,
        media,
      }
    },
  },
})
