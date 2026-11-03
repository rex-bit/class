# Rolling Kelas · Rex-bit

Web rolling tempat duduk kelas: masukkan nama, putar roda, dan nama yang keluar otomatis mengisi meja.

![Demo](demo.gif)

## Fitur
- **Spin wheel**: pemenang otomatis mengisi meja berikutnya.
- **Mode cowok / cewek bergantian**
  - Kiri dan kanan (2 meja per baris): 2 cowok, lalu 2 cewek, dan seterusnya.
  - Tengah (3 meja per baris): 3 cowok, lalu 3 cewek, dan seterusnya.
- **Shuffle semua** untuk mengacak seluruh meja sekaligus.
- Denah 35 meja: kiri 10, tengah 15, kanan 10.
- Data tersimpan di browser (localStorage).

## Tampilan
- Gaya **Material You** (Material 3) bernuansa hijau: warna tonal, sudut membulat, otomatis mode terang/gelap.
- **Liquid tab bar**: indikator tab bergerak seperti cairan. Pill indikator melar ke arah tujuan (sisi depan bergerak duluan, sisi belakang menyusul) lalu menyusut lagi, murni CSS tanpa filter SVG sehingga stabil di Safari iPhone. Tab: Nama, Spin, Denah.

## Jalankan
Buka `index.html` di browser. Tidak perlu build.
