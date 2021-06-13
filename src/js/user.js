var admin = require("firebase-admin");

var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://filmoteka-bcf47-default-rtdb.firebaseio.com"
});



const openRegistrFormButton = document.querySelector('.button_registration');
const openLogInFormButton = document.querySelector('.button_login');
const formModal = document.querySelector('.form-modal');
const registrationForm = document.querySelector('.registration');
const body = document.querySelector('body');
const registrationButton = document.querySelector('.register-button');
const logInButton = document.querySelector('.log-in-button');
const signOutButton = document.querySelector('.button_signOut');
const registrationMail = document.querySelector('.registration .mail');
const registrationPass = document.querySelector('.registration .pass');
const logInMail = document.querySelector('.logIn .mail');
const logInPass = document.querySelector('.logIn .pass');
const formButtonClose = document.querySelector('.form-button-close');
const logInForm = document.querySelector('.logIn');

openRegistrFormButton.addEventListener('click', event => {
  event.preventDefault();
  openRegistrationModal();
});

function openRegistrationModal() {
  formModal.classList.remove('hidden');
  registrationForm.classList.remove('hidden');
  body.classList.add('blocked-scroll');
}

openLogInFormButton.addEventListener('click', event => {
  event.preventDefault();
  openLogINModal();
});

registrationButton.addEventListener('click', event => {
  event.preventDefault();

  toggleSignIn(registrationMail.value, registrationPass.value);
  registrationMail.value = '';
  registrationPass.value = '';
});

formButtonClose.addEventListener('click', closeFormModal);
formModal.addEventListener('click', closeFormModal);
document.addEventListener('keydown', closeFormModal);

function openLogINModal() {
  formModal.classList.remove('hidden');
  body.classList.add('blocked-scroll');
  logInForm.classList.remove('hidden');
}

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

// /**Разбираюсь с классами
//      * Handles the sign in button press.
//      */
//     function toggleSignIn() {
//       if (firebase.auth().currentUser) {
//         firebase.auth().signOut();
//       } else {
//         var email = document.getElementById('email').value;
//         var password = document.getElementById('password').value;
//         if (email.length < 4) {
//           alert('Please enter an email address.');
//           return;
//         }
//         if (password.length < 4) {
//           alert('Please enter a password.');
//           return;
//         }
//         // Sign in with email and pass.
//         firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           if (errorCode === 'auth/wrong-password') {
//             alert('Wrong password.');
//           } else {
//             alert(errorMessage);
//           }
//           console.log(error);
//           document.getElementById('quickstart-sign-in').disabled = false;
//         });
//       }
//       document.getElementById('quickstart-sign-in').disabled = true;
//     }

//     /**
//      * Handles the sign up button press.
//      */
//     function handleSignUp() {
//       var email = document.getElementById('email').value;
//       var password = document.getElementById('password').value;
//       if (email.length < 4) {
//         alert('Please enter an email address.');
//         return;
//       }
//       if (password.length < 4) {
//         alert('Please enter a password.');
//         return;
//       }
//       // Create user with email and pass.
//       firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         if (errorCode == 'auth/weak-password') {
//           alert('The password is too weak.');
//         } else {
//           alert(errorMessage);
//         }
//         console.log(error);
//       });
//     }
    