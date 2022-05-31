import { getAuth, sendSignInLinkToEmail } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import * as firebase from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'; 

document.getElementById("resendEmailA").addEventListener("click", sendEmailVerification, false);
let config = {
  apiKey: "AIzaSyCBSfZbINX0RkfDLZ_dUWeAE383iXLgowg",
  authDomain: "simple-dashboard-48420.firebaseapp.com",
  projectId: "simple-dashboard-48420",
  storageBucket: "simple-dashboard-48420.appspot.com",
  messagingSenderId: "132374569431",
  appId: "1:132374569431:web:df01c30c4f0f25ed3cab92",
  measurementId: "G-Y72JJ0Q98H"
};

const app = firebase.initializeApp(config);
const auth = getAuth(app);
const email = firebase.auth().currentUser.email;

function sendEmailVerification(){
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    // url: 'https://simple-dashboard-48420.web.app/',
    url: 'https://simple-dashboard-pyjee8.herokuapp.com/',
    handleCodeInApp: true
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      alert("Send Email Successfully: " + email);
      window.localStorage.setItem('emailForSignIn', email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
}

window.addEventListener('DOMContentLoaded', function() {
  sendEmailVerification();
});