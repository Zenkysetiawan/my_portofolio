import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { useLanguage } from '../../context/LanguageContext'

const COOLDOWN_MS = 60_000

export default function ContactForm() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error | wait
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (trap) return
    const last = Number(localStorage.getItem('message-last') || 0)
    if (Date.now() - last < COOLDOWN_MS) return setStatus('wait')

    setStatus('sending')
    const { error } = await supabase.from('messages').insert({
      name: form.name.trim(),
      contact: form.contact.trim(),
      message: form.message.trim(),
    })
    if (error) return setStatus('error')
    localStorage.setItem('message-last', String(Date.now()))
    setForm({ name: '', contact: '', message: '' })
    setStatus('sent')
  }

  const inputCls =
    'w-full rounded-2xl border border-line bg-bg/60 px-4 py-3 text-ink outline-none transition placeholder:text-muted/70 focus:border-accent'

  return (
    <div className="flex h-full flex-col rounded-3xl border border-line bg-surface/70 p-6 backdrop-blur sm:p-8">
      <h3 className="font-display text-2xl font-extrabold text-ink">{t('contact.formTitle')}</h3>
      <p className="mt-2 text-muted">{t('contact.formText')}</p>

      {!supabase ? (
        <p className="mt-5 rounded-2xl border border-dashed border-line p-5 text-sm text-muted">{t('contact.formOff')}</p>
      ) : (
        <form onSubmit={submit} className="mt-5 grid gap-3">
          <input className={inputCls} placeholder={t('contact.yourName')} value={form.name} onChange={set('name')} maxLength={60} required aria-label={t('contact.yourName')} />
          <input className={inputCls} placeholder={t('contact.yourContact')} value={form.contact} onChange={set('contact')} maxLength={100} required aria-label={t('contact.yourContact')} />
          <textarea className={`${inputCls} min-h-32 resize-y`} placeholder={t('contact.yourMessage')} value={form.message} onChange={set('message')} maxLength={1500} required aria-label={t('contact.yourMessage')} />
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" name="company" />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold tracking-[0.14em] text-accent-ink uppercase transition hover:brightness-110 disabled:opacity-60 sm:self-start"
          >
            {status === 'sending' ? t('contact.sending') : t('contact.send')} <FiSend />
          </button>
          {status === 'sent' && <p role="status" className="text-sm text-hi">{t('contact.sent')}</p>}
          {status === 'wait' && <p role="status" className="text-sm text-hi">{t('contact.wait')}</p>}
          {status === 'error' && <p role="alert" className="text-sm text-rose-400">{t('contact.error')}</p>}
        </form>
      )}
    </div>
  )
}
