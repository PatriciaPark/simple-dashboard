const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      // update database - email verification(emailVerification= 0 -> 1)
      const email = sessionStorage.getItem('userSIEmail');
      var data = { email: email };
      fetch('/api/users/verificationData', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          })
          .then((response) => response.json())
          .then((data) => {
              console.log('Success:', data);
          })
          .catch((error) => {
              console.error('Fail:', error);
      });
      console.log("Auth Result: " + authResult);
      return true;
    },
    uiShown() {
      document.getElementById('loader').style.display = 'none';
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: './views/dashboard.html',
  signInOptions: [
    //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
ui.start('#firebaseui-auth-container', uiConfig);