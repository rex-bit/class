#!/usr/bin/env python3
"""Generates the static info pages (terms, about, changelog, roadmap, report-bug).
Run from the repo root:  python3 tools/build_pages.py
Changelog and roadmap content live in data/*.js and do NOT need a rebuild."""
import os, html
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = open(os.path.join(ROOT, 'tools', 'logo_inner.svg'), encoding='utf-8').read()
UPDATED = {'id': '5 November 2026', 'en': '5 November 2026'}

def B(idt, en):  # block with both languages
    return f'<div data-l="id">{idt}</div><div data-l="en">{en}</div>'
def S(idt, en):  # inline with both languages
    return f'<span data-l="id">{idt}</span><span data-l="en">{en}</span>'
def ic(path):
    return f'<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="{path}"/></svg>'

I = {
 'menu': 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
 'spin': 'M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.87 5.87 0 0 1 6 12c0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z',
 'lock': 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z',
 'people': 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
 'grid': 'M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z',
 'history': 'M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
 'download': 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
 'wifi': 'M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 0 0-6 0zm-4-4l2 2a7.074 7.074 0 0 1 10 0l2-2C15.14 9.14 8.87 9.14 5 13z',
 'translate': 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
 'tune': 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
 'bolt': 'M7 2v11h3v9l7-12h-4l4-8z',
 'heart': 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
}

NAV = [('about.html', 'about', 'Tentang', 'About'), ('changelog.html', 'changelog', 'Changelog', 'Changelog'),
       ('roadmap.html', 'roadmap', 'Roadmap', 'Roadmap'), ('report-bug.html', 'report', 'Lapor Bug', 'Report a Bug')]
FOOT = [('index.html', 'home', 'Aplikasi', 'App'), ('about.html', 'about', 'Tentang', 'About'), ('terms.html', 'terms', 'Ketentuan Layanan', 'Terms of Service'),
        ('index.html#privacy', 'privacy', 'Kebijakan Privasi', 'Privacy Policy'), ('index.html#faq', 'faq', 'FAQ', 'FAQ'),
        ('changelog.html', 'changelog', 'Changelog', 'Changelog'), ('roadmap.html', 'roadmap', 'Roadmap', 'Roadmap'), ('report-bug.html', 'report', 'Lapor Bug', 'Report a Bug')]

def layout(key, fname, title_id, title_en, desc_id, desc_en, body, scripts=''):
    nav = ''.join(f'<a href="{h}"{" aria-current=\"page\"" if k == key else ""}>{S(i, e)}</a>' for h, k, i, e in NAV)
    foot = ''.join(f'<a href="{h}"{" aria-current=\"page\"" if k == key else ""}>{S(i, e)}</a>' for h, k, i, e in FOOT)
    q = html.escape
    return f'''<!DOCTYPE html>
<html lang="id" data-titleid="{q(title_id)}" data-titleen="{q(title_en)}" data-descid="{q(desc_id)}" data-descen="{q(desc_en)}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{q(title_id)}</title>
<meta name="description" content="{q(desc_id)}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#386a20">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Rolling Kelas">
<meta property="og:title" content="{q(title_id)}">
<meta property="og:description" content="{q(desc_id)}">
<meta name="twitter:card" content="summary">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="icons/icon-180.png">
<link rel="stylesheet" href="assets/site.css">
<script src="assets/init.js"></script>
<script src="assets/config.js"></script>
<script src="assets/site.js" defer></script>
</head>
<body data-page="{key}">
<a class="skip" href="#main">{S("Lewati ke konten", "Skip to content")}</a>
<header class="site-h"><div class="hwrap">
  <a class="brand" href="index.html" aria-label="Rolling Kelas"><svg class="logo" viewBox="0 0 48 48" aria-hidden="true">{LOGO}</svg><span><small>Rex-bit</small><b>Rolling Kelas</b></span></a>
  <nav class="main" id="mainnav" aria-label="{q('Navigasi utama')}">{nav}<a href="index.html" class="btn fill" style="margin-left:6px">{ic(I["spin"])}{S("Buka Aplikasi", "Open App")}</a></nav>
  <div class="hbtns"><button class="langbtn" id="langbtn" type="button">ID</button><button class="menubtn" id="menubtn" type="button" aria-expanded="false" aria-controls="mainnav" aria-label="Menu">{ic(I["menu"])}</button></div>
</div></header>
<main id="main">
{body}
</main>
<footer class="site-f"><nav class="flinks" aria-label="Footer">{foot}</nav>Made with <span class="h">♥</span> by <b>Rex-bit</b></footer>
<div id="toast" role="status" aria-live="polite"></div>
{scripts}
</body>
</html>
'''

