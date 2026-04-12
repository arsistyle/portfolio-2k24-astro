export const prerender = false

import type { APIRoute } from "astro"
import { errorMessages, getContactSchema } from "@/utils/validations"

export const POST: APIRoute = async ({ request, locals }) => {
	const data = await request.formData()
	const rawData = Object.fromEntries(data.entries())
	const lang = (rawData.lang as string) || "es"
	const messages = errorMessages[lang] || errorMessages["es"]

	try {
		const parsed = getContactSchema(lang).safeParse(rawData)

		if (!parsed.success) {
			return new Response(
				JSON.stringify({ error: parsed.error.issues[0]?.message || messages.generic }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			)
		}

		const {
			name,
			email,
			subject,
			message,
			"cf-turnstile-response": turnstileResponse,
		} = parsed.data

		// Attempt to get secrets from Astro local env (Cloudflare Pages bindings) or standard env
		const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY
		const resendApiKey = import.meta.env.RESEND_API_KEY
		const toEmail = import.meta.env.RESEND_TO_EMAIL
		const fromEmail = import.meta.env.RESEND_FROM_EMAIL

		if (!turnstileSecret || !resendApiKey) {
			console.error("Missing Turnstile or Resend API Keys")
			return new Response(JSON.stringify({ error: messages.serverError }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			})
		}

		// 1. Verify Turnstile
		const turnstileData = new FormData()
		turnstileData.append("secret", turnstileSecret)
		turnstileData.append("response", turnstileResponse)

		const turnstileVerify = await fetch(
			"https://challenges.cloudflare.com/turnstile/v0/siteverify",
			{
				method: "POST",
				body: turnstileData,
			}
		)

		const turnstileResult = await turnstileVerify.json()

		if (!turnstileResult.success) {
			return new Response(JSON.stringify({ error: messages.invalidCaptcha }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			})
		}

		// 2. Send Email via Resend API
		const emailHtmlMsg = `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo electrónico:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `

		const resendReq = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${resendApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: fromEmail,
				to: toEmail,
				subject: `[Arsi.dev Contacto] ${subject} - ${name}`,
				html: emailHtmlMsg,
				reply_to: email,
			}),
		})

		const resendResult = await resendReq.json()

		if (!resendReq.ok) {
			console.error("Resend API Error:", resendResult)
			return new Response(JSON.stringify({ error: messages.serverError }), {
				status: 500,
				headers: { "Content-Type": "application/json" },
			})
		}

		return new Response(JSON.stringify({ success: true, message: messages.emailSent }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		})
	} catch (err: any) {
		console.error("Contact API Exception:", err)
		return new Response(JSON.stringify({ error: messages.unexpectedError }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		})
	}
}
