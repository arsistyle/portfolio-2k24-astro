import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { CATEGORIES } from "@/config/categories"
import { IconSearch, IconFilter, IconX } from "@tabler/icons-react"

interface CategoryWithCount {
	name: string
	label: string
	icon?: any
	className?: string
	order: number
	count: number
}

interface CategoryFilterProps {
	categories: CategoryWithCount[]
	allLabel: string
	noResultsLabel: string
	searchPlaceholder: string
	resultsLabel: string
	filterLabel: string
	clearAllLabel: string
	confirmLabel: string
	postsPerPage?: number
}

function readURLParams(): { categories: string[]; search: string } {
	if (typeof window === "undefined") return { categories: [], search: "" }
	const params = new URLSearchParams(window.location.search)
	const rawCats = params.get("categories")
	const search = params.get("q") || ""
	const categories = rawCats
		? rawCats
				.split(",")
				.map((c) => decodeURIComponent(c.trim()))
				.filter(Boolean)
		: []
	return { categories, search }
}

function updateURL(selected: string[], search: string) {
	const url = new URL(window.location.href)
	if (selected.length === 0) {
		url.searchParams.delete("categories")
	} else {
		url.searchParams.set("categories", selected.join(","))
	}
	if (!search.trim()) {
		url.searchParams.delete("q")
	} else {
		url.searchParams.set("q", search.trim())
	}
	window.history.replaceState({}, "", url.toString())
}

