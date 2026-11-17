import * as THREE from "three";

const CARD_W = 1024;
const CARD_H = 1474;
const FONT = "Inter, system-ui, Arial, sans-serif";

function makeCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return { canvas, ctx: canvas.getContext("2d") };
}

function makeTexture(canvas) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

// Latar kartu: gradasi biru tua + dua cahaya (biru dan ungu)
function paintBackground(ctx) {
  const bg = ctx.createLinearGradient(0, 0, CARD_W, CARD_H);
  bg.addColorStop(0, "#0a1026");
  bg.addColorStop(0.55, "#0f1b4d");
  bg.addColorStop(1, "#241a63");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const glowBlue = ctx.createRadialGradient(860, 200, 0, 860, 200, 520);
  glowBlue.addColorStop(0, "rgba(59, 130, 246, 0.45)");
  glowBlue.addColorStop(1, "rgba(59, 130, 246, 0)");
  ctx.fillStyle = glowBlue;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const glowPurple = ctx.createRadialGradient(140, 1300, 0, 140, 1300, 560);
  glowPurple.addColorStop(0, "rgba(168, 85, 247, 0.4)");
  glowPurple.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = glowPurple;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
}

// Sisi depan: logo, foto, nama, role
function paintFront(ctx, photo) {
  paintBackground(ctx);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 76px ${FONT}`;
  ctx.fillText("Zen", 64, 130);
  const zenWidth = ctx.measureText("Zen").width;
  ctx.fillStyle = "#3b82f6";
  ctx.fillText(".", 64 + zenWidth, 130);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
  ctx.font = `600 34px ${FONT}`;
  ctx.fillText(`PORTFOLIO ${new Date().getFullYear()}`, CARD_W - 64, 124);

  // Foto (dipotong rapi, seperti object-fit: cover)
  const x = 64;
  const y = 190;
  const w = CARD_W - 128;
  const h = 880;
  const r = 56;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();
  if (photo) {
    const scale = Math.max(w / photo.width, h / photo.height);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (photo.width - sw) / 2;
    const sy = (photo.height - sh) * 0.15;
    ctx.drawImage(photo, sx, sy, sw, sh, x, y, w, h);
  } else {
    ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();

  // Bingkai foto bergradasi
  const border = ctx.createLinearGradient(x, y, x + w, y + h);
  border.addColorStop(0, "#3b82f6");
  border.addColorStop(1, "#a855f7");
  ctx.lineWidth = 8;
  ctx.strokeStyle = border;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.stroke();

  // Nama dan role
  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 84px ${FONT}`;
  ctx.fillText("Zenky Setiawan", 64, 1190);

  ctx.fillStyle = "#a78bfa";
  ctx.font = `600 48px ${FONT}`;
  ctx.fillText("AI Software Engineer", 64, 1262);

  const line = ctx.createLinearGradient(64, 0, CARD_W - 64, 0);
  line.addColorStop(0, "#3b82f6");
  line.addColorStop(1, "rgba(168, 85, 247, 0)");
  ctx.fillStyle = line;
  ctx.fillRect(64, 1318, CARD_W - 128, 4);

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = `500 36px ${FONT}`;
  ctx.fillText("Informatics Student  ·  Bengkulu, ID", 64, 1394);
}

// Sisi belakang: logo besar, daftar role, status
function paintBack(ctx) {
  paintBackground(ctx);

  ctx.strokeStyle = "rgba(96, 165, 250, 0.18)";
  ctx.lineWidth = 3;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(CARD_W / 2, 540, i * 110, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  const title = ctx.createLinearGradient(300, 0, 724, 0);
  title.addColorStop(0, "#60a5fa");
  title.addColorStop(1, "#c084fc");
  ctx.fillStyle = title;
  ctx.font = `bold 230px ${FONT}`;
  ctx.fillText("Zen", CARD_W / 2, 620);

  ctx.fillStyle = "#ffffff";
  ctx.font = `600 56px ${FONT}`;
  ctx.fillText("Zenky Setiawan", CARD_W / 2, 740);

  const roles = [
    "AI Software Engineer",
    "Web Developer",
    "Tech Content Creator",
  ];
  ctx.font = `500 46px ${FONT}`;
  roles.forEach((role, i) => {
    ctx.fillStyle = i === 0 ? "#a78bfa" : "rgba(255, 255, 255, 0.8)";
    ctx.fillText(role, CARD_W / 2, 940 + i * 90);
  });

  const status = "Open for freelance & collaboration";
  ctx.font = `500 36px ${FONT}`;
  const statusWidth = ctx.measureText(status).width;
  const startX = (CARD_W - (statusWidth + 42)) / 2;
  ctx.fillStyle = "#22c55e";
  ctx.beginPath();
  ctx.arc(startX + 14, 1356, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.textAlign = "left";
  ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
  ctx.fillText(status, startX + 42, 1368);
}

// Membuat tekstur depan dan belakang kartu
export function createCardTextures(photoUrl) {
  const front = makeCanvas(CARD_W, CARD_H);
  const back = makeCanvas(CARD_W, CARD_H);

  paintFront(front.ctx, null);
  paintBack(back.ctx);

  const frontTexture = makeTexture(front.canvas);
  const backTexture = makeTexture(back.canvas);

  // Foto dimuat belakangan, lalu sisi depan digambar ulang
  const photo = new Image();
  photo.onload = () => {
    paintFront(front.ctx, photo);
    frontTexture.needsUpdate = true;
  };
  photo.src = photoUrl;

  return { front: frontTexture, back: backTexture };
}

// Membuat tekstur tali (strap) yang berulang
export function createStrapTexture() {
  const { canvas, ctx } = makeCanvas(256, 128);

  const bg = ctx.createLinearGradient(0, 0, 256, 0);
  bg.addColorStop(0, "#2563eb");
  bg.addColorStop(1, "#7c3aed");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 128);

  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.fillRect(0, 10, 256, 4);
  ctx.fillRect(0, 114, 256, 4);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 56px ${FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ZEN •", 128, 66);

  const texture = makeTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
