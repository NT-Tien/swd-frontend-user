import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ActionButton } from '../components'
import { ArrowUpIcon } from '../assets'

function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <ActionButton
            active
            onClick={scrollToTop}
            className="fixed z-40 p-1 rounded-full bottom-10 right-[5svw] aspect-square max-w-10 hover:scale-[1.03]"
        >
            <ArrowUpIcon />
        </ActionButton>
    )
}

export default ScrollToTop