def hero(eyebrow_id, eyebrow_en, h1_id, h1_en, lead_id, lead_en, meta=''):
    return f'''<div class="wrap"><div class="hero"><span class="eyebrow">{S(eyebrow_id, eyebrow_en)}</span>
<h1>{S(h1_id, h1_en)}</h1><p class="lead">{S(lead_id, lead_en)}</p>{meta}</div></div>'''

pages = {}

# ---------------------------------------------------------------- TERMS
T = [
 ('Penerimaan Ketentuan', 'Acceptance of Terms',
  '<p>Dengan membuka atau menggunakan Rolling Kelas ("Layanan"), Anda menyetujui Ketentuan Layanan ini. Jika Anda tidak setuju, mohon berhenti menggunakan Layanan.</p>',
  '<p>By opening or using Rolling Kelas (the "Service") you agree to these Terms of Service. If you do not agree, please stop using the Service.</p>'),
 ('Tentang Layanan', 'About the Service',
  '<p>Rolling Kelas adalah alat web gratis untuk mengacak dan menyusun denah tempat duduk kelas dengan roda putar. Layanan berjalan di browser Anda dan dikelola oleh Rex-bit ("kami"). Fitur dapat ditambah, diubah, atau dihapus sewaktu-waktu.</p>',
  '<p>Rolling Kelas is a free web tool for randomizing and arranging classroom seating with a spin wheel. It runs in your browser and is operated by Rex-bit ("we", "us"). Features may be added, changed or removed at any time.</p>'),
 ('Siapa yang Dapat Menggunakan', 'Who May Use the Service',
  '<p>Layanan ditujukan bagi guru, wali kelas, pengurus kelas, dan siapa pun yang menyusun tempat duduk. Jika Anda menggunakannya atas nama sekolah atau kelas, Anda menyatakan berwenang untuk melakukannya. Pengguna di bawah umur sebaiknya didampingi guru atau orang tua.</p>',
  '<p>The Service is intended for teachers, homeroom teachers, class officers and anyone arranging seats. If you use it on behalf of a school or class, you confirm that you are authorised to do so. Minors should be supervised by a teacher or parent.</p>'),
 ('Aturan Penggunaan', 'Rules of Use',
  '<p>Anda boleh menggunakan Layanan untuk tujuan yang sah dan wajar. Anda tidak boleh:</p><ul><li>memasukkan konten yang melanggar hukum, menghina, atau melecehkan siapa pun;</li><li>memakai Layanan untuk mendiskriminasi atau mempermalukan siswa;</li><li>mengganggu atau membebani Layanan, misalnya dengan otomatisasi berlebihan, atau mencoba menembus pengamanannya;</li><li>menyalin Layanan lalu menyebutnya karya Anda, atau meniru nama dan logo Rex-bit;</li><li>menggunakan hasil roda untuk undian berhadiah, taruhan, atau keputusan hukum dan keuangan. Roda memakai pengacak biasa di browser dan tidak dirancang untuk keperluan tersebut.</li></ul>',
  '<p>You may use the Service for lawful and reasonable purposes. You must not:</p><ul><li>enter content that is unlawful, insulting or harassing;</li><li>use the Service to discriminate against or humiliate students;</li><li>disrupt or overload the Service, for example through excessive automation, or try to bypass its protections;</li><li>copy the Service and present it as your own work, or imitate the Rex-bit name and logo;</li><li>use wheel results for prize draws, betting, or legal or financial decisions. The wheel uses an ordinary in-browser randomizer and is not designed for those purposes.</li></ul>'),
 ('Tanggung Jawab Pengguna', 'Your Responsibilities',
  '<ul><li>Anda bertanggung jawab atas nama dan data yang Anda masukkan, termasuk memastikan Anda diizinkan memakainya sesuai aturan sekolah. Kami menyarankan memakai nama depan atau nama panggilan.</li><li>Pemisahan laki-laki/perempuan dilakukan otomatis berdasarkan perkiraan dan bisa keliru. Periksa dan koreksi hasilnya sebelum dipakai.</li><li>Data tersimpan hanya di browser Anda. Anda bertanggung jawab membuat cadangan; data dapat hilang jika data browser dihapus.</li><li>File cadangan yang Anda unduh berisi nama-nama kelas. Simpan dan bagikan dengan hati-hati.</li><li>Anda bertanggung jawab atas keputusan yang diambil berdasarkan denah yang dihasilkan.</li></ul>',
  '<ul><li>You are responsible for the names and data you enter, including making sure you are allowed to use them under your school\'s rules. We recommend using first names or nicknames.</li><li>The boy/girl split is automatic, based on estimates, and can be wrong. Review and correct the result before using it.</li><li>Data is stored only in your browser. You are responsible for making backups; data can be lost if browser data is cleared.</li><li>Backup files you download contain your class names. Store and share them carefully.</li><li>You are responsible for decisions made using the generated seating plan.</li></ul>'),
 ('Penyalahgunaan Layanan', 'Misuse of the Service',
  '<p>Jika kami menemukan atau menerima laporan penyalahgunaan, kami dapat membatasi atau menghentikan akses ke Layanan, menonaktifkan fitur tertentu, atau mengambil langkah teknis lain yang wajar. Karena Layanan tidak memakai akun, pembatasan dilakukan lewat langkah teknis pada situs. Laporkan penyalahgunaan melalui halaman <a href="report-bug.html">Lapor Bug</a>.</p>',
  '<p>If we find or receive a report of misuse, we may restrict or end access to the Service, disable certain features, or take other reasonable technical measures. Because the Service has no accounts, restrictions are applied through technical measures on the site. Report misuse through the <a href="report-bug.html">Report a Bug</a> page.</p>'),
 ('Privasi', 'Privacy',
  '<p>Cara kami memperlakukan data dijelaskan di <a href="index.html#privacy">Kebijakan Privasi</a>. Ringkasnya: nama dan denah Anda tetap di browser Anda dan tidak kami kumpulkan.</p>',
  '<p>How we treat data is described in the <a href="index.html#privacy">Privacy Policy</a>. In short: your names and seating plans stay in your browser and are not collected by us.</p>'),
 ('Hak Kekayaan Intelektual dan Atribusi', 'Intellectual Property and Credits',
  '<p>Desain, kode, nama "Rolling Kelas", dan logo Rex-bit adalah milik Rex-bit kecuali dinyatakan lain, dan tidak boleh disalin atau didistribusikan ulang sebagai milik pihak lain kecuali ada lisensi terbuka yang dinyatakan di repositori. Efek suara tepuk tangan berasal dari "SFX Kit" oleh Wyzowl (lisensi CC0). Nama-nama yang Anda masukkan tetap milik Anda.</p>',
  '<p>The design, code, the "Rolling Kelas" name and the Rex-bit logo belong to Rex-bit unless stated otherwise, and may not be copied or redistributed as someone else\'s work unless an open licence is stated in the repository. The applause sound effect comes from "SFX Kit" by Wyzowl (CC0 licence). The names you enter remain yours.</p>'),
 ('Tanpa Jaminan', 'No Warranty',
  '<p>Layanan disediakan "sebagaimana adanya" dan "sebagaimana tersedia", tanpa jaminan apa pun, tersurat maupun tersirat. Kami tidak menjamin Layanan bebas dari kesalahan, selalu tersedia, atau hasilnya sesuai kebutuhan Anda.</p>',
  '<p>The Service is provided "as is" and "as available", without warranties of any kind, express or implied. We do not guarantee that the Service is error-free, always available, or that its results will suit your needs.</p>'),
 ('Batasan Tanggung Jawab', 'Limitation of Liability',
  '<p>Sejauh diizinkan oleh hukum yang berlaku, Rex-bit tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial, termasuk hilangnya data lokal, gangguan layanan, atau perselisihan yang timbul dari denah tempat duduk. Layanan ini gratis dan Anda menggunakannya atas risiko sendiri.</p>',
  '<p>To the extent permitted by applicable law, Rex-bit is not liable for indirect, incidental or consequential damages, including loss of local data, service interruptions, or disputes arising from a seating plan. The Service is free and you use it at your own risk.</p>'),
 ('Ketersediaan dan Perubahan Layanan', 'Availability and Changes to the Service',
  '<p>Layanan di-host di GitHub Pages dan dapat berubah, terhenti sementara, atau dihentikan tanpa pemberitahuan. Pembaruan penting dicatat di <a href="changelog.html">Changelog</a>.</p>',
  '<p>The Service is hosted on GitHub Pages and may change, be interrupted, or be discontinued without notice. Significant updates are recorded in the <a href="changelog.html">Changelog</a>.</p>'),
 ('Perubahan Ketentuan Layanan', 'Changes to These Terms',
  '<p>Kami dapat memperbarui Ketentuan ini dari waktu ke waktu. Tanggal "terakhir diperbarui" di bagian atas halaman akan disesuaikan. Dengan terus menggunakan Layanan setelah perubahan, Anda dianggap menerima Ketentuan yang baru. Jika ada bagian yang tidak dapat diberlakukan, bagian lainnya tetap berlaku.</p>',
  '<p>We may update these Terms from time to time. The "last updated" date at the top of this page will be adjusted. By continuing to use the Service after a change, you accept the new Terms. If any part cannot be enforced, the remaining parts stay in effect.</p>'),
 ('Kontak', 'Contact',
  '<p>Pertanyaan tentang Ketentuan ini dapat disampaikan melalui halaman <a href="report-bug.html">Lapor Bug</a> atau kepada pemilik repositori Rex-bit di GitHub.</p>',
  '<p>Questions about these Terms can be sent through the <a href="report-bug.html">Report a Bug</a> page or to the Rex-bit repository owner on GitHub.</p>'),
]
toc = ''.join(f'<a href="#s{i+1}">{i+1}. {S(t[0], t[1])}</a>' for i, t in enumerate(T))
secs = ''.join(f'<section id="s{i+1}"><h2><span class="n">{i+1}.</span><span>{S(t[0], t[1])}</span></h2>{B(t[2], t[3])}</section>' for i, t in enumerate(T))
meta = f'<div class="meta"><span class="chip">{ic(I["lock"])}{S("Terakhir diperbarui", "Last updated")}: <time datetime="2026-11-05">{S(UPDATED["id"], UPDATED["en"])}</time></span></div>'
body = hero('Legal', 'Legal', 'Ketentuan Layanan', 'Terms of Service',
            'Aturan sederhana agar Rolling Kelas tetap adil, aman, dan nyaman dipakai semua orang.',
            'Simple rules that keep Rolling Kelas fair, safe and pleasant for everyone.', meta)
