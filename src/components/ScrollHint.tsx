import React, { useEffect, useState } from 'react'

function ScrollHint() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const documentHeight = document.documentElement.scrollHeight
      const isAtBottom = scrollBottom >= documentHeight - 4
      setIsVisible(!isAtBottom)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="hidden md:flex fixed right-5 bottom-28 z-40 items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-3 py-2 shadow-sm text-slate-700">
      <span className="text-xs font-medium tracking-wide uppercase">Asagi kaydir</span>
      <span className="text-sm animate-bounce">↓</span>
    </div>
  )
}

export default ScrollHint

