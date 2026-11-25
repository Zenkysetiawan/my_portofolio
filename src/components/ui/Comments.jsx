import { useCallback, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { supabase } from "../../lib/supabase";
import { useLanguage } from "../../context/LanguageContext";
import Avatar from "./Avatar";

const MAX_NAME = 40;
const MAX_MSG = 500;
const COOLDOWN_MS = 60_000;

// "5 menit lalu" / "5 minutes ago"
function timeAgo(iso, lang) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    if (Math.abs(diff) >= secs)
      return rtf.format(Math.round(diff / secs), unit);
  }
  return rtf.format(0, "second");
}

export default function Comments() {
  const { lang, t } = useLanguage();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // kotak jebakan untuk bot (honeypot)
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | wait
  const [, tick] = useState(0);
  const mounted = useRef(true);

  // Ambil komentar yang sudah disetujui
  const load = useCallback(async () => {
    if (!supabase) return setLoading(false);
    const { data } = await supabase
      .from("comments")
      .select("id,name,message,created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(50);
    if (mounted.current) {
      setList(data || []);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();
    if (!supabase) return;
    // Realtime: kalau ada perubahan di tabel comments, ambil ulang daftarnya
    const channel = supabase
      .channel("comments-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        load,
      )
      .subscribe();
    // Perbarui tulisan "x menit lalu" tiap menit
    const timer = setInterval(() => tick((n) => n + 1), 60000);
    return () => {
      mounted.current = false;
      supabase.removeChannel(channel);
      clearInterval(timer);
    };
  }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    if (trap) return; // bot: pura-pura berhasil, tidak mengirim apa-apa
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) return;

    const last = Number(localStorage.getItem("comment-last") || 0);
    if (Date.now() - last < COOLDOWN_MS) return setStatus("wait");

    setStatus("sending");
    const { error } = await supabase
      .from("comments")
      .insert({ name: n, message: m });
    if (error) {
      console.error(error);
      return setStatus("error");
    }
    localStorage.setItem("comment-last", String(Date.now()));
    setName("");
    setMessage("");
    setStatus("sent");
  };

  const inputCls =
    "w-full rounded-2xl border border-line bg-bg/60 px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent";

  return (
    <div className="flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur sm:p-8">
      <h3 className="font-display text-2xl font-extrabold text-ink">
        {t("contact.comments")} <span className="text-hi">({list.length})</span>
      </h3>

      {!supabase ? (
        <p className="mt-5 rounded-2xl border border-dashed border-line p-5 text-sm text-muted">
          {t("contact.commentsOff")}
        </p>
      ) : (
        <>
          <form onSubmit={submit} className="mt-5 grid gap-3">
            <input
              className={inputCls}
              placeholder={t("contact.yourName")}
              value={name}
              maxLength={MAX_NAME}
              onChange={(e) => setName(e.target.value)}
              required
              aria-label={t("contact.yourName")}
            />
            <textarea
              className={`${inputCls} min-h-24 resize-y`}
              placeholder={t("contact.yourComment")}
              value={message}
              maxLength={MAX_MSG}
              onChange={(e) => setMessage(e.target.value)}
              required
              aria-label={t("contact.yourComment")}
            />
            {/* Honeypot: disembunyikan dari manusia */}
            <input
              tabIndex={-1}
              autoComplete="off"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
              name="hp_extra"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[11px] text-muted">
                {message.length}/{MAX_MSG}
              </span>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold tracking-[0.14em] text-accent-ink uppercase transition hover:brightness-110 disabled:opacity-60"
              >
                {status === "sending"
                  ? t("contact.sending")
                  : t("contact.sendComment")}{" "}
                <FiSend />
              </button>
            </div>
            {status === "sent" && (
              <p role="status" className="text-sm text-hi">
                {t("contact.commentSent")}
              </p>
            )}
            {status === "wait" && (
              <p role="status" className="text-sm text-hi">
                {t("contact.wait")}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm text-rose-400">
                {t("contact.error")}
              </p>
            )}
          </form>

          <div
            className="thin-scroll mt-6 max-h-[360px] flex-1 overflow-y-auto pr-2"
            aria-live="polite"
          >
            {loading ? (
              <p className="text-sm text-muted">…</p>
            ) : list.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line p-5 text-sm text-muted">
                {t("contact.noComments")}
              </p>
            ) : (
              <ul className="grid gap-4">
                {list.map((c) => (
                  <li key={c.id} className="flex gap-3">
                    <Avatar name={c.name} />
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-baseline gap-x-2">
                        <span className="font-semibold text-ink">{c.name}</span>
                        <span className="font-mono text-[11px] text-muted">
                          {timeAgo(c.created_at, lang)}
                        </span>
                      </p>
                      {/* Ditampilkan sebagai TEKS biasa, bukan HTML: aman dari script berbahaya */}
                      <p className="mt-1 break-words whitespace-pre-wrap text-ink/85">
                        {c.message}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