export default function CategoryFilter({
	categories,
	searchPlaceholder,
	resultsLabel,
	filterLabel,
	clearAllLabel,
	confirmLabel,
	postsPerPage = 6,
}: CategoryFilterProps) {
	const [selected, setSelected] = useState<string[]>([])
	const [search, setSearch] = useState("")
	const [resultCount, setResultCount] = useState(0)
	const [modalOpen, setModalOpen] = useState(false)
	const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
	const [pending, setPending] = useState<string[]>([])
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

	const applyFilter = (activeCategories: string[], searchQuery: string) => {
		const cards = document.querySelectorAll<HTMLElement>(".blog-card")
		const hasFilter = activeCategories.length > 0
		const query = searchQuery.toLowerCase().trim()
		let matchIndex = 0
		let totalMatching = 0

		cards.forEach((card) => {
			const cardCategories = card.getAttribute("data-categories")?.split(",") || []
			const cardSearch = (card.getAttribute("data-search") || "").toLowerCase()

			const matchesCategory = !hasFilter || activeCategories.some((c) => cardCategories.includes(c))
			const matchesSearch = !query || cardSearch.includes(query)

			if (matchesCategory && matchesSearch) {
				totalMatching++
				if (matchIndex < postsPerPage) {
					card.style.display = ""
					card.setAttribute("data-animating", "")
					setTimeout(() => card.removeAttribute("data-animating"), 400)
				} else {
					card.style.display = "none"
				}
				matchIndex++
			} else {
				card.style.display = "none"
			}
		})

		setResultCount(totalMatching)

		const noResults = document.getElementById("blog-no-results")
		if (noResults) noResults.style.display = totalMatching === 0 ? "" : "none"

		const grid = document.querySelector<HTMLElement>(".blog-grid")
		if (grid) grid.style.display = totalMatching === 0 ? "none" : ""

		const sentinel = document.getElementById("blog-scroll-sentinel")
		if (sentinel) {
			sentinel.style.display = Math.min(matchIndex, postsPerPage) >= totalMatching ? "none" : ""
			sentinel.setAttribute("data-visible-count", String(Math.min(matchIndex, postsPerPage)))
			sentinel.setAttribute("data-categories", activeCategories.join(","))
			sentinel.setAttribute("data-search", searchQuery)
		}
	}

	// Initialize from URL on mount
	useEffect(() => {
		const params = readURLParams()
		setSelected(params.categories)
		setSearch(params.search)
		applyFilter(params.categories, params.search)
		setPortalRoot(document.getElementById("modal-root"))
	}, [])

	// Close modal on Escape
	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setModalOpen(false)
		}
		if (modalOpen) {
			document.addEventListener("keydown", handleKey)
			return () => document.removeEventListener("keydown", handleKey)
		}
	}, [modalOpen])

	const handleSearch = (value: string) => {
		setSearch(value)
		if (debounceRef.current) clearTimeout(debounceRef.current)
		debounceRef.current = setTimeout(() => {
			updateURL(selected, value)
			applyFilter(selected, value)
		}, 300)
	}

	// Open modal — copy current selection to pending
	const openModal = () => {
		setPending([...selected])
		setModalOpen(true)
	}

	// Toggle a category in the pending state (doesn't apply yet)
	const togglePending = (category: string) => {
		setPending((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
		)
	}

	// Clear all pending selections
	const clearPending = () => {
		setPending([])
	}

	// Confirm — apply pending selections
	const confirmFilter = () => {
		setSelected(pending)
		updateURL(pending, search)
		applyFilter(pending, search)
		setModalOpen(false)
	}

	const selectedCount = selected.length

	return (
		<>
			<div className="flex flex-wrap items-center gap-3">
				{/* Search */}
				<div className="relative w-full min-w-0 basis-full md:flex-1 md:basis-0">
					<span className="text-dark absolute top-1/2 left-3 -translate-y-1/2 dark:text-gray-400">
						<IconSearch size={16} />
					</span>
					<input
						type="text"
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
						placeholder={searchPlaceholder}
						className="border-dark/60 w-full rounded-xl border bg-transparent py-2.5 pr-3 pl-10 text-sm text-gray-700 transition-colors outline-none placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
					/>
					{search && (
						<button
							type="button"
							onClick={() => handleSearch("")}
							className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-xs text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
							aria-label="Clear search"
						>
							✕
						</button>
					)}
				</div>

				{/* Filter Button */}
				<button
					type="button"
					onClick={openModal}
					className={`hover:border-primary-400 dark:hover:border-primary-400 flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-600 transition-colors dark:border-gray-700 dark:text-gray-400 ${selectedCount > 0 ? "border-primary-400 text-primary-600 dark:border-primary-400 dark:text-primary-300" : ""}`}
				>
					<IconFilter size={16} />
					<span>{filterLabel}</span>
					{selectedCount > 0 && (
						<span className="bg-primary-400 text-dark flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold">
							{selectedCount}
						</span>
					)}
				</button>

				{/* Results counter */}
				<span className="ml-auto text-sm whitespace-nowrap text-gray-500 md:ml-0 dark:text-gray-400">
					{resultCount} {resultsLabel}
				</span>
			</div>
			{/* Filter Modal */}
			{modalOpen &&
				portalRoot &&
				createPortal(
					<div
						className="animate-blog-overlay-in fixed inset-0 z-[999] flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
						onClick={() => setModalOpen(false)}
					>
						<div
							className="animate-blog-modal-in dark:bg-black-800 flex max-h-[70vh] w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl"
							onClick={(e) => e.stopPropagation()}
						>
							{/* Header */}
							<div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800">
								<h3 className="text-base font-bold tracking-wide text-gray-800 dark:text-gray-100">
									{filterLabel.toUpperCase()}
								</h3>
								<button
									type="button"
									onClick={() => setModalOpen(false)}
									className="cursor-pointer rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
									aria-label="Close"
								>
									<IconX size={20} />
								</button>
							</div>

							{/* Body — category pills */}
							<div className="flex-1 overflow-y-auto px-6 py-5">
								<div className="flex flex-wrap gap-2.5">
									{categories.map((cat) => {
										const isActive = pending.includes(cat.name)
										const customClass = cat.className
										const config = CATEGORIES.find((c) => c.name === cat.name)
										const Icon = config?.icon
										return (
											<button
												key={cat.name}
												type="button"
												onClick={() => togglePending(cat.name)}
												className={[
													"flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-200 select-none hover:border-gray-400 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500",
													isActive
														? "border-primary-400 bg-primary-400/10 text-primary-600 dark:border-primary-400 dark:text-primary-300"
														: "",
													customClass,
												]
													.filter(Boolean)
													.join(" ")}
											>
												{Icon && (
													<span className="icon text-xl leading-1">
														<Icon />
													</span>
												)}
												{cat.label}
												<span
													className={`ml-0.5 text-xs ${isActive ? "text-primary-400 dark:text-primary-400" : "text-gray-400 dark:text-gray-500"}`}
												>
													{cat.count}
												</span>
											</button>
										)
									})}
								</div>
							</div>

							{/* Footer */}
							<div className="flex gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800">
								<button
									type="button"
									onClick={clearPending}
									className="flex-1 cursor-pointer rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm font-bold tracking-wide text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
								>
									{clearAllLabel}
								</button>
								<button
									type="button"
									onClick={confirmFilter}
									className="bg-primary-400 hover:bg-primary-500 text-dark flex-1 cursor-pointer rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-colors"
								>
									{confirmLabel}
								</button>
							</div>
						</div>
					</div>,
					portalRoot
				)}
		</>
	)
}
