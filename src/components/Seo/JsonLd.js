/**
 * Structured data. Server-rendered so crawlers see it in the HTML.
 *
 * Kept as a component rather than inline strings so every page emits the same
 * shape, and so the values come from the same config the visible copy uses.
 */
export default function JsonLd({ data }) {
	if (!data) return null
	return (
		<script
			type="application/ld+json"
			// The payload is built from our own config, never from user input.
			dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
		/>
	)
}
