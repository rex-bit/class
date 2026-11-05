/* Rolling Kelas roadmap. EDIT THIS FILE to update plans; no build step needed.
   status: 'planned' | 'progress' | 'done'.   Optional: progress (0-100, shown on in-progress cards), tags ['wheel',...], version ('v1.5.0').
   Text can be a plain string or {en:'...',id:'...'}.
   HONESTY NOTE: "done" items are real, shipped features. "planned" items are PROPOSALS from the maintainer's idea list, not promises
   with dates. Review and edit the planned/progress items to match what you actually intend to build. */
window.ROADMAP=[
 /* in progress */
 {id:'device-test',status:'progress',progress:50,title:{en:'Test the installed app on real phones',id:'Uji aplikasi terpasang di HP asli'},
  desc:{en:'The installable offline app was only verified in desktop browsers so far. Checking iPhone and Android behaviour (install, offline, sound).',id:'Aplikasi yang bisa dipasang dan offline baru diuji di browser desktop. Sedang memeriksa perilaku di iPhone dan Android (pemasangan, offline, suara).'},tags:['pwa','mobile']},
 /* planned */
 {id:'absent',status:'planned',title:{en:'Mark absent students',id:'Tandai murid tidak hadir'},
  desc:{en:'Skip absent students on the wheel without deleting them from the list.',id:'Lewati murid yang tidak hadir di roda tanpa menghapusnya dari daftar.'},tags:['wheel']},
 {id:'lock',status:'planned',title:{en:'Lock desks',id:'Kunci meja'},
  desc:{en:'Keep specific students at fixed desks (for example the front row) when re-randomizing.',id:'Tempatkan murid tertentu di meja tetap (misalnya baris depan) saat mengacak ulang.'},tags:['seating']},
 {id:'layout',status:'planned',title:{en:'Configurable desk layout',id:'Jumlah meja bisa diatur'},
  desc:{en:'Change the number of rows and columns instead of the fixed 38-desk layout.',id:'Ubah jumlah baris dan kolom, tidak terpaku pada 38 meja.'},tags:['seating']},
 {id:'themes',status:'planned',title:{en:'Color themes',id:'Tema warna'},
  desc:{en:'Choose between green, blue or orange accents.',id:'Pilih aksen warna hijau, biru, atau oranye.'},tags:['ui']},
 {id:'bug-backend',status:'planned',title:{en:'Deliver bug reports',id:'Pengiriman laporan bug'},
  desc:{en:'Connect the Report a Bug form to an issue tracker or inbox so reports can be sent from the page (today it only prepares them).',id:'Hubungkan formulir Lapor Bug ke issue tracker atau kotak masuk agar laporan bisa dikirim dari halaman (saat ini hanya disiapkan).'},tags:['support']},
 /* completed */
 {id:'info-pages',status:'done',version:'v1.6.0',title:{en:'Information pages',id:'Halaman informasi'},
  desc:{en:'Terms of Service, About, Changelog, Roadmap and Report a Bug.',id:'Ketentuan Layanan, Tentang, Changelog, Roadmap, dan Lapor Bug.'},tags:['site']},
 {id:'backup',status:'done',version:'v1.5.0',title:{en:'Backup file and installable app',id:'File cadangan dan aplikasi terpasang'},
  desc:{en:'Save and restore data from a file; install the app and use it offline.',id:'Simpan dan pulihkan data dari file; pasang aplikasi dan pakai secara offline.'},tags:['data','pwa']},
 {id:'settings',status:'done',version:'v1.4.0',title:{en:'Settings, focus mode, undo, desk swap',id:'Pengaturan, mode fokus, urungkan, tukar meja'},
  desc:{en:'Sounds, confetti, spin time, wheel colors, wheel-only focus mode, undo and tap-to-swap desks.',id:'Suara, konfeti, durasi putaran, warna roda, mode fokus, urungkan, dan tukar meja dengan ketukan.'},tags:['wheel','ui']},
 {id:'privacy',status:'done',version:'v1.3.0',title:{en:'FAQ, privacy and export',id:'FAQ, privasi, dan ekspor'},
  desc:{en:'FAQ, Privacy Policy, delete-all-data button and plan export (text, image, print).',id:'FAQ, Kebijakan Privasi, tombol hapus semua data, dan ekspor denah (teks, gambar, cetak).'},tags:['privacy','data']},
 {id:'patterns',status:'done',version:'v1.2.0',title:{en:'Two seating patterns',id:'Dua pola denah'},
  desc:{en:'Alternating desks or one gender per row, with a re-randomize button.',id:'Meja bergantian atau satu jenis per baris, dengan tombol acak ulang.'},tags:['seating']},
 {id:'rolling',status:'done',version:'v1.1.0',title:{en:'Auto gender split and rolling rounds',id:'Pemisahan otomatis dan putaran rolling'},
  desc:{en:'One mixed list split automatically, plus next-rolling rounds with history.',id:'Satu daftar campuran dipisah otomatis, plus putaran rolling berikutnya dengan riwayat.'},tags:['wheel','seating']},
 {id:'core',status:'done',version:'v1.0.0',title:{en:'Spin wheel and seat placement',id:'Roda putar dan penempatan meja'},
  desc:{en:'The core: spin a name and place it on the next desk.',id:'Inti aplikasi: putar nama dan tempatkan di meja berikutnya.'},tags:['wheel']}
];
