import * as THREE from 'three'

const CARD_W = 1024
const CARD_H = 1457

// Font yang sama dengan website (sudah dipasang lewat fontsource)
const DISPLAY = '"Bricolage Grotesque Variable", system-ui, sans-serif'
const MONO = '"JetBrains Mono Variable", ui-monospace, monospace'

// Warna kartu (sama dengan tema website)
const COBALT = '#3b5bff'
const COBALT_DEEP = '#2740e0'
const INK = '#0b1020'
const AMBER = '#ffb224'

function makeCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return { canvas, ctx: canvas.getContext('2d') }
}

function makeTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

// Teks dengan jarak antar-huruf (canvas tidak punya letter-spacing bawaan di semua browser)
function spacedText(ctx, text, x, y, spacing, align = 'left') {
  const widths = [...text].map((ch) => ctx.measureText(ch).width)
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (text.length - 1)
  let cx = align === 'right' ? x - total : align === 'center' ? x - total / 2 : x
  ctx.textAlign = 'left'
  ;[...text].forEach((ch, i) => {
    ctx.fillText(ch, cx, y)
    cx += widths[i] + spacing
  })
}

// Pola titik halus di latar kartu
function paintDots(ctx, color) {
  ctx.fillStyle = color
  for (let y = 40; y < CARD_H; y += 44) {
    for (let x = 40; x < CARD_W; x += 44) {
      ctx.beginPath()
      ctx.arc(x, y, 2.2, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

// Sisi depan: kobalt solid, foto, nama, role
function paintFront(ctx, photo) {
  ctx.fillStyle = COBALT
  ctx.fillRect(0, 0, CARD_W, CARD_H)
  paintDots(ctx, 'rgba(255,255,255,0.10)')

  // Header
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 84px ${DISPLAY}`
  ctx.textAlign = 'left'
  ctx.fillText('Zen', 64, 138)
  const zenWidth = ctx.measureText('Zen').width
  ctx.fillStyle = AMBER
  ctx.fillText('.', 64 + zenWidth, 138)

  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = `600 28px ${MONO}`
  spacedText(ctx, `PORTFOLIO ${new Date().getFullYear()}`, CARD_W - 64, 130, 4, 'right')

  // Foto (dipotong rapi seperti object-fit: cover)
  const x = 64
  const y = 190
  const w = CARD_W - 128
  const h = 860
  const r = 40

  ctx.save()
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.clip()
  ctx.fillStyle = COBALT_DEEP
  ctx.fillRect(x, y, w, h)
  if (photo) {
    const scale = Math.max(w / photo.width, h / photo.height)
    const sw = w / scale
    const sh = h / scale
    const sx = (photo.width - sw) / 2
    const sy = (photo.height - sh) * 0.15
    ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h)
  }
  ctx.restore()

  // Bingkai foto: garis tipis putih
  ctx.lineWidth = 5
  ctx.strokeStyle = 'rgba(255,255,255,0.9)'
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
  ctx.stroke()

  // Nama
  ctx.textAlign = 'left'
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 100px ${DISPLAY}`
  ctx.fillText('Zenky Setiawan', 64, 1170)

  // Role
  ctx.fillStyle = AMBER
  ctx.font = `700 38px ${MONO}`
  spacedText(ctx, 'AI SOFTWARE ENGINEER', 64, 1238, 3)

  // Garis pemisah
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.fillRect(64, 1290, CARD_W - 128, 3)

  // Footer: info kecil + "barcode"
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = `500 28px ${MONO}`
  spacedText(ctx, 'INFORMATICS STUDENT', 64, 1360, 2)
  spacedText(ctx, 'BENGKULU, ID', 64, 1406, 2)

  const bars = [6, 3, 9, 3, 5, 9, 3, 6, 3, 9, 5, 3, 7, 3, 9, 5]
  let bx = CARD_W - 64
  ctx.fillStyle = AMBER
  for (let i = bars.length - 1; i >= 0; i--) {
    bx -= bars[i]
    ctx.fillRect(bx, 1346, bars[i], 74)
    bx -= 7
  }
}

// Sisi belakang: gelap, huruf Z besar, daftar role, status
function paintBack(ctx) {
  ctx.fillStyle = INK
  ctx.fillRect(0, 0, CARD_W, CARD_H)
  paintDots(ctx, 'rgba(255,255,255,0.07)')

  // Lingkaran kobalt
  ctx.fillStyle = COBALT
  ctx.beginPath()
  ctx.arc(CARD_W / 2, 520, 300, 0, Math.PI * 2)
  ctx.fill()

  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = '#ffffff'
  ctx.font = `800 400px ${DISPLAY}`
  ctx.fillText('Z', CARD_W / 2 - 14, 668)
  ctx.fillStyle = AMBER
  ctx.beginPath()
  ctx.arc(CARD_W / 2 + 150, 650, 24, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.font = `800 64px ${DISPLAY}`
  ctx.fillText('Zenky Setiawan', CARD_W / 2, 930)

  const roles = ['AI SOFTWARE ENGINEER', 'WEB DEVELOPER', 'TECH CONTENT CREATOR']
  ctx.font = `600 34px ${MONO}`
  roles.forEach((role, i) => {
    ctx.fillStyle = i === 0 ? AMBER : 'rgba(255,255,255,0.78)'
    spacedText(ctx, role, CARD_W / 2, 1010 + i * 62, 3, 'center')
  })

  // Status
  ctx.fillStyle = 'rgba(255,255,255,0.18)'
  ctx.fillRect(64, 1250, CARD_W - 128, 3)
  const status = 'OPEN FOR FREELANCE'
  ctx.font = `600 30px ${MONO}`
  const statusWidth = [...status].reduce((a, c) => a + ctx.measureText(c).width + 3, 0)
  const startX = (CARD_W - (statusWidth + 44)) / 2
  ctx.fillStyle = AMBER
  ctx.beginPath()
  ctx.arc(startX + 12, 1330, 12, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  spacedText(ctx, status, startX + 44, 1341, 3)
}

// >>> Desain kartu buatan sendiri <<<
// Taruh dua gambar di folder public/images/card/ dengan nama ini.
// Kalau gambarnya tidak ada, otomatis dipakai desain bawaan (digambar lewat kode di atas).
const FRONT_URL = '/images/card/front.jpg'
const BACK_URL = '/images/card/back.jpg'

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null) // gagal/tidak ada -> null, bukan error
    img.src = url
  })
}

// Gambar diisi penuh ke kartu (seperti object-fit: cover), kelebihan di tepi dipotong rata
function drawCover(ctx, img) {
  const scale = Math.max(CARD_W / img.width, CARD_H / img.height)
  const w = img.width * scale
  const h = img.height * scale
  ctx.drawImage(img, (CARD_W - w) / 2, (CARD_H - h) / 2, w, h)
}

// Membuat tekstur depan dan belakang kartu
export function createCardTextures(photoUrl) {
  const front = makeCanvas(CARD_W, CARD_H)
  const back = makeCanvas(CARD_W, CARD_H)
  const frontTexture = makeTexture(front.canvas)
  const backTexture = makeTexture(back.canvas)

  // Sementara gambar dimuat, kartu berupa warna polos (tidak ada kedipan desain lain)
  front.ctx.fillStyle = COBALT
  front.ctx.fillRect(0, 0, CARD_W, CARD_H)
  back.ctx.fillStyle = INK
  back.ctx.fillRect(0, 0, CARD_W, CARD_H)

  Promise.all([loadImage(FRONT_URL), loadImage(BACK_URL)]).then(async ([f, b]) => {
    // Desain bawaan butuh font dan foto, jadi disiapkan hanya kalau diperlukan
    if (!f || !b) {
      await Promise.all([
        document.fonts.load(`800 80px ${DISPLAY}`),
        document.fonts.load(`600 30px ${MONO}`),
      ]).catch(() => {})
    }

    if (f) drawCover(front.ctx, f)
    else paintFront(front.ctx, await loadImage(photoUrl))

    if (b) drawCover(back.ctx, b)
    else paintBack(back.ctx)

    frontTexture.needsUpdate = true
    backTexture.needsUpdate = true
  })

  return { front: frontTexture, back: backTexture }
}

// >>> Desain tali buatan sendiri (opsional) <<<
// Taruh di public/images/card/strap.png. Kalau tidak ada, dipakai desain bawaan.
// Gambar ini diulang 3 kali di sepanjang tali, jadi sisi kiri dan kanannya harus nyambung.
const STRAP_URL = '/images/card/strap.png'
const STRAP_W = 1680
const STRAP_H = 330
// Berapa kali gambar tali diulang sepanjang tali (dipakai Lanyard.jsx)
export const STRAP_REPEAT = 2.4

// Desain tali bawaan: kobalt solid dengan tulisan amber
function paintStrap(ctx) {
  ctx.fillStyle = COBALT
  ctx.fillRect(0, 0, STRAP_W, STRAP_H)
  ctx.fillStyle = 'rgba(255,255,255,0.45)'
  ctx.fillRect(0, 26, STRAP_W, 10)
  ctx.fillRect(0, STRAP_H - 36, STRAP_W, 10)
  ctx.fillStyle = AMBER
  ctx.font = `800 150px ${DISPLAY}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ZEN •', STRAP_W / 2, STRAP_H / 2 + 6)
}

export function createStrapTexture() {
  const { canvas, ctx } = makeCanvas(STRAP_W, STRAP_H)
  ctx.fillStyle = COBALT
  ctx.fillRect(0, 0, STRAP_W, STRAP_H)

  const texture = makeTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  loadImage(STRAP_URL).then(async (img) => {
    if (img) {
      ctx.drawImage(img, 0, 0, STRAP_W, STRAP_H)
    } else {
      await document.fonts.load(`800 54px ${DISPLAY}`).catch(() => {})
      paintStrap(ctx)
    }
    texture.needsUpdate = true
  })

  return texture
}