body += f'<div class="wrap"><div class="doc"><aside class="toc" aria-label="Daftar isi / Contents"><b>{S("Daftar isi", "Contents")}</b>{toc}</aside><div class="prose card">{secs}</div></div></div>'
pages['terms.html'] = layout('terms', 'terms.html',
    'Ketentuan Layanan · Rolling Kelas', 'Terms of Service · Rolling Kelas',
    'Ketentuan Layanan Rolling Kelas: aturan penggunaan, tanggung jawab pengguna, penyalahgunaan layanan, dan perubahan ketentuan.',
    'Rolling Kelas Terms of Service: rules of use, user responsibilities, misuse of the service and changes to the terms.', body)

# ---------------------------------------------------------------- ABOUT
feat = [
 ('spin', 'Roda putar yang transparan', 'A transparent spin wheel', 'Semua orang bisa melihat siapa yang terpilih dan di meja mana ia duduk.', 'Everyone can see who is picked and which desk they get.'),
 ('people', 'Pemisahan nama otomatis', 'Automatic name split', 'Tempel satu daftar campuran; laki-laki dan perempuan dipisah otomatis dan bisa dikoreksi dengan satu ketukan.', 'Paste one mixed list; boys and girls are split automatically and can be corrected with a tap.'),
 ('grid', 'Dua pola denah', 'Two seating patterns', 'Selang-seling dalam satu baris, atau satu jenis per baris. 38 meja dalam tiga blok.', 'Alternating inside each row, or one gender per row. 38 desks in three blocks.'),
 ('history', 'Rolling berikutnya', 'Next rolling rounds', 'Saat semua meja terisi, mulai putaran baru dengan susunan berbeda. Riwayat denah tersimpan.', 'When all desks are filled, start a new round with a different layout. Past layouts are kept.'),
 ('lock', 'Privat secara bawaan', 'Private by design', 'Tanpa akun, tanpa pelacak. Data hanya ada di browser Anda.', 'No accounts, no trackers. Data stays in your browser.'),
 ('wifi', 'Bisa offline', 'Works offline', 'Pasang sebagai aplikasi dan buka tanpa internet setelah kunjungan pertama.', 'Install it as an app and open it without internet after the first visit.'),
 ('translate', 'Dua bahasa', 'Two languages', 'Tersedia dalam Bahasa Indonesia dan English.', 'Available in Bahasa Indonesia and English.'),
 ('download', 'Cadangan dan ekspor', 'Backup and export', 'Simpan semua data ke file, salin denah sebagai teks, simpan gambar, atau cetak.', 'Save all data to a file, copy the plan as text, save an image, or print.'),
]
fh = ''.join(f'<div class="card"><div class="ico">{ic(I[k])}</div><h3>{S(a, b)}</h3><p style="color:var(--onv);margin:0">{S(c, d)}</p></div>' for k, a, b, c, d in feat)
body = f'''<div class="wrap"><div class="hero about-hero"><div><span class="eyebrow">{S("Tentang", "About")}</span>
<h1>{S("Rolling kelas yang adil, cepat, dan tanpa ribet.", "Fair, fast, hassle-free classroom seat rotation.")}</h1>
<p class="lead">{S("Rolling Kelas adalah roda putar untuk membagi tempat duduk kelas. Tempel daftar nama, putar, dan setiap siswa otomatis mendapat meja berikutnya, lengkap dengan suara dan konfeti.", "Rolling Kelas is a spin wheel for assigning classroom seats. Paste your class list, spin, and each student is automatically placed at the next desk, with sound and confetti.")}</p>
<div class="row" style="margin-top:22px"><a class="btn fill" href="index.html">{ic(I["spin"])}{S("Buka Aplikasi", "Open App")}</a><a class="btn tonal" href="roadmap.html">{S("Lihat Roadmap", "View Roadmap")}</a></div></div>
<svg class="spinlogo" viewBox="0 0 48 48" aria-hidden="true">{LOGO.replace("lg","lg2")}</svg></div></div>
<div class="wrap">
<section class="block"><h2>{S("Mengapa Rolling Kelas ada", "Why Rolling Kelas exists")}</h2>
{B("<p style='max-width:760px'>Mengatur ulang tempat duduk itu memakan waktu dan sering memicu protes: siapa yang di depan, siapa yang dekat jendela. Rolling Kelas mengubahnya menjadi putaran yang bisa disaksikan semua orang, sehingga hasilnya terasa adil dan prosesnya cepat.</p>", "<p style='max-width:760px'>Rearranging seats takes time and often causes complaints: who sits at the front, who gets the window. Rolling Kelas turns it into a spin everyone can watch, so the result feels fair and the process is quick.</p>")}</section>
<section class="block vm"><div class="grid g2">
<div class="card"><div class="ico">{ic(I["bolt"])}</div><h2>{S("Visi", "Vision")}</h2>{B("<p>Menjadi alat bantu kelas yang paling sederhana dan tepercaya untuk pembagian tempat duduk yang adil, sambil menjaga data siswa tetap di tangan penggunanya.</p>", "<p>To be the simplest and most trusted classroom tool for fair seat assignment, while keeping student data in the hands of its users.</p>")}</div>
<div class="card"><div class="ico">{ic(I["heart"])}</div><h2>{S("Misi", "Mission")}</h2><div data-l="id"><ul class="mission"><li>Menyediakan proses acak yang transparan dan mudah dipahami.</li><li>Menjaga privasi: tanpa akun dan pelacak, data hanya di perangkat.</li><li>Mudah diakses: gratis, dua bahasa, jalan di HP, tablet, dan laptop, bahkan offline.</li><li>Terus diperbaiki berdasarkan masukan pengguna.</li></ul></div><div data-l="en"><ul class="mission"><li>Provide a transparent randomizing process that is easy to understand.</li><li>Protect privacy: no accounts or trackers, data stays on the device.</li><li>Stay accessible: free, two languages, works on phones, tablets and laptops, even offline.</li><li>Keep improving based on user feedback.</li></ul></div></div>
</div></section>
<section class="block"><h2>{S("Cara kerja", "How it works")}</h2><div class="steps">
<div class="card"><h3>{S("Tempel daftar nama", "Paste your class list")}</h3><p style="margin:0;color:var(--onv)">{S("Satu daftar saja. Laki-laki dan perempuan dipisah otomatis; koreksi dengan satu ketukan.", "One list is enough. Boys and girls are split automatically; fix any mistake with a tap.")}</p></div>
<div class="card"><h3>{S("Putar roda", "Spin the wheel")}</h3><p style="margin:0;color:var(--onv)">{S("Pemenang otomatis menempati meja berikutnya, sesuai pola yang Anda pilih.", "The winner is placed on the next desk, following the pattern you chose.")}</p></div>
<div class="card"><h3>{S("Lanjut ke rolling berikutnya", "Move on to the next rolling")}</h3><p style="margin:0;color:var(--onv)">{S("Setelah semua meja terisi, mulai denah baru. Denah lama tersimpan di riwayat.", "Once every desk is filled, start a new layout. The old one stays in the history.")}</p></div>
</div></section>
<section class="block"><h2>{S("Fitur utama", "Key features")}</h2><div class="grid g4">{fh}</div></section>
<section class="block"><div class="card"><h2>{S("Dibuat oleh Rex-bit", "Built by Rex-bit")}</h2>{B("<p style='margin:0;max-width:760px'>Rolling Kelas dibuat dan dirawat oleh Rex-bit. Lihat <a href='changelog.html'>Changelog</a> untuk riwayat pembaruan, <a href='terms.html'>Ketentuan Layanan</a> dan <a href='index.html#privacy'>Kebijakan Privasi</a> untuk aturan, atau <a href='report-bug.html'>laporkan bug</a> jika menemukan masalah.</p>", "<p style='margin:0;max-width:760px'>Rolling Kelas is built and maintained by Rex-bit. See the <a href='changelog.html'>Changelog</a> for updates, the <a href='terms.html'>Terms of Service</a> and <a href='index.html#privacy'>Privacy Policy</a> for the rules, or <a href='report-bug.html'>report a bug</a> if you find a problem.</p>")}</div></section>
</div>'''
pages['about.html'] = layout('about', 'about.html',
    'Tentang Rolling Kelas · Roda Putar Tempat Duduk Kelas', 'About Rolling Kelas · Classroom Seat Spin Wheel',
    'Rolling Kelas adalah roda putar untuk membagi tempat duduk kelas secara adil. Kenali tujuan, visi, misi, dan fiturnya.',
    'Rolling Kelas is a spin wheel that assigns classroom seats fairly. Learn about its purpose, vision, mission and features.', body)

