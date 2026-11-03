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
- Gaya **Material You** (Material 3): warna tonal, sudut membulat, otomatis mode terang/gelap.
- **Liquid tab bar**: indikator tab bergerak seperti cairan. Dua blob dengan filter goo (SVG `feGaussianBlur` + `feColorMatrix`) bergerak dengan easing dan delay berbeda, sehingga menyatu dan meregang saat pindah tab. Tab: Nama, Spin, Denah.

## Jalankan
Buka `index.html` di browser. Tidak perlu build.
