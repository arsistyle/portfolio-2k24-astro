export const prerender = false

import type { APIRoute } from "astro"
import { Auth, skipCSRFCheck } from "@auth/core"
import { createAuthConfig } from "@/auth.config"

async function getEnv() {
  let runtimeEnv: any = {}
  try {
    // @ts-ignore
    const cfWorkers = await import("cloudflare:workers")
    runtimeEnv = cfWorkers.env || {}
  } catch (e) {
    // Not in Cloudflare environment, fallback to import.meta.env
  }
  return {
    LINKEDIN_CLIENT_ID: runtimeEnv.LINKEDIN_CLIENT_ID || import.meta.env.LINKEDIN_CLIENT_ID,
    LINKEDIN_CLIENT_SECRET: runtimeEnv.LINKEDIN_CLIENT_SECRET || import.meta.env.LINKEDIN_CLIENT_SECRET,
    AUTH_SECRET: runtimeEnv.AUTH_SECRET || import.meta.env.AUTH_SECRET,
  }
}

async function getConfig() {
  const env = await getEnv()
  const config = createAuthConfig(env)
  // Skip CSRF: authOptions.skipCSRFCheck === skipCSRFCheck (string key, Symbol value)
  ;(config as any).skipCSRFCheck = skipCSRFCheck
  return config
}

export const GET: APIRoute = async ({ request }) => {
  const response = await Auth(request, await getConfig())
  return response as Response
}

export const POST: APIRoute = async ({ request }) => {
  const response = await Auth(request, await getConfig())
  return response as Response
}
