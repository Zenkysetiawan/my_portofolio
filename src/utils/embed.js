// Mengubah link video biasa menjadi link "embed" (versi yang bisa dipasang di website)
export function getEmbedUrl(platform, url) {
  if (platform === "tiktok") {
    const match = url.match(/video\/(\d+)/);
    return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
  }

  if (platform === "instagram") {
    const clean = url.split("?")[0].replace(/\/?$/, "/");
    return `${clean}embed`;
  }

  return null;
}
