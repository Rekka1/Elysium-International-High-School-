/* SCRIPT.JS
    Berisi logika: Animasi AOS, Bintang Jatuh, Filter Jurusan, Scroll Button.
*/

// 1. Inisialisasi Animasi AOS (Fade In Effect)
AOS.init({
    duration: 1000,
    once: true
});

// 2. Animasi Bintang Jatuh (Snow/Star Fall)
function createStar() {
    // Hanya buat bintang jika kita berada di halaman yang memiliki section #home
    const homeSection = document.getElementById('home');
    if (!homeSection) return;

    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random posisi dan ukuran
    star.style.left = Math.random() * 100 + "vw";
    const size = Math.random() * 3 + 2 + "px"; // Ukuran antara 2px - 5px
    star.style.width = size;
    star.style.height = size;
    
    // Random durasi jatuh (3s - 8s)
    star.style.animationDuration = Math.random() * 5 + 3 + "s";
    star.style.opacity = Math.random();
    
    homeSection.appendChild(star);
    
    // Hapus elemen setelah animasi selesai (agar tidak berat)
    setTimeout(() => {
        star.remove();
    }, 8000);
}
// Jalankan fungsi setiap 100ms
setInterval(createStar, 100);

// 3. Tombol Scroll Up
const scrollBtn = document.getElementById("scrollToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
};

if (scrollBtn) {
    scrollBtn.addEventListener("click", function(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// 4. Logika Filter Jurusan & Tombol Aktif
document.addEventListener("DOMContentLoaded", function() {
    // Default: Tampilkan jurusan 'popular' saat loading
    filterSelection('popular'); 
});

// Fungsi Utama Filter
function filterSelection(category) {
    var x, i;
    x = document.getElementsByClassName("filter-item");
    
    if (category == "all") category = ""; // Jika 'all', kosongkan filter

    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show"); // Reset: Sembunyikan semua
        
        // Cek apakah kartu punya class yang sesuai kategori
        if (x[i].className.indexOf(category) > -1) {
            w3AddClass(x[i], "show"); // Tampilkan yang sesuai
        }
    }
}

// Fungsi Helper: Tambah Class
function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
    }
}

// Fungsi Helper: Hapus Class
function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);     
        }
    }
    element.className = arr1.join(" ");
}

// --- FIX: LOGIC GANTI WARNA TOMBOL FILTER ---
var btnContainer = document.querySelector(".filter-container");

if (btnContainer) {
    // Ambil semua tombol yang punya class 'filter-btn'
    var btns = btnContainer.getElementsByClassName("filter-btn");

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            // 1. Reset: Hapus class 'active' dari SEMUA tombol filter dulu
            for (var j = 0; j < btns.length; j++) {
                btns[j].classList.remove("active");
            }

            // 2. Set: Tambahkan class 'active' HANYA ke tombol yang diklik ini
            this.classList.add("active");
        });
    }
}

/* --- TAMBAHAN: LOGIKA HAMBURGER MENU --- */
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle class 'active' pada ul.nav-links
            navLinks.classList.toggle('active');
            
            // Opsional: Ubah ikon dari 'bars' ke 'times' (silang) saat aktif
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Menutup menu saat salah satu link diklik (agar tidak menutupi konten)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navLinks.classList.remove('active');
                // Kembalikan icon ke semula
                const icon = menuToggle.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});

/* --- FIXED LOGIC: CHATBOT TOGGLE --- */
const chatToggler = document.getElementById('chatToggler');
const chatBox = document.getElementById('chatBox');
const closeChatBtn = document.getElementById('closeChat');
const chatContent = document.getElementById('chatContent');
const chatInput = document.getElementById('chatInput');

// 1. Buka Chat
if (chatToggler) {
    chatToggler.addEventListener('click', () => {
        // Toggle display: kalau hidden jadi flex, kalau flex jadi hidden
        if (chatBox.style.display === 'flex') {
            chatBox.style.display = 'none';
        } else {
            chatBox.style.display = 'flex';
        }
    });
}

// 2. Tutup Chat (Tombol X)
if (closeChatBtn) {
    closeChatBtn.addEventListener('click', () => {
        chatBox.style.display = 'none';
    });
}

// 3. Logic Kirim Pesan
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // User Message
    addMessage(text, 'user');
    chatInput.value = '';

    // Simulasi Typing & Reply
    setTimeout(() => {
        botReplyLogic(text.toLowerCase());
    }, 600);
}

function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    chatContent.appendChild(div);
    chatContent.scrollTop = chatContent.scrollHeight; // Auto scroll
}

// 4. Logic Jawaban Bot
function botReplyLogic(text) {
    let reply = "Maaf, saya tidak mengerti. Silakan klik tombol bantuan di atas.";

    if (text.includes('biaya') || text.includes('harga')) {
        reply = "💰 Biaya Masuk: \n- Regular: Rp 5.6jt/bulan\n- Elite: Rp 13.4jt/bulan (Include MacBook & Asrama).";
    } else if (text.includes('lokasi') || text.includes('alamat')) {
        reply = "📍 Kampus kami di Jl. Antariksa No. 99, Jakarta Selatan (Dekat Stasiun MRT Future).";
    } else if (text.includes('jurusan') || text.includes('prodi')) {
        reply = "🎓 Jurusan Unggulan: Coding, AI, Cyber Security, dan Bisnis Digital.";
    } else if (text.includes('halo') || text.includes('hi')) {
        reply = "Halo! Selamat datang di Elysium High School. 🤖";
    }

    addMessage(reply, 'bot');
}

// 5. Fungsi Tombol Cepat
function askBot(keyword) {
    if (keyword === 'biaya') addMessage("Berapa biaya masuk?", 'user');
    if (keyword === 'lokasi') addMessage("Di mana lokasi sekolah?", 'user');
    if (keyword === 'jurusan') addMessage("Ada jurusan apa saja?", 'user');

    setTimeout(() => {
        botReplyLogic(keyword);
    }, 500);
}