# ---------------------------------------------------------------- CHANGELOG
body = hero('Changelog', 'Changelog', 'Riwayat pembaruan', 'Release history',
            'Semua perubahan Rolling Kelas dari rilis pertama hingga terbaru, dikelompokkan menjadi Added, Improved, Fixed, dan Removed.',
            'Every change to Rolling Kelas from the first release to the latest, grouped as Added, Improved, Fixed and Removed.')
body += f'''<div class="wrap">
<div class="filters" role="group" aria-label="Filter">
<button class="fchip" data-f="all" aria-pressed="true" type="button">{S("Semua", "All")}</button>
<button class="fchip" data-f="added" aria-pressed="false" type="button">Added</button>
<button class="fchip" data-f="improved" aria-pressed="false" type="button">Improved</button>
<button class="fchip" data-f="fixed" aria-pressed="false" type="button">Fixed</button>
<button class="fchip" data-f="removed" aria-pressed="false" type="button">Removed</button></div>
<div class="tl" id="tl" aria-live="polite"></div>
<noscript><p class="callout">{S("Aktifkan JavaScript untuk melihat riwayat pembaruan.", "Enable JavaScript to see the release history.")}</p></noscript>
<p class="callout" style="margin-top:8px">{S("Nomor versi v1.0.0 sampai v1.5.0 diberikan belakangan berdasarkan riwayat commit proyek (tanggal sesuai commit asli). Data ada di <code>data/changelog.js</code> dan bisa diedit langsung.", "Version numbers v1.0.0 to v1.5.0 were assigned retroactively from the project's commit history (dates are the real commit dates). The data lives in <code>data/changelog.js</code> and can be edited directly.")}</p>
</div>'''
pages['changelog.html'] = layout('changelog', 'changelog.html',
    'Changelog · Riwayat Pembaruan Rolling Kelas', 'Changelog · Rolling Kelas Release History',
    'Riwayat pembaruan Rolling Kelas dengan sistem versi: fitur baru, peningkatan, perbaikan, dan yang dihapus.',
    'Rolling Kelas release history with versions: new features, improvements, fixes and removals.', body,
    '<script src="data/changelog.js"></script>\n<script src="assets/changelog.js" defer></script>')

