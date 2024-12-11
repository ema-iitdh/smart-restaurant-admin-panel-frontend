import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
	const location = useLocation()
	useEffect(() => {
		const scrollableContainer = document.querySelector('#main-content') // Change selector as needed
		if (scrollableContainer) {
			scrollableContainer.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		} else {
			// Fall back to window scroll
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}
	}, [location])
	return null
}

// Define a base title
// const baseTitle = 'Restaurant'
// // Create a title based on the current pathname
// const pathName =
// 	pathname === '/'
// 		? baseTitle
// 		: `${baseTitle} | ${
// 				pathname.replace('/', '').charAt(0).toUpperCase() +
// 				pathname.slice(2)
// 		  }`

// document.title = pathName
