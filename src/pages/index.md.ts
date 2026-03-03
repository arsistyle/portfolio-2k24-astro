import type { APIRoute } from "astro"
import { getEntry } from "astro:content"
import { getSiteUrl } from "@/utils/getSiteUrl"

export const GET: APIRoute = async (context) => {
	const site = getSiteUrl(context)
	const seoEntry = await getEntry("seo", "en" as any)
	const seo = (seoEntry as any)?.data?.pages?.home

	let content = `# ${seo?.title || "Israel Larrondo | Front-End Designer"}\n\n`
	content += `${seo?.description || "Creative developer focused on interactive experiences, premium interfaces, and cutting-edge solutions."}\n\n`

	content += `## Navigation\n`
	content += `- [Blog](${site}/blog/index.md)\n`
	content += `- [Projects](${site}/projects/index.md)\n`
	content += `- [Spanish version](${site}/es/index.md)\n\n`

	content += `## About\n`
	content += `Israel Larrondo is a Creative Developer & Designer with over 7 years of experience. Focused on building high-end interfaces and interactive experiences using modern web technologies like Astro, React, and AI-driven workflows.\n\n`

	content += `## Technical Stack\n`
	content += `- **Frontend:** React, Astro, Next.js, TypeScript, Tailwind CSS\n`
	content += `- **Design:** Figma, UX/UI Design, Visual Identity\n`
	content += `- **AI:** LLM integration, Advanced Prompting, Workflow Automation\n`

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
