/**
 * Strip MDX/JSX syntax to extract only prose text for accurate word counting.
 */
export function extractProseText(raw: string): string {
	return (
		raw
			// Remove frontmatter
			.replace(/^---[\s\S]*?---/, "")
			// Remove import/export statements
			.replace(/^(import|export)\s+.*$/gm, "")
			// Remove fenced code blocks (``` ... ```)
			.replace(/```[\s\S]*?```/g, "")
			// Remove inline code
			.replace(/`[^`]*`/g, "")
			// Remove JSX expressions ({ ... })
			.replace(/\{[^{}]*\}/g, "")
			// Remove HTML/JSX tags
			.replace(/<[^>]+>/g, "")
			// Remove markdown images ![alt](url)
			.replace(/!\[.*?\]\(.*?\)/g, "")
			// Keep link text, remove link syntax [text](url)
			.replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
			// Remove heading markers
			.replace(/^#+\s*/gm, "")
			// Remove bold/italic markers
			.replace(/[*_]{1,3}/g, "")
			// Collapse whitespace
			.replace(/\s+/g, " ")
			.trim()
	)
}
