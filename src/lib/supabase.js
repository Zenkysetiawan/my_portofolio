import { createClient } from '@supabase/supabase-js'

// Kunci diambil dari file .env.local (lihat panduan). Kalau belum diisi,
// supabase = null dan fitur komentar/pesan menampilkan "belum aktif"
// tanpa merusak bagian website lainnya.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
