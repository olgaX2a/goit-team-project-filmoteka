   // Firebase App (the core Firebase SDK) is always required and must be listed first -->
    import firebase from "firebase/app";
    // If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import -->
    // import * as firebase from "firebase/app" -->
    
    // If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
    import "firebase/analytics";
    
    // Add the Firebase products that you want to use
    import "firebase/auth";
    import "firebase/firestore";

    // TODO: Replace the following with your app's Firebase project configuration
      // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
      const config = {
        apiKey: "AIzaSyABQXBd2NFX3W2v3R2amAJrQ6tIPkdPgGY",
        authDomain: "filmoteka-bcf47.firebaseapp.com",
        databaseURL: "https://filmoteka-bcf47-default-rtdb.firebaseio.com",
        projectId: "filmoteka-bcf47",
        storageBucket: "filmoteka-bcf47.appspot.com",
        messagingSenderId: "185648826361",
        appId: "1:185648826361:web:8ee72df49c2b966ff25f28",
        measurementId: "G-TXV83LRCDL"
      };

      // Initialize Firebase
      firebase.initializeApp(config);

// let admin = require("firebase-admin");
// import * as admin from 'firebase-admin';

// let serviceAccount = require("../../serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://filmoteka-bcf47-default-rtdb.firebaseio.com"
// });

const openRegistrFormButton = document.querySelector('.button_registration');
const openLogInFormButton = document.querySelector('.button_login');
const formModal = document.querySelector('.form-modal');
const registrationForm = document.querySelector('.registration');
const body = document.querySelector('body');
const registrationButton = document.querySelector('.register-button');
const logInButton = document.querySelector('.log-in-button');
const signOutButton = document.querySelector('.button_signOut');
const formButtonClose = document.querySelector('.form-button-close');
const logInForm = document.querySelector('.logIn');
const navMenu = document.querySelector('.nav__menu');

//общая работа с формами - закрытие
formButtonClose.addEventListener('click', closeFormModal);
formModal.addEventListener('click', closeFormModal);
document.addEventListener('keydown', closeFormModal);

function closeFormModal(event) {
  if (
    event.target.classList.contains('form-modal') ||
    event.target.classList.contains('form-button-close') ||
    event.target.nodeName === 'use' ||
    event.key === 'Escape'
  ) {
    body.classList.remove('blocked-scroll');
    formModal.classList.add('hidden');
    registrationForm.classList.add('hidden');
    logInForm.classList.add('hidden');
  }
}

//работа с формой регистрации
openRegistrFormButton.addEventListener('click', event => {
  event.preventDefault();
  openRegistrationModal();
});

function openRegistrationModal() {
  formModal.classList.remove('hidden');
  registrationForm.classList.remove('hidden');
  body.classList.add('blocked-scroll');
}

// обрабатывает нажатие на кнопку регистрации
registrationButton.addEventListener('click', event => {
  event.preventDefault();
  handleRegister();
  
});

function handleRegister() {
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  if (email.length < 4) {
    alert('Please enter correct email address.');
    return;
  }
  if (password.length < 4) {
    alert('Your password is weak. Please enter a longer password.');
    return;
  }
  // создание пользователя по имейлу и паролю
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // обработка ошибок.
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
      }
      console.log(error);
  });
  
  if (confirm('Your account has been created')) {
    body.classList.remove('blocked-scroll');
    formModal.classList.add('hidden');
    registrationForm.classList.add('hidden');
    logInForm.classList.add('hidden');
    signOutButton.classList.remove('hidden');
    openRegistrFormButton.classList.add('hidden');
    openLogInFormButton.classList.add('hidden');
    navMenu.classList.remove('hidden');
  // sendEmailVerification();
}
    
//верификация почтового ящика пользователя
// function sendEmailVerification() {
//   firebase.auth().currentUser.sendEmailVerification().then(function() {
//     if (confirm('Email Verification Sent! Please follow the link in your email!')) {
//       body.classList.remove('blocked-scroll');
//       formModal.classList.add('hidden');
//       registrationForm.classList.add('hidden');
//       logInForm.classList.add('hidden');
//       signOutButton.classList.remove('hidden');
//       openRegistrFormButton.classList.add('hidden');
//       openLogInFormButton.classList.add('hidden');
//     } 
//   });
  
}


//работа с формой входа
openLogInFormButton.addEventListener('click', event => {
  event.preventDefault();
  openLogINModal();
});

function openLogINModal() {
  formModal.classList.remove('hidden');
  body.classList.add('blocked-scroll');
  logInForm.classList.remove('hidden');
}

//обрабатывает нажатие кнопки входа 
logInButton.addEventListener('click', event => {
  event.preventDefault();
  toggleLogIn();  
});

function toggleLogIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    const email = document.getElementById('log-email').value;
    const password = document.getElementById('log-password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // вход по почтовому ящику и паролю
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      // обработка ошибок
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
  alert('You are in!');
  if (confirm('You are in!')) {
    body.classList.remove('blocked-scroll');
    formModal.classList.add('hidden');
    registrationForm.classList.add('hidden');
    logInForm.classList.add('hidden');
    signOutButton.classList.remove('hidden');
    openRegistrFormButton.classList.add('hidden');
    openLogInFormButton.classList.add('hidden');
    navMenu.classList.remove('hidden');
  }
}

//выход
signOutButton.addEventListener('click', event => {
  window.location.reload();
});