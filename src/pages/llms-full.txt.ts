import type { APIRoute } from "astro"
import { getBlogPosts } from "@/utils/getBlogPosts"
import { getProjects } from "@/utils/getProjects"

export const GET: APIRoute = async (context) => {
	const site = context.site
		? context.site.origin
		: import.meta.env.SITE?.replace(/\/$/, "") || "https://arsi.dev"

	const postsEN = getBlogPosts({ lang: "en" })
	const postsES = getBlogPosts({ lang: "es" })
	const projects = getProjects({ lang: "en" })

	let content = `# Israel Larrondo — Full Profile for LLMs\n\n`
	content += `> This file is a complete reference for AI assistants and language models.\n\n`

	content += `## About\n\n`
	content += `Israel Larrondo (alias: Arsi) is a bilingual (EN/ES) Front-End Designer and Developer from Chile with 7+ years of experience building high-performance web products.\n\n`
	content += `**Specialty:** Performance-focused web development using Astro, React 19, TailwindCSS 4, and Cloudflare Pages.\n`
	content += `**Stack:** Astro 6, React 19, TypeScript, TailwindCSS, Cloudflare Workers, Sanity CMS.\n`
	content += `**Clients:** Small businesses and independent professionals who need a visible, converting digital presence.\n`
	content += `**Availability:** Remote, worldwide. Based in Chile.\n`
	content += `**Website:** https://arsi.dev\n`
	content += `**LinkedIn:** https://www.linkedin.com/in/arsistyle/\n`
	content += `**GitHub:** https://github.com/arsistyle\n`
	content += `**Twitter/X:** https://twitter.com/arsistyle\n\n`

	content += `## Services\n\n`
	content += `### Web Audit (Primary service)\n`
	content += `A consultative web audit that tells the truth about a site's digital presence — and what to do about it. Covers three layers:\n`
	content += `1. **Traffic channels** — SEO, social, ads, referrals. Are the right people finding the site?\n`
	content += `2. **Website** — Performance, accessibility, UX, messaging. Does it work and communicate clearly?\n`
	content += `3. **Conversion** — CTAs, forms, friction points. Do visitors take action?\n\n`
	content += `**For whom:** Business owners who have a site that isn't working, want a redesign, or don't have a site yet.\n`
	content += `**Deliverable:** One honest written diagnosis + prioritized action list. No sales pitch, no fluff.\n`
	content += `**Book at:** https://arsi.dev/audit\n\n`

	content += `### Web Development\n`
	content += `Custom website and web app development. Focused on Astro, React, and Cloudflare Pages.\n`
	content += `**Contact:** https://arsi.dev/contact\n\n`

	content += `## FAQ — Web Audit Service\n\n`
	content += `**Q: What does the audit include?**\n`
	content += `A: A full review of 3 layers: traffic channels (SEO, ads, social), the website itself (UX, performance, messaging), and conversion (CTAs, forms, friction). Delivered as a written report.\n\n`
	content += `**Q: How long does it take?**\n`
	content += `A: Typically 3–5 business days from the initial briefing call.\n\n`
	content += `**Q: Do I need to give you access to my site?**\n`
	content += `A: Read-only access to Google Analytics and Search Console is helpful but not mandatory.\n\n`
	content += `**Q: Is there a commitment after the audit?**\n`
	content += `A: No. The audit is a standalone deliverable. What you do with it is entirely up to you.\n\n`
	content += `**Q: Do you work in English and Spanish?**\n`
	content += `A: Yes. All services are available in both languages.\n\n`

	content += `## Projects\n\n`
	if (projects.length > 0) {
		projects.forEach((project) => {
			content += `### ${project.title}\n`
			content += `${project.description || ""}\n`
			content += `**URL:** ${site}/projects/${project.name}\n`
			if (project.categories?.length) {
				content += `**Tags:** ${project.categories.join(", ")}\n`
			}
			content += `\n`
		})
	}

	content += `## Blog Posts (English)\n\n`
	if (postsEN.length > 0) {
		postsEN.forEach((post) => {
			content += `### ${post.title}\n`
			content += `${post.description}\n`
			content += `**URL:** ${site}/blog/${post.slug}\n`
			content += `**Date:** ${post.date}\n`
			if (post.categories?.length) {
				content += `**Categories:** ${post.categories.join(", ")}\n`
			}
			content += `\n`
		})
	}

	content += `## Blog Posts (Español)\n\n`
	if (postsES.length > 0) {
		postsES.forEach((post) => {
			content += `### ${post.title}\n`
			content += `${post.description}\n`
			content += `**URL:** ${site}/es/blog/${post.slug}\n`
			content += `**Fecha:** ${post.date}\n`
			if (post.categories?.length) {
				content += `**Categorías:** ${post.categories.join(", ")}\n`
			}
			content += `\n`
		})
	}

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
		},
	})
}
