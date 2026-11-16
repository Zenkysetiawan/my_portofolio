import { useEffect, useState } from "react";

export default function Typewriter({
  words,
  typingSpeed = 90,
  deletingSpeed = 50,
  pause = 1400,
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && text === currentWord) {
      // Kata sudah lengkap: diam sebentar, lalu mulai menghapus
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else {
      timeout = setTimeout(
        () => {
          if (isDeleting) {
            const next = currentWord.slice(0, text.length - 1);
            setText(next);
            if (next === "") {
              // Kata habis terhapus: pindah ke kata berikutnya
              setIsDeleting(false);
              setWordIndex((i) => (i + 1) % words.length);
            }
          } else {
            setText(currentWord.slice(0, text.length + 1));
          }
        },
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span>
      {text}
      <span className="animate-pulse text-blue-500">|</span>
    </span>
  );
}
