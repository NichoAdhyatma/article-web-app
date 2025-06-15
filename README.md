# 📝 Article Web App

A full-featured web application to manage articles with role-based access, built using **Next.js App Router**, **React Query**, **Zod**, and **Tailwind CSS**.

---

## ✅ Fitur Utama

- Login & Otentikasi berbasis Role (`Admin` dan `User`)
- Halaman khusus untuk `Admin` untuk:
  - Menambahkan artikel
  - Mengedit artikel
  - Menghapus artikel
- User biasa dapat melihat daftar artikel
- Validasi form dengan React Hook Form + Zod
- Komponen UI yang reusable (Dialog, Form, Button)
- Responsive dan dark mode siap pakai
- Penanganan state asinkron dengan React Query
- Struktur folder modular dan scalable

---

## 🛠️ Teknologi yang Digunakan

| Kategori       | Teknologi                |
|----------------|--------------------------|
| Frontend       | Next.js App Router       |
| State/Data     | React Query              |
| Form           | React Hook Form + Zod    |
| Komponen UI    | TailwindCSS, Radix UI    |
| Notifikasi     | React Hot Toast          |
| Routing        | Dynamic + query params   |
| Autentikasi    | `next/headers`, cookies  |

---

## ⚙️ Instalasi & Setup

1. Clone repository:
```bash
git clone https://github.com/NichoAdhyatma/article-web-app.git
cd article-web-app
````

2. Install dependencies:

```bash
npm install
# atau
yarn install
```

3. Tambahkan file `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

4. Jalankan project:

```bash
npm run dev
```

Akses via [http://localhost:3000](http://localhost:3000)

---

## 🧠 Arsitektur Folder

```
src/
├── app/                       # Halaman App Router
│   ├── admin/article/        # Halaman khusus Admin
│   ├── auth/login/           # Halaman login
│   └── layout.tsx            # Layout global
├── components/
│   ├── ui/                   # Komponen UI (Box, Button, Typography)
│   └── global/form/          # Input form reusable
├── lib/
│   ├── api/                  # API + React Query mutation
│   └── constants.ts          # Nama cookie dan konfigurasi
├── schemas/                  # Validasi Zod untuk form
├── context/                  # Context global (jika ada)
└── public/                   # Aset publik (logo, dll)
```

---

## 🔐 Otentikasi dan Routing

* Menggunakan `cookies()` dari `next/headers` untuk membaca token
* Pengguna akan otomatis redirect berdasarkan role:

  * `Admin` → `/admin/article`
  * `User` → `/article`
* Tidak ada akses tampilan pada `/`, hanya redirect logic

---

## 🧪 Testing

> Saat ini belum tersedia unit test atau e2e test. Kamu bisa menambahkan dengan:

* **Unit Test**: Jest + React Testing Library
* **E2E Test**: Playwright atau Cypress

---

## 🧩 Penggunaan

### 👤 Login

Buka `/auth/login`, login sesuai role:

* Admin dapat akses penuh
* User hanya bisa membaca

### 🛠 CRUD Artikel

Di halaman `/admin/article`, Admin dapat:

* Tambah Artikel: lewat dialog form
* Edit Artikel: dialog pre-filled berdasarkan query
* Hapus Artikel: (tambahkan jika belum tersedia)

---

## 📦 Deployment

Untuk deploy ke [Vercel](https://vercel.com):

* Pastikan `.env.local` disesuaikan di Environment Variables
* Push ke GitHub → Vercel akan auto-deploy

---

## 📬 Kontak

* 🧑‍💻 Author: **Nicholaus Adhyatma**
* 🌐 GitHub: [@NichoAdhyatma](https://github.com/NichoAdhyatma)

---

## 📄 Lisensi

MIT License. Lihat file `LICENSE`.
