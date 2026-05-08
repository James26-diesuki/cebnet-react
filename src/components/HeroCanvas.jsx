import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const CFG = {
      nodeCount: 72, connectDist: 180, nodeSpeed: 0.28,
      nodeRadiusMin: 1.2, nodeRadiusMax: 2.8,
      lineOpacity: 0.13, nodeOpacity: 0.55,
      accentColor: '232,37,26', baseColor: '255,255,255',
      pulseInterval: 2800,
    }

    let W, H, nodes, animId, pulses = []

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function makeNode() {
      const isAccent = Math.random() < 0.12
      return {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * CFG.nodeSpeed,
        vy: (Math.random() - 0.5) * CFG.nodeSpeed,
        r: CFG.nodeRadiusMin + Math.random() * (CFG.nodeRadiusMax - CFG.nodeRadiusMin),
        accent: isAccent,
      }
    }

    function init() { resize(); nodes = Array.from({ length: CFG.nodeCount }, makeNode) }

    function spawnPulse() {
      const n = nodes[Math.floor(Math.random() * nodes.length)]
      pulses.push({ x: n.x, y: n.y, r: 0, maxR: 80, alpha: 0.5, accent: n.accent })
    }

    const pulseTimer = setInterval(spawnPulse, CFG.pulseInterval)

    function draw() {
      ctx.clearRect(0, 0, W, H)

      pulses = pulses.filter(p => p.alpha > 0.01)
      pulses.forEach(p => {
        p.r += 1.1; p.alpha *= 0.965
        const color = p.accent ? CFG.accentColor : CFG.baseColor
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${color},${p.alpha})`; ctx.lineWidth = 1; ctx.stroke()
      })

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < -10) n.x = W + 10; if (n.x > W + 10) n.x = -10
        if (n.y < -10) n.y = H + 10; if (n.y > H + 10) n.y = -10
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CFG.connectDist) {
            const fade = 1 - dist / CFG.connectDist
            const isRedEdge = a.accent || b.accent
            const color = isRedEdge ? CFG.accentColor : CFG.baseColor
            const opacity = isRedEdge ? CFG.lineOpacity * fade * 1.8 : CFG.lineOpacity * fade
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${color},${opacity})`; ctx.lineWidth = isRedEdge ? 0.8 : 0.5; ctx.stroke()
          }
        }
      }

      nodes.forEach(n => {
        const color = n.accent ? CFG.accentColor : CFG.baseColor
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
        grd.addColorStop(0, `rgba(${color},${n.accent ? 0.18 : 0.06})`)
        grd.addColorStop(1, `rgba(${color},0)`)
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = grd; ctx.fill()
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${n.accent ? 0.9 : CFG.nodeOpacity})`; ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    init(); draw()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(pulseTimer)
      ro.disconnect()
    }
  }, [])

  return <canvas className="hero-canvas" id="hero-canvas" ref={canvasRef} />
}
