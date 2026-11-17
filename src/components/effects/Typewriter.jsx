import { useEffect, useState } from 'react'

export default function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pause = 1400,
}) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout

    if (!isDeleting && text === currentWord) {
      // Kata sudah lengkap: diam sebentar, lalu mulai menghapus
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else {
      timeout = setTimeout(
        () => {
          if (isDeleting) {
            const next = currentWord.slice(0, text.length - 1)
            setText(next)
            if (next === '') {
              // Kata habis terhapus: pindah ke kata berikutnya
              setIsDeleting(false)
              setWordIndex((i) => (i + 1) % words.length)
            }
          } else {
            setText(currentWord.slice(0, text.length + 1))
          }
        },
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause])

  return (
    <span>
      {text}
      <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] animate-pulse bg-hi" />
    </span>
  )
}
