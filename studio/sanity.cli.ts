import {defineCliConfig} from 'sanity/cli'

const PROJECT_ID = '45naspfq'

export default defineCliConfig({
  api: {
    projectId: PROJECT_ID,
    dataset: process.env.VITE_SANITY_DATASET ?? 'develop',
  },
  // Inyecta las variables directamente en el bundle de Vite (browser)
  vite: (config) => ({
    ...config,
    define: {
      ...config.define,
      'import.meta.env.VITE_SANITY_PROJECT_ID': JSON.stringify(PROJECT_ID),
      'import.meta.env.VITE_SANITY_DATASET': JSON.stringify(
        process.env.VITE_SANITY_DATASET ?? 'develop',
      ),
    },
  }),
  deployment: {
    autoUpdates: false,
  },
})
