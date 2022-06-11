const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult(authResult, redirectUrl) {
      // User successfully signed in
      console.log("Auth Signin successful");
      return true;
    },
    uiShown() {
      document.getElementById('loader').style.display = 'none';
    },
  },
  signInFlow: 'popup',
  signInSuccessUrl: '/dashboardForAuth',
  signInOptions: [
    //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};
ui.start('#firebaseui-auth-container', uiConfig);

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
  })

  

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getIdToken() instead.
  const uid = user.uid;
}