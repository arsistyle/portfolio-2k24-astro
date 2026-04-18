import { z } from "zod"

export const errorMessages: Record<string, Record<string, string>> = {
	es: {
		nameMin: "El nombre debe tener al menos 2 caracteres",
		nameMax: "Nombre demasiado largo",
		email: "Correo electrónico inválido",
		subject: "Por favor selecciona un asunto",
		messageMin: "El mensaje debe tener al menos 10 caracteres",
		messageMax: "Mensaje demasiado largo",
		captcha: "Verificación de Captcha requerida",
		generic: "Datos inválidos",
		serverError: "Error del servidor. Por favor intenta de nuevo.",
		emailSent: "Correo electrónico enviado exitosamente",
		invalidCaptcha: "Verificación de Captcha inválida",
		unexpectedError: "Ocurrió un error inesperado",
		missingKeys: "Error de configuración del servidor",
	},
	en: {
		nameMin: "Name must be at least 2 characters",
		nameMax: "Name is too long",
		email: "Invalid email address",
		subject: "Please select a subject",
		messageMin: "Message must be at least 10 characters",
		messageMax: "Message is too long",
		captcha: "Captcha verification required",
		generic: "Invalid data",
		serverError: "Server error. Please try again.",
		emailSent: "Email sent successfully",
		invalidCaptcha: "Invalid Captcha verification",
		unexpectedError: "An unexpected error occurred",
		missingKeys: "Server configuration error",
	},
}

export const getContactSchema = (lang: string) => {
	const messages = errorMessages[lang] || errorMessages["es"]

	return z.object({
		"name": z.string().min(2, messages.nameMin).max(100, messages.nameMax),
		"email": z.email(messages.email),
		"subject": z.string().min(1, messages.subject),
		"message": z.string().min(10, messages.messageMin).max(5000, messages.messageMax),
		"cf-turnstile-response": z.string().min(1, messages.captcha),
	})
}
