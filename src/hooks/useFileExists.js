import { useEffect, useState } from "react";

// Mengecek apakah sebuah file PDF benar-benar ada di website
export default function useFileExists(url) {
  const [result, setResult] = useState({ url: "", ok: false });

  useEffect(() => {
    let cancelled = false;

    fetch(url, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        return res.ok && type.includes("pdf");
      })
      .catch(() => false)
      .then((ok) => {
        if (!cancelled) setResult({ url, ok });
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return {
    checking: result.url !== url,
    exists: result.url === url && result.ok,
  };
}
