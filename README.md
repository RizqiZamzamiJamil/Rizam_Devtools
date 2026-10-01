# DevTools

Developer Toolbox untuk `devtools.rizam.fun`.

## Stack

- Next.js Pages Router + TypeScript
- Material UI dengan Emotion dan integrasi SSR resmi
- Tailwind CSS v4 untuk susunan workspace; tema dan komponen MUI tetap memakai `sx`
- Static export
- Client-side only, tanpa backend
- Data workspace tersimpan di `localStorage`

## Tools

- JSON Formatter & Validator
- JWT Decoder
- Base64 Encoder/Decoder
- UUID Generator
- Unix Timestamp Converter
- URL Parser
- Hash Generator
- Case Converter

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output production ada di folder `out/`.

## Struktur

```text
src/
  assets/       Logo asli putih dan hitam, stylesheet global Tailwind
  components/   Editor, panel, tombol salin, dan daftar detail
  layouts/      Navigasi dan susunan halaman
  pages/        Satu halaman per alat, termasuk rumusnya
  utils/        Tema, daftar navigasi, dan penyimpanan browser
```

Rumus konversi berada langsung di `json.tsx`, `jwt.tsx`, `base64.tsx`,
`uuid.tsx`, `timestamp.tsx`, `url.tsx`, `hash.tsx`, dan `case.tsx`.
`_app.tsx` dan `_document.tsx` menangani integrasi Next.js dan Material UI.
Halaman `tools/[tool].tsx` mempertahankan tautan lama `/tools/<alat>/`.
URL baru mengikuti nama halaman, misalnya `/json/` dan `/jwt/`.

Tema terpusat di `src/utils/theme.ts`: arang, putih, dan aksen oranye logo.
Poppins dimuat melalui `next/font`. Penyimpanan memakai kunci versi sebelumnya
agar input lama tetap terbaca. Semua alat bekerja di browser tanpa API.

Workspace mengikuti tinggi layar (`100dvh`), tanpa scroll dokumen. Input panjang
bergulir di textarea; daftar hasil panjang bergulir di kolom hasil. Di bawah
768 px, tab Input/Hasil menampilkan satu panel setiap saat. Editor Hash memakai
tinggi ringkas; JSON dan Base64 dibatasi maksimal 320 px, dan dapat menyusut
ketika ruang panel berkurang.

Modul alat dimuat lebih awal pada produksi, termasuk alat di menu mobile.
Mode pengembangan Next tetap dapat mengompilasi halaman saat pertama dibuka.
Konfigurasi menjaga sepuluh halaman dalam buffer dev. `transpilePackages`
menyamakan konteks Emotion pada SSR dan browser agar layer MUI tidak hilang.
Validator tipe dev yang duplikat dikecualikan; validator produksi dan seluruh
source TypeScript tetap diperiksa.

## Verifikasi

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `out`
- Direct routes diekspor sebagai HTML statis dengan trailing slash.
- Tidak memerlukan fungsi server atau secret.
- Push dan deployment dilakukan manual oleh pemilik proyek.
