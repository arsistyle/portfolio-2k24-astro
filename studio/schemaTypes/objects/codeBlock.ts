import { defineType, defineField } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons'

/**
 * Mapea el componente <CodeBlock code={...} /> de Astro
 */
export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Plain text', value: 'text' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Bash', value: 'bash' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Markdown', value: 'markdown' },
        ],
      },
      initialValue: 'text',
    }),
  ],
  preview: {
    select: { title: 'code', subtitle: 'language' },
    prepare({ title, subtitle }) {
      return {
        title: title?.slice(0, 60) ?? 'Code Block',
        subtitle: subtitle ?? 'text',
      }
    },
  },
})
