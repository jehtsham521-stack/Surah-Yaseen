import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="60%" stop-color="#047857" />
      <stop offset="100%" stop-color="#064e3b" />
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="35%" stop-color="#f59e0b" />
      <stop offset="70%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
    <linearGradient id="goldLight" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#fef3c7" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#022c22" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Full Background (Covers entire canvas for maskable & standard) -->
  <rect width="512" height="512" fill="url(#bgGlow)" />

  <!-- Outer Islamic Ornamental Border (Safe zone ~400px diameter) -->
  <g transform="translate(256, 256)" filter="url(#shadow)">
    <!-- Outer Octagonal Star Ring -->
    <rect x="-175" y="-175" width="350" height="350" rx="36" fill="none" stroke="url(#gold)" stroke-width="4" opacity="0.85" />
    <rect x="-175" y="-175" width="350" height="350" rx="36" fill="none" stroke="url(#gold)" stroke-width="4" transform="rotate(45)" opacity="0.85" />
    
    <!-- Inner Circular Medallion -->
    <circle r="155" fill="#04563e" stroke="url(#gold)" stroke-width="5" />
    <circle r="147" fill="none" stroke="url(#gold)" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.75" />
    
    <!-- Central Islamic Calligraphy: يس -->
    <!-- Stylized Arabic Letter Ya & Seen Calligraphy Paths -->
    <!-- Calligraphic Crown / Accent -->
    <path d="M-40,-100 Q0,-120 40,-100 Q0,-108 -40,-100 Z" fill="url(#gold)" />
    
    <!-- Calligraphic "يس" Shape -->
    <!-- Ya swoop and Seen teeth -->
    <path d="M-60,-55 C-60,-55 -40,-75 0,-75 C45,-75 65,-45 65,-15 C65,25 35,50 -25,50 C-75,50 -95,20 -95,-10 C-95,-25 -80,-35 -65,-35 C-50,-35 -40,-25 -40,-10 C-40,15 -10,25 15,25 C40,25 45,5 45,-15 C45,-35 30,-52 0,-52 C-30,-52 -45,-38 -60,-55 Z" fill="url(#goldLight)" />
    
    <!-- Bold Calligraphic Main Arabic Letters -->
    <text x="0" y="45" font-family="'Amiri', 'Traditional Arabic', serif" font-size="160" font-weight="bold" fill="url(#goldLight)" text-anchor="middle" direction="rtl">يس</text>
    
    <!-- Quranic Title below -->
    <text x="0" y="112" font-family="'Amiri', sans-serif" font-size="28" font-weight="bold" fill="#fef08a" text-anchor="middle" letter-spacing="2">سُورَةُ يسٓ</text>
  </g>
</svg>
`;

async function generate() {
  const publicDir = path.resolve('public');
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent);

  // Generate 512x512
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512.png'));

  // Generate 192x192
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192.png'));

  // Generate Maskable 512
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512.png'));

  // Apple touch icon
  await sharp(Buffer.from(svgContent))
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('PWA Icons generated successfully!');
}

generate();
