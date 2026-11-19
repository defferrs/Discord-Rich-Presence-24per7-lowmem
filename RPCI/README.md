# RPCI — Discord Rich Presence 24/7

Proyek ini menjalankan **Rich Presence Discord** dengan konfigurasi yang dapat diubah melalui `config.yml` dan kredensial melalui `.env`.

> ⚠️ **Catatan penting tentang akun:** proyek ini menggunakan `discord.js-selfbot-v13` untuk mengendalikan akun pengguna. Discord menyatakan bahwa otomatisasi akun pengguna biasa (self-bot) dilarang dan dapat menyebabkan akun ditangguhkan atau ditutup. Gunakan hanya jika kamu memahami risikonya dan jangan gunakan untuk spam, raid, atau tindakan otomatis lain yang merugikan.

## Fitur

- Rich Presence yang dapat dikustomisasi.
- Nama, detail, state, timestamp, tombol, dan status kustom.
- `largeImageKey` dan `smallImageKey` dapat menggunakan URL HTTPS gambar.
- Dapat dijalankan pada Windows, Linux, dan Android melalui lingkungan Node.js yang sesuai.
- Versi **low-memory** membawa dependency runtime di dalam arsip sehingga hosting yang otomatis menjalankan `npm install` dapat melewati proses instalasi tersebut.
- Tidak memerlukan folder `rpc_image` atau server gambar lokal.

## Struktur utama

```text
RPCI/
├── .env
├── .gitignore
├── README.md
├── STARTUP.txt
├── config.yml
├── index.js
├── examples/
└── node_modules/
```

## 1. Persiapan di Windows

### A. Instal Node.js

1. Instal Node.js versi **20 atau 22 LTS** untuk kompatibilitas yang lebih baik.
2. Buka PowerShell atau Command Prompt.
3. Periksa instalasi:

```bash
node -v
```

Jika muncul versi Node.js, berarti instalasi berhasil.

### B. Ekstrak RPCI

Ekstrak `RPCI-lowmem.zip` ke folder yang mudah ditemukan, misalnya:

```text
C:\RPCI
```

Buka PowerShell pada folder tersebut:

```powershell
cd C:\RPCI
```

### C. Isi `.env`

Buka file `.env` dan gunakan format:

```env
TOKEN="Isi Token Akun Disini"
```

**PENTING:** jangan pernah memasukkan token ke GitHub, screenshot, chat, atau membagikannya kepada orang lain.

Discord tidak menyediakan metode resmi untuk memperoleh **user token**. Saya tidak memberikan langkah untuk mengekstrak token pribadi dari aplikasi/browser. Jika kamu membutuhkan otomatisasi yang didukung Discord, gunakan akun bot dan Bot API resmi sebagai gantinya.

### D. Atur `config.yml`

Contoh konfigurasi:

```yaml
application_id: "ISI_ID_APLIKASI_DISCORD"
type: 0
name: "Isi nama aktivitas"
details: "Isi detail aktivitas"
state: "Isi status aktivitas"

largeImageKey: "https://contoh.com/gambar-besar.png"
largeImageText: "Isi teks gambar besar"
smallImageKey: "https://contoh.com/gambar-kecil.png"
smallImageText: "Isi teks gambar kecil"

url: "https://contoh.com"

buttons:
  - name: "Isi nama tombol"
    url: "https://contoh.com"
  # Atau biarkan buttons kosong jika tidak ingin ada tombol.

custom_status: "Isi status kustom"
custom_emoji: "🙂"
```

**Catatan gambar:** URL harus berupa URL HTTPS yang benar-benar dapat diakses dan mengarah ke gambar. URL halaman Discord, OAuth, atau halaman HTML bukan URL gambar.

### E. Jalankan

```bash
node index.js
```

Jika konfigurasi benar, konsol akan menampilkan pesan bahwa client siap dan Rich Presence telah diaktifkan.

---

# 2. Menjalankan di Android

