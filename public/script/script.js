// ********** Working For Sign Up Form **********
// Name Validation 
function checkUserFullName(){
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
  }

// Email Validation
function checkUserEmail(){
  var userEmail = document.getElementById("userEmail");
  var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if(userEmail.value.match(userEmailFormate)){
      flag = false;
  }else{
      flag = true;
  }
  if(flag){
      document.getElementById("userEmailError").style.display = "block";
  }else{
      document.getElementById("userEmailError").style.display = "none";
  }
}

// Password Validation
function checkUserPassword(){
  var userPassword = document.getElementById("userPassword");
  var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;      
  var flag;
  if(userPassword.value.match(userPasswordFormate)){
      flag = false;
  }else{
      flag = true;
  }    
  if(flag){
      document.getElementById("userPasswordError").style.display = "block";
  }else{
      document.getElementById("userPasswordError").style.display = "none";
  }
}

// User Confirm Password Validation
function checkUserConfirmPassword(){
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var userPassword = document.getElementById("userPassword").value;
    var flag = false;
    if(userConfirmPassword === userPassword){
        flag = true;
    }
    if(flag){
        document.getElementById("userConfirmPasswordError").style.display = "none";
    }else{
        document.getElementById("userConfirmPasswordError").style.display = "block";
    }
  }

// Submitting and Creating new user in firebase authentication
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
  
    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);
    var checkUserConfirmPasswordValid = userConfirmPassword.match(userPasswordFormate);
  
    if(checkUserFullNameValid == null){
        document.getElementById("userFullName").focus();
        alert("Please enter your name");
        return checkUserFullName();
    }else if(checkUserEmailValid == null){
        document.getElementById("userEmail").focus();
        alert("Please enter your email");
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        document.getElementById("userPassword").focus();
        alert("Please enter your password");
        return checkUserPassword();
    }else if(checkUserConfirmPasswordValid == null){
        document.getElementById("userConfirmPassword").focus();
        alert("Please check your password");
      return checkUserConfirmPassword();
    }else{
        // Signup
        var data = {  username: userFullName,
                        email: userEmail,
                        password: userPassword
                    };

        fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.message){
                // "Failed! Email is already in use!"
                alert(data.message);
            } else {
                // Signup Successful
                sessionStorage.setItem('userSIEmail', userEmail);
                // firebase users authentication
                firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
                    var user = firebase.auth().currentUser;
                    var uid;
                    if (user != null) {
                        uid = user.uid;
                    }    
                }).catch((error) => {
                    console.log(error.message);
                });
                alert("Signup Successful");
                window.location.replace("../views/email_verification.html");
            }
            // console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Fail:', error);
        });
    }
}

// ********** Working For Sign In Form **********
// Sign In Email Validation
function checkUserSIEmail(){
  var userSIEmail = document.getElementById("userSIEmail");
  var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var flag;
  if(userSIEmail.value.match(userSIEmailFormate)){
      flag = false;
  }else{
      flag = true;
  }
  if(flag){
      document.getElementById("userSIEmailError").style.display = "block";
  }else{
      document.getElementById("userSIEmailError").style.display = "none";
  }
}
// Sign In Password Validation
function checkUserSIPassword(){
  var userSIPassword = document.getElementById("userSIPassword");
  var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
  var flag;
  if(userSIPassword.value.match(userSIPasswordFormate)){
      flag = false;
  }else{
      flag = true;
  }    
  if(flag){
      document.getElementById("userSIPasswordError").style.display = "block";
  }else{
      document.getElementById("userSIPasswordError").style.display = "none";
  }
}
// Check email or password exsist in firebase authentication    
function signIn(){
  var userSIEmail = document.getElementById("userSIEmail").value;
  var userSIPassword = document.getElementById("userSIPassword").value;
  var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

  var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
  var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

  if(checkUserEmailValid == null){
      document.getElementById("userSIEmail").focus();
      alert("Please check your Email Address");
      return checkUserSIEmail();
  }else if(checkUserPasswordValid == null){
      return checkUserSIPassword();
  }else{
      // Signin successful
      var data ={ email: userSIEmail };
      fetch('/api/users/verified', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.message){
                // Not verified email yet : emailVerification=0
                console.log(data.message);
                sessionStorage.setItem('userSIEmail', userSIEmail);
                window.location.replace("./views/email_verification.html");
            } else {
                // Already verified email : emailVerification=0
                // update database - login count(loginCnt), last session(lastSession)
                var data = { email:userSIEmail };
                fetch('/api/users/loginData', {
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
                window.location.replace("./views/dashboard.html");
            }
            // console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Fail:', error);
    });
  }
}
// Save profile and update database
function saveProfile(){
  let userFullName = document.getElementById("userFullName").value 
  var userFullNameFormate = /^([A-Za-z.\s_-])/; 
  var checkUserFullNameValid = userFullName.match(userFullNameFormate);
  if(checkUserFullNameValid == null){
      return checkUserFullName();
  }else{
      let user = firebase.auth().currentUser;
      let uid;
      if(user != null){
          uid = user.uid;
      }
      var firebaseRef = firebase.database().ref();
      var userData = {
          userFullName: userFullName,
      }
      firebaseRef.child(uid).set(userData);
    //   swal({
    //       type: 'successfull',
    //       title: 'Update successfull',
    //       text: 'Profile updated.', 
    //   }).then((value) => {
    //       setTimeout(function(){
    //           document.getElementById("profileSection").style.display = "block";

    //           document.getElementById("editProfileForm").style.display = "none";
    //       }, 1000)
    //   });
  }
}
// Reset password and update database && checkUserOldPassword
function resetPassword(){
    var userPassword = document.getElementById("userPassword").value;
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    var checkUserPasswordValid = userFullName.match(userPasswordFormate);
    if(checkUserPasswordValid == null){
        document.getElementById("userPassword").focus();
        return checkUserPassword();
    }else if(userConfirmPassword == null){
        document.getElementById("userConfirmPassword").focus();
      return checkUserConfirmPassword();
    }else{
        let user = firebase.auth().currentUser;
        let uid;
        if(user != null){
            uid = user.uid;
        }
        var firebaseRef = firebase.database().ref();
        var userData = {
            userPassword: userPassword,
        }
        firebaseRef.child(uid).set(userData);
      //   swal({
      //       type: 'successfull',
      //       title: 'Update successfull',
      //       text: 'Profile updated.', 
      //   }).then((value) => {
      //       setTimeout(function(){
      //           document.getElementById("profileSection").style.display = "block";
  
      //           document.getElementById("editProfileForm").style.display = "none";
      //       }, 1000)
      //   });
    }
  }

// Working For Sign Out
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.location.replace("../index.html");
  }).catch(function(error) {
    // An error happened.
    alert(error.message);
  });
}