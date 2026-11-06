/* Rolling Kelas changelog. EDIT THIS FILE to add a release; no build step needed.
   Newest first. Each text can be a plain string or {en:'...',id:'...'}.
   Groups: added / improved / fixed / removed (leave out any that are empty).
   NOTE: the project was built in a single stretch, so v1.0.0 to v1.5.0 were labelled retroactively from the commit history
   (dates are the real commit dates). From v1.6.0 on, versions are assigned when released. */
window.CHANGELOG=[
 {version:'v1.6.0',date:'2026-11-06',
  title:{en:'Information pages',id:'Halaman informasi'},
  added:[
   {en:'Terms of Service, About, Changelog, Roadmap and Report a Bug pages, with navigation between them.',id:'Halaman Ketentuan Layanan, Tentang, Changelog, Roadmap, dan Lapor Bug, lengkap dengan navigasi antarhalaman.'},
   {en:'Tag Names tool (tag-names.html): paste a name list and (L)/(P) is added after each name; correct guesses with a tap, then copy.',id:'Alat Tambah Penanda (tag-names.html): tempel daftar nama dan (L)/(P) ditambahkan di belakang tiap nama; koreksi tebakan dengan satu ketukan, lalu salin.'},
   {en:'Report a Bug sends reports to the developer through Formspree (third-party form service); the Privacy Policy now mentions it.',id:'Lapor Bug mengirim laporan ke pengembang lewat Formspree (layanan formulir pihak ketiga); Kebijakan Privasi kini menyebutkannya.'},
   {en:'Links to the new pages in the app footer; #faq and #privacy links open the FAQ and Privacy Policy directly.',id:'Tautan ke halaman baru di footer aplikasi; tautan #faq dan #privacy langsung membuka FAQ dan Kebijakan Privasi.'}
  ]},
 {version:'v1.5.0',date:'2026-11-05',
  title:{en:'Backup and installable app',id:'Cadangan dan aplikasi yang bisa dipasang'},
  added:[
   {en:'Save all data to a .json backup file and open it again on another device.',id:'Simpan seluruh data ke file cadangan .json dan buka lagi di perangkat lain.'},
   {en:'Installable web app (PWA) that also opens offline after the first visit.',id:'Aplikasi web yang bisa dipasang (PWA) dan bisa dibuka offline setelah kunjungan pertama.'}
  ]},
 {version:'v1.4.0',date:'2026-11-05',
  title:{en:'Settings, focus mode and polish',id:'Pengaturan, mode fokus, dan penyempurnaan'},
  added:[
   {en:'Settings dialog: spin sound, volume, spin time, winner sound, confetti, popup, wheel colors and gradient background.',id:'Dialog Pengaturan: suara putaran, volume, durasi putaran, suara pemenang, konfeti, popup, warna roda, dan latar gradien.'},
   {en:'Focus mode that shows only the wheel, with a button to bring everything back.',id:'Mode Fokus yang hanya menampilkan roda, dengan tombol untuk mengembalikan semuanya.'},
   {en:'Undo button (and Ctrl+Z) to take back the last placement.',id:'Tombol Urungkan (dan Ctrl+Z) untuk membatalkan penempatan terakhir.'},
   {en:'Tap two filled desks to swap their names.',id:'Ketuk dua meja yang terisi untuk menukar namanya.'},
   {en:'Gradient confetti and a real applause recording (CC0, credited in the repository).',id:'Konfeti gradien dan rekaman tepuk tangan asli (CC0, kreditnya ada di repositori).'}
  ],
  improved:[
   {en:'The wheel now starts spinning from its idle speed, so the start is smooth.',id:'Roda kini mulai berputar dari kecepatan idle, sehingga awal putaran halus.'},
   {en:'Mobile: settings, focus mode and FAQ are grouped in one menu; empty desks show SVG icons.',id:'Di HP: pengaturan, mode fokus, dan FAQ digabung dalam satu menu; meja kosong memakai ikon SVG.'},
   {en:'The top bar has a soft gradient fade underneath.',id:'Bar atas memiliki gradien lembut di bawahnya.'}
  ],
  fixed:[
   {en:'Text in the finish popup is centered.',id:'Teks pada popup selesai kini rata tengah.'}
  ]},
 {version:'v1.3.0',date:'2026-11-05',
  title:{en:'Privacy, FAQ and sharing',id:'Privasi, FAQ, dan berbagi'},
  added:[
   {en:'FAQ (including "Is my data private?"), a Privacy Policy and a button to delete all local data.',id:'FAQ (termasuk "Apakah data saya privat?"), Kebijakan Privasi, dan tombol hapus semua data lokal.'},
   {en:'Export the seating plan as text, image or print.',id:'Ekspor denah sebagai teks, gambar, atau cetak.'},
   {en:'Space bar to spin, fullscreen button and icons beside buttons and headings.',id:'Tombol Spasi untuk memutar, tombol layar penuh, dan ikon di samping tombol serta judul.'},
   {en:'The wheel rotates slowly on its own before the first spin.',id:'Roda berputar pelan sendiri sebelum putaran pertama.'}
  ],
  improved:[
   {en:'The top bar hides when scrolling down and returns when scrolling up.',id:'Bar atas bersembunyi saat scroll ke bawah dan muncul lagi saat scroll ke atas.'},
   {en:'More polished desktop layout.',id:'Tampilan desktop yang lebih rapi.'}
  ]},
 {version:'v1.2.0',date:'2026-11-04',
  title:{en:'Desktop layout and seating patterns',id:'Tata letak desktop dan pola denah'},
  added:[
   {en:'Desktop layout with the wheel on the left and the Names/Seats panel on the right.',id:'Tata letak desktop dengan roda di kiri dan panel Nama/Denah di kanan.'},
   {en:'Two seating patterns: Alternating (desks alternate boy/girl inside each row) and Random Rows (one gender per row).',id:'Dua pola denah: Selang-seling (meja laki-laki/perempuan bergantian dalam satu baris) dan Acak Penuh (satu jenis per baris).'}
  ],
  improved:[
   {en:'The seating pattern applies immediately, and re-randomizing always produces a visibly different layout.',id:'Pola denah langsung diterapkan, dan acak ulang selalu menghasilkan susunan yang terlihat berbeda.'},
   {en:'Professional wording throughout the interface (Indonesian and English).',id:'Bahasa antarmuka yang lebih profesional (Indonesia dan Inggris).'},
   {en:'Shorter status text on mobile.',id:'Teks status yang lebih singkat di HP.'}
  ],
  fixed:[
   {en:'The alternating pattern had been alternating rows instead of desks.',id:'Pola selang-seling sebelumnya bergantian per baris, bukan per meja.'},
   {en:'"Random rows" sometimes produced the same layout again.',id:'"Acak baris" kadang menghasilkan susunan yang sama.'}
  ],
  removed:[
   {en:'The "Benglish" language option.',id:'Pilihan bahasa "Benglish".'}
  ]},
 {version:'v1.1.0',date:'2026-11-04',
  title:{en:'Smart names and rolling rounds',id:'Nama pintar dan putaran rolling'},
  added:[
   {en:'One mixed name list that is split into boys and girls automatically; tap a name to correct it.',id:'Satu daftar nama campuran yang otomatis dipisah menjadi laki-laki dan perempuan; ketuk nama untuk mengoreksi.'},
   {en:'Wheel sounds, winner popup, Shuffle and A-Z sorting, and a wheel logo.',id:'Suara roda, popup pemenang, Acak Urutan dan Urutkan A-Z, serta logo roda.'},
   {en:'"Next rolling" popup when all desks are filled, with a history of earlier layouts.',id:'Popup "Rolling berikutnya" saat semua meja terisi, lengkap dengan riwayat denah sebelumnya.'},
   {en:'Indonesian and English language switch.',id:'Pilihan bahasa Indonesia dan Inggris.'},
   {en:'Press-and-drag glass tab bar.',id:'Tab bar kaca yang bisa ditekan dan digeser.'}
  ],
  improved:[
   {en:'Green theme, smaller tab bar and a "Made with love" footer.',id:'Tema hijau, tab bar lebih kecil, dan footer "Made with love".'},
   {en:'The middle block now has 6 rows (18 desks).',id:'Blok tengah kini 6 baris (18 meja).'}
  ],
  fixed:[
   {en:'The tab bar glitched on iOS Safari; only the green pill grows when pressed now.',id:'Tab bar bermasalah di Safari iOS; kini hanya pil hijau yang membesar saat ditekan.'}
  ]},
 {version:'v1.0.0',date:'2026-11-03',
  title:{en:'First release',id:'Rilis pertama'},
  added:[
   {en:'Spin-the-wheel for names; the winner is placed on the next desk.',id:'Roda putar untuk nama; pemenang langsung menempati meja berikutnya.'},
   {en:'Three desk blocks (left, middle, right) with persistence in the browser.',id:'Tiga blok meja (kiri, tengah, kanan) dengan penyimpanan di browser.'},
   {en:'Material You inspired interface, liquid tab bar and Rex-bit logo.',id:'Antarmuka bergaya Material You, liquid tab bar, dan logo Rex-bit.'},
   {en:'Published as a static site on GitHub Pages.',id:'Dipublikasikan sebagai situs statis di GitHub Pages.'}
  ]}
];
