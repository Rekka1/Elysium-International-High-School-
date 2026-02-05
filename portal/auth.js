/* portal/auth.js */

// DATABASE SEMENTARA
const usersDB = [
    { username: "guru", password: "123", role: "guru", name: "Narena S.Pd" },
    
    { username: "putra", password: "01", role: "siswa", name: "Abdul Putra" },
    { username: "azam", password: "02", role: "siswa", name: "Achmad Multazam" }
];

// FUNGSI LOGIN
function handleLogin(event) {
    if (event) event.preventDefault(); // Cegah reload form

    const userInput = document.getElementById('username').value;
    const passInput = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    const btn = document.querySelector('.btn-submit');

    if (!userInput || !passInput) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = "Harap isi semua kolom!";
        return;
    }

    // Efek Loading
    const originalText = btn.innerText;
    btn.innerText = "Verifying...";
    btn.style.opacity = "0.7";
    btn.disabled = true;

    setTimeout(() => {
        const foundUser = usersDB.find(u => u.username === userInput && u.password === passInput);

        if (foundUser) {
            btn.innerText = "Success!";
            btn.style.background = "#00ff88";
            localStorage.setItem('activeUser', JSON.stringify(foundUser));

            setTimeout(() => {
                if (foundUser.role === 'guru') {
                    window.location.href = 'dashboard-guru.html';
                } else {
                    window.location.href = 'dashboard-siswa.html';
                }
            }, 1000);
        } else {
            errorMsg.style.display = 'block';
            errorMsg.innerText = "Username atau Password salah!";
            btn.innerText = originalText;
            btn.style.opacity = "1";
            btn.disabled = false;
        }
    }, 1000);
}

// FUNGSI DAFTAR (Hanya Alert)
function handleRegister(event) {
    if (event) event.preventDefault();
    alert('Permintaan pendaftaran dikirim ke Admin Sekolah.');
}

// LOGOUT
function logout() {
    localStorage.removeItem('activeUser');
    window.location.href = 'login.html';
}

// CEK SESI
function checkSession() {
    const user = JSON.parse(localStorage.getItem('activeUser'));
    if (!user) {
        alert("Silakan login terlebih dahulu!");
        window.location.href = 'login.html';
    } else {
        const display = document.getElementById('userNameDisplay');
        if (display) display.innerText = user.name;
    }
}