Android tidak menjalankan file `.js` secara langsung seperti Windows. Kamu memerlukan lingkungan terminal yang menyediakan Node.js.

## Opsi A — Termux

1. Instal Termux dari sumber yang tepercaya.
2. Buka Termux.
3. Pastikan Node.js tersedia:

```bash
node -v
```

4. Pindahkan folder RPCI ke penyimpanan yang dapat diakses Termux.
5. Masuk ke folder proyek, misalnya:

```bash
cd ~/RPCI
```

6. Pastikan `.env` dan `config.yml` sudah diisi.
7. Jalankan:

```bash
node index.js
```

Android dapat menghentikan proses latar belakang untuk menghemat baterai. Untuk menjalankan proses 24/7, perangkat harus tetap menyala dan sistem Android harus mengizinkan proses tersebut tetap aktif. Kestabilannya juga bergantung pada versi Android dan pengaturan penghemat baterai.

## Opsi B — Hosting

Untuk 24/7, server hosting biasanya lebih praktis daripada membiarkan Android menyala terus-menerus.

---

# 3. Menjalankan di Bot-Hosting.net

urlBot-Hosting.nethttps://bot-hosting.net/ dapat digunakan untuk aplikasi Node.js. Paket gratis memiliki keterbatasan uptime dan perlu diperpanjang secara manual secara berkala. citeturn209865search17

Langkah umum:

1. Buat akun di Bot-Hosting.net.
2. Buat server Node.js.
3. Upload seluruh isi `RPCI-lowmem.zip` setelah diekstrak.
4. Pastikan `index.js` berada di direktori utama server.
5. Atur file `.env` dan `config.yml` melalui File Manager.
6. Atur startup file menjadi:

```text
index.js
```

7. Jalankan server.

### Mengapa versi low-memory?

Hosting yang kamu gunakan sebelumnya menjalankan `npm install` setiap startup. Pada batas RAM yang kecil, proses instalasi dependency dapat terkena `Exit code 137 / Out of memory`. Versi low-memory membawa dependency runtime di dalam arsip dan tidak memiliki `package.json` root, sehingga startup sederhana yang menggunakan pola `if [ -f package.json ]; then npm install ...; fi` dapat melewati `npm install`.

---

# 4. Alternatif hosting

## Koyeb

urlKoyebhttps://www.koyeb.com/ menyediakan satu Free Instance dengan 512 MB RAM, 0,1 vCPU, dan 2 GB SSD. Free Instance memiliki keterbatasan dan dapat scale-to-zero setelah tidak menerima traffic selama periode tertentu. Selain itu, layanan gratis tersebut bukan Worker Service. citeturn209865search13turn209865search16

Untuk proyek yang hanya membutuhkan proses background 24/7, keterbatasan tersebut perlu diperhatikan terlebih dahulu.

## Render

urlRenderhttps://render.com/ memiliki layanan gratis untuk beberapa jenis Web Service, tetapi free Web Service dapat berhenti sementara (spin down) ketika tidak aktif. Render juga menjelaskan bahwa free instance ditujukan untuk pengujian, hobi, dan preview, bukan production. citeturn209865search2turn209865search15

Karena RPCI bukan aplikasi web biasa, Render mungkin tidak cocok untuk kebutuhan Rich Presence 24/7 tanpa penyesuaian tambahan.

## Rekomendasi

Untuk struktur proyek RPCI saat ini, **hosting yang menyediakan proses Node.js yang benar-benar berjalan terus-menerus** lebih sesuai daripada platform web gratis yang melakukan sleep/scale-to-zero.

---

# 5. Konfigurasi `config.yml`

Berikut arti bagian utama:

