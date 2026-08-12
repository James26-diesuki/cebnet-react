import { useRef, useState } from 'react'

const MAX_RETRIES = 2

// A logo image that retries a couple of times (with a short backoff) before
// falling back to a text label. Contentful's asset CDN occasionally has a
// slow or failed first hit — without a retry, that single failed request
// permanently hides the image until the user reloads the page. Using `key`
// forces React to mount a brand-new <img> on each retry, which guarantees
// the browser actually issues a fresh network request.
export default function PartnerLogo({ src, name, imgClassName, fallbackClassName }) {
  const [attempt, setAttempt] = useState(0)
  const [failed,  setFailed]  = useState(false)
  const retries = useRef(0)

  if (!src || failed) {
    return <div className={fallbackClassName}>{name}</div>
  }

  const handleError = () => {
    if (retries.current < MAX_RETRIES) {
      retries.current += 1
      setTimeout(() => setAttempt(a => a + 1), 400 * retries.current)
    } else {
      setFailed(true)
    }
  }

  return (
    <img
      key={attempt}
      src={src}
      alt={name}
      title={name}
      className={imgClassName}
      onError={handleError}
    />
  )
}
