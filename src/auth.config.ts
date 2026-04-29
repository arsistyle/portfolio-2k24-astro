import LinkedIn from "@auth/core/providers/linkedin"
import type { AuthConfig } from "@auth/core"

interface AuthEnv {
  LINKEDIN_CLIENT_ID: string
  LINKEDIN_CLIENT_SECRET: string
  AUTH_SECRET: string
}

export function createAuthConfig(env: AuthEnv): AuthConfig {
  return {
    providers: [
      LinkedIn({
        clientId: env.LINKEDIN_CLIENT_ID,
        clientSecret: env.LINKEDIN_CLIENT_SECRET,
        authorization: { params: { scope: "openid profile email" } },
      }),
    ],
    secret: env.AUTH_SECRET,
    trustHost: true,
    basePath: "/api/auth",
  }
}
