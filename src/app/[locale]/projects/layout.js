import { createPageMetadata } from '@/lib/createPageMetadata'

export const generateMetadata = createPageMetadata('projects', '/projects')

export default function ProjectsLayout({ children }) {
	return children
}
