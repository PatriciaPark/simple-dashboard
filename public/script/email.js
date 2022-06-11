import { getAuth, sendSignInLinkToEmail } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
import * as firebase from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js';

document.getElementById("resendEmailA").addEventListener("click", emailLinkSend, false);
let config = {
  apiKey: "AIzaSyCBSfZbINX0RkfDLZ_dUWeAE383iXLgowg",
  authDomain: "simple-dashboard-48420.firebaseapp.com", //"simple-dashboard-pyjee8.herokuapp.com", //
  projectId: "simple-dashboard-48420",
  storageBucket: "simple-dashboard-48420.appspot.com",
  messagingSenderId: "132374569431",
  appId: "1:132374569431:web:df01c30c4f0f25ed3cab92",
  measurementId: "G-Y72JJ0Q98H"
};

const app = firebase.initializeApp(config);
const auth = getAuth(app);
const email = sessionStorage.getItem('userSIEmail');

function emailLinkSend(){
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
      const user = firebase.auth().currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;

        fetch('/api/users/'+ email)
        .then((response) => response.json())
        .then((data) => {
          if(data.message) {

          } else {
            fetch('/api/users/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: displayName, email: email, password:""}),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.message){
                    // "Failed! Email is already in use!"
                    alert(data.message);
                } else {
                    // Signup Successful
                    sessionStorage.setItem('userSIEmail', userEmail);
                }
                // console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Fail:', error);
            });
          }
        })
        .catch((error) => {
          console.error('Fail to Get User:', error);
        });
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getIdToken() instead.
        const uid = user.uid;
      }
      // Save the email locally so you don't need to ask the user for it again
      window.localStorage.setItem('emailForSignIn', email);
      setCookie('emailForSession',email,1);
      alert("Send Email Successfully");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
}

function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

window.addEventListener('DOMContentLoaded', function() {
  emailLinkSend();
});