import { useState, useEffect } from "react"
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
	resultCount: number
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
	const url = new URL(
		window.location.origin + window.location.pathname.replace(/\/(\d+)?$/, "") || "/blog"
	)

	if (window.location.pathname.startsWith("/es/")) {
		url.pathname = "/es/blog"
	} else if (window.location.pathname.startsWith("/blog")) {
		url.pathname = "/blog"
	}

	if (selected.length > 0) {
		url.searchParams.set("categories", selected.join(","))
	}
	if (search.trim()) {
		url.searchParams.set("q", search.trim())
	}

	window.location.href = url.toString()
}

export default function CategoryFilter({
	categories,
	searchPlaceholder,
	resultsLabel,
	filterLabel,
	clearAllLabel,
	confirmLabel,
	resultCount,
}: CategoryFilterProps) {
	const initialParams = readURLParams()
	const [selected, setSelected] = useState<string[]>(initialParams.categories)
	const [search, setSearch] = useState(initialParams.search)
	const [modalOpen, setModalOpen] = useState(false)
	const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)
	const [pending, setPending] = useState<string[]>([])

	useEffect(() => {
		setPortalRoot(document.getElementById("modal-root"))
	}, [])

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setModalOpen(false)
		}
		if (modalOpen) {
			document.addEventListener("keydown", handleKey)
			return () => document.removeEventListener("keydown", handleKey)
		}
	}, [modalOpen])

	const triggerSearch = () => {
		updateURL(selected, search)
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			triggerSearch()
		}
	}

	const handleSearchChange = (value: string) => {
		setSearch(value)
		// No auto-trigger on change as requested
	}

	const openModal = () => {
		setPending([...selected])
		setModalOpen(true)
	}

	const togglePending = (category: string) => {
		setPending((prev) =>
			prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
		)
	}

	const clearPending = () => setPending([])

	const confirmFilter = () => {
		updateURL(pending, search)
		setModalOpen(false)
	}

	const selectedCount = selected.length

	return (
		<>
			<div className="flex flex-wrap items-center gap-3">
				<div className="relative w-full min-w-0 basis-full md:flex-1 md:basis-0">
					<span className="text-dark absolute top-1/2 left-3 -translate-y-1/2 dark:text-gray-400">
						<IconSearch size={16} />
					</span>
					<input
						type="text"
						value={search}
						onChange={(e) => handleSearchChange(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={searchPlaceholder}
						className="border-dark/60 w-full rounded-xl border bg-transparent py-2.5 pr-12 pl-10 text-sm text-gray-700 transition-colors outline-none placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-gray-500"
					/>
					<div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-1">
						{search && (
							<button
								type="button"
								onClick={() => {
									setSearch("")
									updateURL(selected, "")
								}}
								className="cursor-pointer p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
								aria-label="Clear search"
							>
								<IconX size={14} />
							</button>
						)}
						<button
							type="button"
							onClick={triggerSearch}
							className="bg-primary-400 hover:bg-primary-500 text-dark flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors"
							aria-label="Search"
						>
							<IconSearch size={16} />
						</button>
					</div>
				</div>

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
