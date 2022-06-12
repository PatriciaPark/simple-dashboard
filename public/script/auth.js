const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      // User successfully signed in
      if (authResult.user) {
        handleSignedInUser(authResult.user);
      }
      // if (authResult.additionalUserInfo) {
      //   document.getElementById('is-new-user').textContent =
      //       authResult.additionalUserInfo.isNewUser ?
      //       'New User' : 'Existing User';
      // }
      // Do not redirect.
      return false;
      // console.log("Auth Signin successful");
      // return true;
    },
    uiShown() {
      document.getElementById('loader').style.display = 'none';
    },
  },
  signInFlow: 'popup',
  // signInSuccessUrl: '/dashboardForAuth',
  signInOptions: [
    //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
ui.start('#firebaseui-auth-container', uiConfig);

/**
 * Displays the UI for a signed in user.
 * @param {!firebase.User} user
 */
var handleSignedInUser = function(user) {
  fetch('/api/users/'+ user.email)
  .then((response) => response.json())
  .then((data) => {
    if(data.message) {
      // User not in DB
      fetch('/api/users/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: user.displayName, email: user.email, password:''}),
      })
      .then((response) => response.json())
      .then((data) => {
          if(data.message){
              // "Failed! Email is already in use!"
              alert(data.message);
          } else {
              // Signup Successful
              sessionStorage.setItem('emailForAuth', user.email);
              window.location.replace("/dashboard");
          }
          // console.log('Success:', data);
      })
      .catch((error) => {
          console.error('Fail:', error);
      });
    } else {
      // User in DB
      sessionStorage.setItem('emailForAuth', user.email);
      window.location.replace("/dashboard");
    }
  })
  .catch((error) => {
    console.error('Fail to Get User:', error);
  });
  // document.getElementById('username').textContent = user.displayName;
  // document.getElementById('email').textContent = user.email;
};