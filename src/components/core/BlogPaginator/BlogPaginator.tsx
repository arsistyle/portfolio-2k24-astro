import { useState, useEffect } from "react"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

interface BlogIndexEntry {
	slug: string
	title: string
	date: string
	status: string
	lang: string
}

interface Props {
	slug: string
	lang: string
	basePath: string
	prevLabel?: string
	nextLabel?: string
}

export default function BlogPaginator({
	slug,
	lang,
	basePath,
	prevLabel = "Previous",
	nextLabel = "Next",
}: Props) {
	const [prev, setPrev] = useState<BlogIndexEntry | null>(null)
	const [next, setNext] = useState<BlogIndexEntry | null>(null)
	const [ready, setReady] = useState(false)

	useEffect(() => {
		fetch("/api/blog-index.json")
			.then((r) => r.json())
			.then((all: BlogIndexEntry[]) => {
				const now = new Date()
				const posts = all
					.filter((p) => p.lang === lang && p.status === "active" && new Date(p.date) <= now)
					.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

				const idx = posts.findIndex((p) => p.slug === slug)
				if (idx > 0) setPrev(posts[idx - 1])
				if (idx >= 0 && idx < posts.length - 1) setNext(posts[idx + 1])
				setReady(true)
			})
			.catch(() => setReady(true))
	}, [slug, lang])

	if (!ready || (!prev && !next)) return null

	return (
		<nav className="mt-12 grid grid-cols-1 gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2 dark:border-gray-800">
			{prev ? (
				<a
					href={`${basePath}/${prev.slug}`}
					className="group flex items-center gap-3 rounded-2xl border border-gray-200 p-4 transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-white/[0.03]"
				>
					<span className="text-gray-400 transition-transform duration-200 group-hover:-translate-x-1 dark:text-gray-500">
						<IconChevronLeft size={20} />
					</span>
					<div className="flex min-w-0 flex-col">
						<span className="text-xs font-medium text-gray-400 dark:text-gray-500">
							{prevLabel}
						</span>
						<span className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
							{prev.title}
						</span>
					</div>
				</a>
			) : (
				<div />
			)}

			{next ? (
				<a
					href={`${basePath}/${next.slug}`}
					className="group flex items-center justify-end gap-3 rounded-2xl border border-gray-200 p-4 text-right transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-800 dark:hover:border-gray-600 dark:hover:bg-white/[0.03]"
				>
					<div className="flex min-w-0 flex-col items-end">
						<span className="text-xs font-medium text-gray-400 dark:text-gray-500">
							{nextLabel}
						</span>
						<span className="truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
							{next.title}
						</span>
					</div>
					<span className="text-gray-400 transition-transform duration-200 group-hover:translate-x-1 dark:text-gray-500">
						<IconChevronRight size={20} />
					</span>
				</a>
			) : (
				<div />
			)}
		</nav>
	)
}