# ---------------------------------------------------------------- ROADMAP
body = hero('Roadmap', 'Roadmap', 'Rencana pengembangan', 'Development roadmap',
            'Apa yang sudah selesai, sedang dikerjakan, dan direncanakan untuk Rolling Kelas.',
            'What is done, what is being worked on and what is planned for Rolling Kelas.')
body += f'''<div class="wrap">
<div class="stats"><div class="stat"><b id="st-total">0</b><span>{S("Total item", "Total items")}</span></div><div class="stat"><b id="st-planned">0</b><span>{S("Direncanakan", "Planned")}</span></div><div class="stat"><b id="st-progress">0</b><span>{S("Sedang dikerjakan", "In Progress")}</span></div><div class="stat"><b id="st-done">0</b><span>{S("Selesai", "Completed")}</span></div></div>
<div class="overall"><div class="row"><span>{S("Kemajuan keseluruhan", "Overall progress")}</span><b id="ov-pct">0%</b></div><div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-label="Kemajuan keseluruhan / Overall progress"><i id="ov-bar" style="width:0"></i></div></div>
<div class="statustabs" role="group" aria-label="Filter status / Status filter">
<button class="fchip" data-f="all" aria-pressed="true" type="button">{S("Semua", "All")}</button>
<button class="fchip" data-f="planned" aria-pressed="false" type="button">{S("Direncanakan", "Planned")}</button>
<button class="fchip" data-f="progress" aria-pressed="false" type="button">{S("Sedang Dikerjakan", "In Progress")}</button>
<button class="fchip" data-f="done" aria-pressed="false" type="button">{S("Selesai", "Completed")}</button></div>
<div class="board" id="board" aria-live="polite"></div>
<noscript><p class="callout">{S("Aktifkan JavaScript untuk melihat roadmap.", "Enable JavaScript to see the roadmap.")}</p></noscript>
<p class="callout" style="margin-top:20px">{S("Item yang berstatus Selesai adalah fitur yang benar-benar sudah dirilis. Item Direncanakan adalah usulan, bukan janji tanggal. Data ada di <code>data/roadmap.js</code>: ubah <code>status</code> untuk memindahkan kartu antarkolom.", "Completed items are features that have really shipped. Planned items are proposals, not date commitments. The data lives in <code>data/roadmap.js</code>: change an item's <code>status</code> to move its card between columns.")}</p>
</div>'''
pages['roadmap.html'] = layout('roadmap', 'roadmap.html',
    'Roadmap · Rencana Pengembangan Rolling Kelas', 'Roadmap · Rolling Kelas Development Plans',
    'Roadmap Rolling Kelas: rencana pengembangan yang direncanakan, sedang dikerjakan, dan sudah selesai.',
    'Rolling Kelas roadmap: planned, in-progress and completed development items.', body,
    '<script src="data/roadmap.js"></script>\n<script src="assets/roadmap.js" defer></script>')

