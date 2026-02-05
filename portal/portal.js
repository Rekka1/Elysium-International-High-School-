/* portal/portal.js */

// Tombol Desktop
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");

// Tombol Mobile (BARU)
const mobile_signin_btn = document.querySelector("#mobile-signin-btn");
const mobile_signup_btn = document.querySelector("#mobile-signup-btn");

const container = document.querySelector(".container");

// Fungsi Helper
function switchToSignUp() {
    container.classList.add("sign-up-mode");
}

function switchToSignIn() {
    container.classList.remove("sign-up-mode");
}

// Event Listeners Desktop
if (sign_up_btn) sign_up_btn.addEventListener("click", switchToSignUp);
if (sign_in_btn) sign_in_btn.addEventListener("click", switchToSignIn);

// Event Listeners Mobile
if (mobile_signup_btn) mobile_signup_btn.addEventListener("click", (e) => {
    e.preventDefault(); // Cegah link jump ke atas
    switchToSignUp();
});

if (mobile_signin_btn) mobile_signin_btn.addEventListener("click", (e) => {
    e.preventDefault();
    switchToSignIn();
});