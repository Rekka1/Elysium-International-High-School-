/* portal/dashboard.js */

// 1. DATA DUMMY (Database Nilai Siswa)
const dataNilaiSiswa = [
    { id: 1, nama: "Abdul Putra", nisn: "12345678", mat: 85, fis: 78, bio: 88, status: "Lulus" },
    { id: 2, nama: "Achmad Multazam", nisn: "87654321", mat: 92, fis: 90, bio: 85, status: "Lulus" },
    { id: 3, nama: "Citra Kirana", nisn: "11223344", mat: 60, fis: 65, bio: 70, status: "Remedial" },
    { id: 4, nama: "Dewi Sartika", nisn: "55667788", mat: 88, fis: 89, bio: 95, status: "Lulus" },
    { id: 5, nama: "Eko Kurniawan", nisn: "99887766", mat: 75, fis: 70, bio: 80, status: "Lulus" }
];

// 2. DATA KEUANGAN SISWA (Dummy)
const dataKeuangan = [
    { bulan: "Januari 2026", jumlah: "Rp 5.400.000", status: "Lunas", tgl: "10 Jan 2026" },
    { bulan: "Februari 2026", jumlah: "Rp 5.400.000", status: "Lunas", tgl: "12 Feb 2026" },
    { bulan: "Maret 2026", jumlah: "Rp 500.000", status: "Belum Bayar", tgl: "-" }
];

// 3. FUNGSI NAVIGASI (Ganti Halaman Tanpa Reload)
function showSection(sectionId) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Tampilkan section yang dipilih
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    // Update Navigasi Aktif (Warna Biru)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });

    // Tutup menu mobile jika terbuka
    document.getElementById('navMenu').classList.remove('show');
}

// 4. TOGGLE HAMBURGER MENU
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('show');
}

// 5. RENDER DATA KE TABEL (Untuk Guru)
function renderTableGuru() {
    const tableBody = document.getElementById('tableBodyGuru');
    if (!tableBody) return;

    tableBody.innerHTML = ""; // Bersihkan dulu

    dataNilaiSiswa.forEach((siswa, index) => {
        const rata = ((siswa.mat + siswa.fis + siswa.bio) / 3).toFixed(1);
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><b>${siswa.nama}</b></td>
                <td>${siswa.nisn}</td>
                <td>${siswa.mat}</td>
                <td>${siswa.fis}</td>
                <td>${siswa.bio}</td>
                <td><b>${rata}</b></td>
                <td>
                    <span class="${siswa.status === 'Lulus' ? 'status-lulus' : 'status-pending'}">
                        ${siswa.status}
                    </span>
                </td>
                <td>
                    <button style="background:none; border:none; color:#00d2ff; cursor:pointer;"><i class="fas fa-edit"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 6. RENDER DATA KE TABEL (Untuk Siswa)
function renderTableSiswa() {
    const tableBody = document.getElementById('tableBodySiswa');
    if (!tableBody) return;

    // Contoh: Menampilkan nilai milik sendiri (Simulasi user Putra)
    const myData = dataNilaiSiswa[0]; 

    const subjects = [
        { mapel: "Matematika", nilai: myData.mat },
        { mapel: "Fisika", nilai: myData.fis },
        { mapel: "Biologi", nilai: myData.bio }
    ];

    tableBody.innerHTML = "";
    subjects.forEach(sub => {
        let predikat = "A";
        if (sub.nilai < 80) predikat = "B";
        if (sub.nilai < 70) predikat = "C";

        const row = `
            <tr>
                <td>${sub.mapel}</td>
                <td>75 (KKM)</td>
                <td><b>${sub.nilai}</b></td>
                <td>${predikat}</td>
                <td><span class="status-lulus">Lulus</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 7. LOAD SAAT HALAMAN DIBUKA
document.addEventListener("DOMContentLoaded", () => {
    // Render tabel sesuai halaman yang dibuka
    renderTableGuru();
    renderTableSiswa();
});