# ---------------------------------------------------------------- REPORT A BUG
cats = [('Wheel / Spin', 'Roda / Putar'), ('Seating layout', 'Denah tempat duduk'), ('Names & gender split', 'Nama & pemisahan jenis kelamin'), ('Sound & confetti', 'Suara & konfeti'),
        ('Settings', 'Pengaturan'), ('Backup / Install / Offline', 'Cadangan / Pasang / Offline'), ('Design / Layout', 'Tampilan / Tata letak'), ('Other', 'Lainnya')]
opt_html = '<option value="" data-t-id="Pilih kategori…" data-t-en="Choose a category…">Pilih kategori…</option>' + ''.join(f'<option value="{e}" data-t-id="{i}" data-t-en="{e}">{i}</option>' for e, i in cats)
def field(fid, label_id, label_en, kind='input', ph_id='', ph_en='', extra=''):
    ph = f'placeholder="{html.escape(ph_id)}" data-ph-id="{html.escape(ph_id)}" data-ph-en="{html.escape(ph_en)}"'
    lab = f'<label for="f-{fid}">{S(label_id, label_en)} <span class="req" aria-hidden="true">*</span></label>'
    if kind == 'select':
        ctl = f'<select id="f-{fid}" name="{fid}" aria-describedby="e-{fid}" required>{opt_html}</select>'
    elif kind == 'area':
        ctl = f'<textarea id="f-{fid}" name="{fid}" aria-describedby="e-{fid}" maxlength="2100" {ph} required></textarea>'
    else:
        ctl = f'<input id="f-{fid}" name="{fid}" type="text" aria-describedby="e-{fid}" maxlength="150" {ph} required>'
    cnt = '' if kind == 'select' else f'<span id="c-{fid}"></span>'
    return f'<div class="field">{lab}{extra or ctl}<div class="help"><span class="err" id="e-{fid}" role="alert"></span>{cnt}</div></div>'
