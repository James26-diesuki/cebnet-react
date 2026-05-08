import { useEffect, useRef } from 'react'

export default function PageLoader() {
  const loaderRef = useRef(null)
  const barRef    = useRef(null)

  useEffect(() => {
    const loader = loaderRef.current
    const bar    = barRef.current
    if (!loader || !bar) return

    document.body.style.overflow = 'hidden'

    let progress = 0
    const tick = setInterval(() => {
      progress += (85 - progress) * 0.055
      bar.style.width = progress.toFixed(2) + '%'
    }, 30)

    function dismiss() {
      clearInterval(tick)
      bar.style.transition = 'width .3s ease'
      bar.style.width = '100%'
      setTimeout(() => {
        loader.classList.add('hidden')
        document.body.style.overflow = ''
      }, 350)
    }

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
      setTimeout(dismiss, 4000)
    }
  }, [])

  return (
    <div className="page-loader" id="page-loader" ref={loaderRef} aria-hidden="true">
      <div className="loader-logo">
        <img src="/assets/img/team/cebnet.png" alt="" />
      </div>
      <div className="loader-bar-wrap">
        <div className="loader-bar" id="loader-bar" ref={barRef}></div>
      </div>
    </div>
  )
}
