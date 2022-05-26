import { getAuth, sendSignInLinkToEmail } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import * as firebase from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js'; 

document.getElementById("resendEmailA").addEventListener("click", sendEmailVerification, false);
let config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STOREBUKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID
};

const app = firebase.initializeApp(config);
const auth = getAuth(app);
const email = sessionStorage.getItem('userSIEmail');

function sendEmailVerification(){
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://simple-dashboard-48420.web.app/',
    // This must be true.
    handleCodeInApp: true
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      alert("Resend Email Successfully");
      window.location.replace("../index.html");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
}