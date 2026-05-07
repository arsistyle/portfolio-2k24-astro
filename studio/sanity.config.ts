import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

// Valores inyectados por sanity.cli.ts via vite.define
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string
const dataset = import.meta.env.VITE_SANITY_DATASET as string

export default defineConfig({
  name: 'default',
  title: 'Arsi.dev',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English 🇬🇧'},
        {id: 'es', title: 'Español 🇪🇸'},
      ],
      schemaTypes: ['blogPost', 'project', 'product'],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
