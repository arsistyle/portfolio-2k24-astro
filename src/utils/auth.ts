import { getToken } from "@auth/core/jwt"
import type { JWT } from "@auth/core/jwt"

/**
 * Reads the Auth.js JWT from the request cookies and returns the payload,
 * or null if the user is not authenticated.
 * 
 * Pass `import.meta.env.AUTH_SECRET` from Astro context to ensure it's defined.
 */
export async function getSession(request: Request, secret: string): Promise<JWT | null> {
  const url = new URL(request.url)
  const isSecure = url.protocol === "https:"
  const cookieName = isSecure
    ? "__Secure-authjs.session-token"
    : "authjs.session-token"

  const token = await getToken({
    req: request,
    secret,
    cookieName,
    salt: cookieName,
  })

  return token
}