dev_extra = f'<div class="detect"><input id="f-device" name="device" type="text" aria-describedby="e-device" maxlength="150" placeholder="mis. Chrome 130 di Android 14" data-ph-id="mis. Chrome 130 di Android 14" data-ph-en="e.g. Chrome 130 on Android 14" required><button class="btn tonal" id="detect" type="button">{S("Deteksi", "Detect")}</button></div>'
form = f'''<form id="bugform" class="form card" novalidate>
{field("title", "Judul Bug", "Bug Title", ph_id="Ringkasan singkat masalahnya", ph_en="Short summary of the problem")}
{field("desc", "Deskripsi", "Description", "area", ph_id="Apa yang salah? Sertakan hal yang membantu kami memahaminya.", ph_en="What went wrong? Include anything that helps us understand it.")}
<div class="fgrid">{field("cat", "Kategori", "Category", "select")}{field("device", "Browser / Perangkat", "Browser / Device", extra=dev_extra)}</div>
{field("steps", "Langkah untuk Mereproduksi", "Steps to Reproduce", "area", ph_id="1. Buka aplikasi  2. Ketuk ...  3. ...", ph_en="1. Open the app  2. Tap ...  3. ...")}
<div class="fgrid">{field("expected", "Hasil yang Diharapkan", "Expected Result", "area", ph_id="Apa yang seharusnya terjadi?", ph_en="What should have happened?")}{field("actual", "Hasil Sebenarnya", "Actual Result", "area", ph_id="Apa yang terjadi?", ph_en="What happened instead?")}</div>
<div class="row"><button class="btn fill" id="submit" type="submit">{ic("M2.01 21 23 12 2.01 3 2 10l15 2-15 2z")}{S("Kirim Laporan", "Submit Report")}</button><button class="btn text" type="reset">{S("Kosongkan", "Clear form")}</button></div>
</form>'''
body = hero('Support', 'Support', 'Lapor Bug', 'Report a Bug',
            'Menemukan masalah? Isi formulir ini agar kami bisa mereproduksi dan memperbaikinya.',
            'Found a problem? Fill in this form so it can be reproduced and fixed.')
