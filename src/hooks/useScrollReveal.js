import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    if (!revealEls.length) return

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}

export function useCounterAnimation() {
  useEffect(() => {
    function animateCount(el) {
      const target = parseFloat(el.dataset.target)
      const suffix = el.dataset.suffix || ''
      const prefix = el.dataset.prefix || ''
      const dur = 1800, step = 16
      const steps = dur / step
      let current = 0
      const inc = target / steps
      const timer = setInterval(() => {
        current += inc
        if (current >= target) { current = target; clearInterval(timer) }
        const display = Number.isInteger(target)
          ? Math.floor(current).toLocaleString()
          : current.toFixed(1)
        el.textContent = prefix + display + suffix
      }, step)
    }

    const counters = document.querySelectorAll('[data-target]')
    if (!counters.length) return

    const cObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target) }
      })
    }, { threshold: 0.5 })

    counters.forEach(c => cObs.observe(c))
    return () => cObs.disconnect()
  })
}
