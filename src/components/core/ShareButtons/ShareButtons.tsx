import { IconBrandX, IconBrandLinkedin, IconBrandFacebook, IconLink } from "@tabler/icons-react"
import { useState } from "react"

interface Props {
	title: string
	slug: string
	basePath: string
	copiedLabel?: string
}

export default function ShareButtons({ title, slug, basePath, copiedLabel = "Copied!" }: Props) {
	const [copied, setCopied] = useState(false)

	const getUrl = () => {
		if (typeof window !== "undefined") {
			return window.location.href
		}
		return `${basePath}/${slug}`
	}

	const shareOnX = () => {
		const url = getUrl()
		window.open(
			`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
			"_blank"
		)
	}

	const shareOnLinkedin = () => {
		const url = getUrl()
		window.open(
			`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
			"_blank"
		)
	}

	const shareOnFacebook = () => {
		const url = getUrl()
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
	}

	const copyLink = () => {
		navigator.clipboard.writeText(getUrl())
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const btnClass =
		"flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition-all duration-200 hover:border-gray-400 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-200"

	return (
		<div className="flex items-center gap-2">
			<button onClick={shareOnX} className={btnClass} aria-label="Share on X" title="X">
				<IconBrandX size={18} />
			</button>
			<button
				onClick={shareOnLinkedin}
				className={btnClass}
				aria-label="Share on LinkedIn"
				title="LinkedIn"
			>
				<IconBrandLinkedin size={18} />
			</button>
			<button
				onClick={shareOnFacebook}
				className={btnClass}
				aria-label="Share on Facebook"
				title="Facebook"
			>
				<IconBrandFacebook size={18} />
			</button>
			<button
				onClick={copyLink}
				className={`${btnClass} relative`}
				aria-label="Copy link"
				title="Copy link"
			>
				<IconLink size={18} />
				{copied && (
					<span className="bg-primary-500 absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap text-white">
						{copiedLabel}
					</span>
				)}
			</button>
		</div>
	)
}