body += f'''<div class="wrap" style="max-width:860px">
<div class="callout note" style="margin-bottom:16px"><span style="color:var(--primary)">{ic("M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z")}</span><div>{B("Situs ini belum memiliki server untuk menerima laporan. Setelah formulir diisi, laporan hanya <b>disiapkan</b> di perangkat Anda (tidak dikirim atau disimpan) agar bisa Anda salin atau unduh lalu kirim ke pengembang. Jangan menulis data pribadi atau nama siswa.", "This site does not have a server to receive reports yet. After you fill in the form the report is only <b>prepared</b> on your device (it is not sent or stored) so you can copy or download it and send it to the developer. Please do not include personal data or student names.")}</div></div>
{form}
<div class="card result" id="result" hidden tabindex="-1"></div>
<noscript><p class="callout">{S("Aktifkan JavaScript untuk memakai formulir ini.", "Enable JavaScript to use this form.")}</p></noscript>
</div>'''
pages['report-bug.html'] = layout('report', 'report-bug.html',
    'Lapor Bug · Rolling Kelas', 'Report a Bug · Rolling Kelas',
    'Laporkan bug di Rolling Kelas: isi judul, deskripsi, kategori, browser/perangkat, langkah reproduksi, hasil yang diharapkan dan hasil sebenarnya.',
    'Report a bug in Rolling Kelas: title, description, category, browser/device, steps to reproduce, expected and actual result.', body,
    '<script src="assets/report.js" defer></script>')

for name, content in pages.items():
    open(os.path.join(ROOT, name), 'w', encoding='utf-8').write(content)
    print('wrote', name, len(content))
