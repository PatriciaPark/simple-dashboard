const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      // User successfully signed in
      const user = firebase.auth().currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;

        var data = { email: email, username: displayName };

        // fetch('/api/users/create', {
        //   method: 'POST',
        //   headers: {
        //       'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(data),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log('Success:', data);
        // })
        // .catch((error) => {
        //     console.error('Fail:', error);
        // });

        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getIdToken() instead.
        const uid = user.uid;
      }
      console.log("Signin successful");
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