import { useState, useEffect, useRef } from "react"

const NANO_BANANA = "Nano Banana"

const NanoBananaIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 32 32"
		width="12"
		height="12"
		style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle" }}
	>
		<defs>
			<linearGradient
				id="nb-filter-grad"
				spreadMethod="pad"
				gradientUnits="userSpaceOnUse"
				x1="-33"
				y1="26"
				x2="31"
				y2="-28"
			>
				<stop offset="0%" stopColor="rgb(52,107,241)" />
				<stop offset="45%" stopColor="rgb(49,134,255)" />
				<stop offset="99%" stopColor="rgb(79,160,255)" />
			</linearGradient>
		</defs>
		<g transform="matrix(0.1248,0,0,0.1248,4.986,4.986)" opacity="1">
			<g opacity="1" transform="matrix(1,0,0,1,88.25,88.25)">
				<path
					fill="url(#nb-filter-grad)"
					d="M-3.9,-84.95 C-5.28,-79.47 -7.08,-74.14 -9.32,-68.93 C-15.16,-55.37 -23.16,-43.5 -33.33,-33.33 C-43.5,-23.17 -55.37,-15.16 -68.93,-9.32 C-74.13,-7.08 -79.47,-5.28 -84.95,-3.9 C-86.74,-3.45 -88,-1.85 -88,0 C-88,1.85 -86.74,3.45 -84.95,3.9 C-79.47,5.28 -74.14,7.08 -68.93,9.32 C-55.37,15.16 -43.51,23.16 -33.33,33.33 C-23.16,43.5 -15.15,55.37 -9.32,68.93 C-7.08,74.13 -5.28,79.47 -3.9,84.95 C-3.45,86.74 -1.84,88 0,88 C1.85,88 3.45,86.74 3.9,84.95 C5.28,79.47 7.08,74.14 9.32,68.93 C15.16,55.37 23.16,43.51 33.33,33.33 C43.5,23.16 55.37,15.15 68.93,9.32 C74.13,7.08 79.47,5.28 84.95,3.9 C86.74,3.45 88,1.84 88,0 C88,-1.85 86.74,-3.45 84.95,-3.9 C79.47,-5.28 74.14,-7.08 68.93,-9.32 C55.37,-15.16 43.51,-23.16 33.33,-33.33 C23.16,-43.5 15.15,-55.37 9.32,-68.93 C7.08,-74.13 5.28,-79.47 3.9,-84.95 C3.45,-86.74 1.85,-88 0,-88 C-1.85,-88 -3.45,-86.74 -3.9,-84.95z"
				/>
			</g>
		</g>
	</svg>
)

const SearchIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</svg>
)

const FilterIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
	</svg>
)

const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
)

interface CategoryWithCount {
	name: string
	label: string
	icon?: string
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
	allLabel,
	noResultsLabel,
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
		<div className="blog-filter-bar">
			{/* Search */}
			<div className="blog-search-wrapper">
				<span className="blog-search-icon">
					<SearchIcon />
				</span>
				<input
					type="text"
					value={search}
					onChange={(e) => handleSearch(e.target.value)}
					placeholder={searchPlaceholder}
					className="blog-search-input"
				/>
				{search && (
					<button
						type="button"
						onClick={() => handleSearch("")}
						className="blog-search-clear"
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
				className={`blog-filter-btn ${selectedCount > 0 ? "has-selection" : ""}`}
			>
				<FilterIcon />
				<span>{filterLabel}</span>
				{selectedCount > 0 && <span className="blog-filter-badge">{selectedCount}</span>}
			</button>

			{/* Results counter */}
			<span className="blog-results-count">
				{resultCount} {resultsLabel}
			</span>

			{/* Filter Modal */}
			{modalOpen && (
				<div className="blog-modal-overlay" onClick={() => setModalOpen(false)}>
					<div className="blog-modal" onClick={(e) => e.stopPropagation()}>
						{/* Header */}
						<div className="blog-modal-header">
							<h3 className="blog-modal-title">{filterLabel.toUpperCase()}</h3>
							<button
								type="button"
								onClick={() => setModalOpen(false)}
								className="blog-modal-close"
								aria-label="Close"
							>
								<CloseIcon />
							</button>
						</div>

						{/* Body — category pills */}
						<div className="blog-modal-body">
							<div className="blog-modal-pills">
								{categories.map((cat) => {
									const isActive = pending.includes(cat.name)
									const customClass = cat.className
									return (
										<button
											key={cat.name}
											type="button"
											onClick={() => togglePending(cat.name)}
											className={[
												"blog-pill",
												isActive ? "blog-pill--active" : "",
												customClass,
												customClass && isActive ? `${customClass}-active` : "",
											]
												.filter(Boolean)
												.join(" ")}
										>
											{cat.icon && <span className="blog-pill-icon">{cat.icon}</span>}
											{cat.label}
											<span className="blog-pill-count">{cat.count}</span>
										</button>
									)
								})}
							</div>
						</div>

						{/* Footer */}
						<div className="blog-modal-footer">
							<button
								type="button"
								onClick={clearPending}
								className="blog-modal-btn blog-modal-btn--clear"
							>
								{clearAllLabel}
							</button>
							<button
								type="button"
								onClick={confirmFilter}
								className="blog-modal-btn blog-modal-btn--confirm"
							>
								{confirmLabel}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
