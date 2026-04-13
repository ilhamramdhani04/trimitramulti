# ACF Field Mapping - Trimitra Frontend

Dokumen ini menjelaskan mapping field ACF ke komponen frontend yang sudah aktif dipakai.

## 1) Cara Baca Data di Frontend

- Frontend menggabungkan data dari `meta` dan `acf`:
  - `uiFields = { ...(wpPage.meta || {}), ...(wpPage.acf || {}) }`
- Pengambilan nilai field memakai helper:
  - `pickTextField(source, keys, fallback)`
  - `pickLinkField(source, keys, fallback)`
- Urutan `keys` penting:
  - Sistem akan ambil key pertama yang berisi nilai.

Referensi helper:
- `src/data/wpUiFields.js`

## 2) File ACF Importable

Gunakan salah satu file berikut di WordPress Admin > ACF > Tools > Import Field Groups:

- Versi standar:
  - `acf/trimitra-page-ui-fields-acf-import.json`
- Versi tabbed (lebih rapi untuk admin):
  - `acf/trimitra-page-ui-fields-acf-import-tabbed.json`

## 3) Mapping per Halaman

### A. Home (`/home` atau slug `home`/`beranda`)
Referensi kode: `src/pages/HomePage.jsx`

| UI Element | Field Key(s) | Fallback |
|---|---|---|
| Home kicker | `home_kicker`, `hero_kicker` | `Home` |
| Journal kicker | `journal_kicker` | `Eksplorasi` |
| Journal title | `journal_title` | `Jurnal Atelier` |
| Journal button label | `journal_button_label` | `Lihat Semua` |
| Portfolio kicker | `portfolio_kicker` | `Portofolio` |
| Portfolio title | `portfolio_title` | `Proyek Unggulan` |
| CTA title | `cta_title`, `home_cta_title` | `Siap Wujudkan Aktivasi Brand yang Lebih Berdampak?` |
| CTA copy | `cta_copy`, `home_cta_copy` | `Konsultasikan kebutuhan booth, event, dan media outdoor Anda bersama tim Trimitra untuk eksekusi yang lebih presisi.` |
| CTA primary label | `cta_primary_label` | `Konsultasi Sekarang` |
| CTA primary link | `cta_primary_link` | `/kontak-kami` |
| CTA secondary label | `cta_secondary_label` | `Lihat Portofolio` |
| CTA secondary link | `cta_secondary_link` | `/layanan` |

### B. Tentang Kami (`/tentang-kami`)
Referensi kode: `src/pages/TentangKamiPage.jsx`

| UI Element | Field Key(s) | Fallback |
|---|---|---|
| Page kicker | `page_kicker`, `about_kicker` | `Tentang Kami` |
| CTA title | `cta_title`, `about_cta_title` | `Mulai Proyek Anda` |
| CTA copy | `cta_copy`, `about_cta_copy` | `Rasakan perpaduan antara arsitektur dan emosi.` |
| CTA primary label | `cta_primary_label` | `Pesan Konsultasi` |
| CTA primary link | `cta_primary_link` | `/kontak-kami` |
| CTA secondary label | `cta_secondary_label` | `Lihat Portofolio` |
| CTA secondary link | `cta_secondary_link` | `/galeri` |

### C. Produk & Jasa (`/layanan`)
Referensi kode: `src/pages/LayananPage.jsx`

| UI Element | Field Key(s) | Fallback |
|---|---|---|
| Page kicker | `page_kicker`, `services_kicker` | `Produk & Jasa` |
| Hero title | `hero_title`, `services_title` | `wpPage.title` atau `Solusi Produk & Jasa Trimitra` |
| Hero copy | `hero_copy`, `services_copy` | `Kami merancang, memproduksi, dan mengeksekusi pengalaman brand dari billboard, event, hingga booth pameran dengan standar premium.` |
| CTA title | `cta_title`, `services_cta_title` | `Siap Wujudkan Aktivasi Brand yang Lebih Berdampak?` |
| CTA copy | `cta_copy`, `services_cta_copy` | `Tim Trimitra siap membantu dari tahap konsep hingga eksekusi akhir dengan alur kerja yang cepat, terukur, dan presisi.` |
| CTA primary label | `cta_primary_label` | `Konsultasi Sekarang` |
| CTA primary link | `cta_primary_link` | `/kontak-kami` |
| CTA secondary label | `cta_secondary_label` | `Lihat Portofolio` |
| CTA secondary link | `cta_secondary_link` | `/galeri` |

### D. Kontak Kami (`/kontak-kami`)
Referensi kode: `src/pages/KontakKamiPage.jsx`

| UI Element | Field Key(s) | Fallback |
|---|---|---|
| Contact title | `contact_title` | `Mulai Konsultasi.` |
| Contact title highlight | `contact_title_highlight` | `Konsultasi.` |
| Contact subtitle | `contact_subtitle` | `Sampaikan kebutuhan booth pameran, event organizer, atau media outdoor Anda. Tim Trimitra siap membantu dari tahap perencanaan hingga eksekusi.` |
| Submit label | `contact_submit_label` | `Kirim Permintaan Konsultasi` |

## 4) Key Umum (Lintas Halaman)

Field berikut dipakai lintas halaman sebagai default CTA:

- `cta_title`
- `cta_copy`
- `cta_primary_label`
- `cta_primary_link`
- `cta_secondary_label`
- `cta_secondary_link`

Jika key global ini diisi, ia akan terbaca lebih dulu pada halaman yang urutan key-nya meletakkan key global di depan.

## 5) Rekomendasi Operasional

- Untuk konsistensi cepat: isi dulu key global CTA.
- Untuk penyesuaian per halaman: isi key alias per halaman (`home_cta_*`, `about_cta_*`, `services_cta_*`) sesuai kebutuhan.
- Simpan semua URL tombol sebagai path relatif (contoh: `/kontak-kami`, `/layanan`, `/galeri`).
- Setelah update field di WP, lakukan hard refresh browser untuk melihat perubahan terbaru jika ada cache.