| Konfigurasi | Fungsi |
|---|---|
| `application_id` | ID aplikasi Discord yang digunakan Rich Presence |
| `type` | Jenis aktivitas |
| `name` | Nama aktivitas |
| `details` | Detail aktivitas |
| `state` | Status aktivitas |
| `largeImageKey` | URL gambar utama |
| `largeImageText` | Tooltip gambar utama |
| `smallImageKey` | URL gambar kecil |
| `smallImageText` | Tooltip gambar kecil |
| `url` | URL yang digunakan activity |
| `buttons` | Tombol yang ditampilkan pada activity |
| `custom_status` | Status kustom |
| `custom_emoji` | Emoji status kustom |

Jika tidak ingin menggunakan tombol, gunakan:

```yaml
buttons: []
```

Atau hapus bagian tombol dari konfigurasi.

---

# 6. Contoh konfigurasi gambar

### Menggunakan URL gambar Discord CDN

```yaml
largeImageKey: "https://cdn.discordapp.com/attachments/ID_CHANNEL/ID_FILE/gambar.png?...")
smallImageKey: "https://cdn.discordapp.com/attachments/ID_CHANNEL/ID_FILE/icon.png?...")
```

### Menggunakan URL HTTPS biasa

```yaml
largeImageKey: "https://example.com/gambar-besar.png"
smallImageKey: "https://example.com/gambar-kecil.png"
```

Jika gambar tidak muncul, periksa bahwa URL tersebut dapat dibuka tanpa login dan benar-benar mengembalikan file gambar.

---

# 7. Menjalankan dengan GitHub

Repository proyek:

urlDiscord-Rich-Presence-24-7-lowmemhttps://github.com/defferrs/Discord-Rich-Presence-24-7-lowmem.git

### Penting sebelum upload

Jangan pernah meng-upload token asli ke GitHub.

Pastikan `.env` masuk ke `.gitignore`. File `.env` pada distribusi ini hanya berisi placeholder:

```env
TOKEN="Isi Token Akun Disini"
```

Jika token pernah terlanjur dipublikasikan, anggap token tersebut sudah bocor dan segera lakukan tindakan pengamanan yang sesuai pada akun.

---

# 8. Troubleshooting

## `Exit code: 137` / `Out of memory`

Artinya proses dibunuh karena melewati batas RAM hosting.

Periksa apakah hosting menjalankan `npm install` setiap startup. Gunakan versi low-memory ini dan startup:

```text
index.js
```

Jangan menjalankan `npm install` berulang kali pada startup jika dependency sudah dibundel.

## `ApplicationFlags is not a constructor`

Pastikan kamu menggunakan arsip RPCI versi terbaru dan tidak mengganti isi `node_modules` secara manual. Versi ini sudah membawa dependency yang telah disiapkan untuk kompatibilitas yang diperlukan.

## `Invalid or missing token`

Periksa `.env`:

```env
TOKEN="Isi Token Akun Disini"
```

Ganti placeholder tersebut hanya dengan kredensial yang memang kamu berwenang gunakan. Jangan pernah mengirim token ke orang lain.

## Gambar tidak muncul

Periksa:

1. URL menggunakan `https://`.
2. URL mengarah langsung ke gambar.
3. Gambar dapat diakses tanpa autentikasi.
4. `largeImageKey`/`smallImageKey` tidak berisi URL halaman biasa.
5. `application_id` benar.

## Bot berhenti sendiri

Periksa log hosting. Jika terdapat `Out of memory`, gunakan konfigurasi hosting dengan RAM lebih besar atau platform yang tidak menjalankan instalasi dependency setiap startup.

---

# 9. Kontak

Pemilik / pengembang:

- Discord: **deffano_hansen** — urlDiscordhttps://discord.gg/bWzVqqzj
- Email: **deffanh39@gmail.com**
- Instagram: **@deha_nsen**

---

# Lisensi

Lihat file `LICENSE` untuk informasi lisensi proyek.

## Penafian

Proyek ini bukan produk resmi Discord. Discord melarang otomatisasi akun pengguna biasa (self-bot) dan menyatakan bahwa penggunaan user token dalam aplikasi dapat menyebabkan penangguhan atau penghentian akun. citeturn209865search0turn209865search3
