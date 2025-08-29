// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// TODO: Add your web app's Firebase configuration
// IMPORTANT: Replace this with your actual Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBiDWzTqR3L-3zKh3gCoTFkDymv9o63xMw",
  authDomain: "hatakehugo.firebaseapp.com",
  projectId: "hatakehugo",
  storageBucket: "hatakehugo.firebasestorage.app",
  messagingSenderId: "916702471715",
  appId: "1:916702471715:web:ea00ef48f51f5e18acb396",
  measurementId: "G-06X0WZHR00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();


// --- Authentication Logic ---

const emailInput = document.getElementById('email-address');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-btn-form');
const registerButton = document.getElementById('register-btn-form');
const errorMessage = document.getElementById('error-message');

// Register new user
if(registerButton) {
    registerButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Registered and signed in:', user);
                window.location.href = "index.html";
            })
            .catch((error) => {
                errorMessage.textContent = error.message;
            });
    });
}


// Login existing user
if(loginButton){
    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('Signed in:', user);
                window.location.href = "index.html"; 
            })
            .catch((error) => {
                 errorMessage.textContent = error.message;
            });
    });
}


// --- Auth State Management ---

const mainLoginBtn = document.getElementById('login-btn');

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        if(mainLoginBtn){
            mainLoginBtn.textContent = 'Logout';
            mainLoginBtn.href = "#"; // Prevent navigation
            mainLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                signOut(auth).then(() => {
                    console.log('User signed out.');
                }).catch((error) => {
                    console.error('Sign out error', error);
                });
            });
        }
    } else {
        // User is signed out
         if(mainLoginBtn){
            mainLoginBtn.textContent = 'Login';
            mainLoginBtn.href = "login.html";
         }
    }
});
