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
  var userPasswordFormate = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;      
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
    var userPasswordFormate = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;      
  
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

        fetch('/api/users/create', {
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
  var userSIPasswordFormate = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;      

  var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
  var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

  if(checkUserEmailValid == null){
      document.getElementById("userSIEmail").focus();
      alert("Please check your Email Address");
      return checkUserSIEmail();
  }else if(checkUserPasswordValid == null){
        alert("Wrong Email or Passwords");
      return checkUserSIPassword();
  }else{
    // Check Passwords
    fetch('/api/users/select', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: userSIEmail, password: userSIPassword}),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message) {
            alert('Wrong Email or Passwords');
        } else {
            // Check email verification
            fetch('/api/users/email/'+ userSIEmail)
            .then((response) => response.json())
            .then((data) => {
                alert("**********************script email: " + userSIEmail+" "+data.message + " " + data.json() + " " + data.answer);
                sessionStorage.setItem('userSIEmail', userSIEmail);
                if(data.message){
                    // Not verified email yet : emailVerification=0
                    window.location.replace("./views/email_verification.html");
                } else {
                    // Already verified email : emailVerification=1
                    // update database - login count(loginCnt), last session(lastSession)
                    var dataCnt = { email: userSIEmail, loginCnt: 'loginCnt+1' };
                    fetch('/api/users/count/'+ userSIEmail, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataCnt),
                    })
                    .then((response) => response.json())
                    .then((json) => {
                        console.log('Success Count:', json);
                    })
                    .catch((error) => {
                        console.error('Fail to Count:', error);
                    })

                    window.location.replace("./views/dashboard.html");
                }
            })
            .catch((error) => {
            console.error('Fail to Get User:', error);
            })
        }
    })
  }
}
// Save profile and update database
function saveProfile(){
  let userFullName = document.getElementById("userFullName").value;
  var userEmail = document.getElementById("userEmail").value;
//   var userPassword = document.getElementById("userPassword").value;
  var userFullNameFormate = /^([A-Za-z.\s_-])/; 
  var checkUserFullNameValid = userFullName.match(userFullNameFormate);

  var data = { username:userFullName, email: userEmail };
  if(checkUserFullNameValid == null){
      return checkUserFullName();
  }else{
    fetch('/api/users/'+ userEmail, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((json) => {
        alert("Edit Profile Successful.");
        window.location.replace("./dashboard.html");
        // let user = firebase.auth().currentUser;
        // let uid;
        // if(user != null){
        //     uid = user.uid;
        // }
        // var firebaseRef = firebase.database().ref();
        // var userData = {
        //     userFullName: userFullName,
        // }
        // firebaseRef.child(uid).set(userData);
        console.log('Success update username:', json);
    })
    .catch((error) => {
        console.error('Fail to update username:', error);
    })
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
    var email = sessionStorage.getItem('userSIEmail');
    var userOldPassword = document.getElementById("userOldPassword").value;
    var userPassword = document.getElementById("userPassword").value;
    var userConfirmPassword = document.getElementById("userConfirmPassword").value;
    var userPasswordFormate = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);
    if(checkUserPasswordValid == null){
        document.getElementById("userPassword").focus();
        return checkUserPassword();
    }else if(userConfirmPassword == null){
        document.getElementById("userConfirmPassword").focus();
      return checkUserConfirmPassword();
    }else{
        // Check Old Passwords
        fetch('/api/users/select', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: userOldPassword}),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                // Not match old password
                console.log("***************data.message: " + data.message);
                alert('Please check your previous passwords.');
                document.getElementById("userOldPassword").focus();
            } else {
                // Match old password
                // Update New Password
                var data = { email: email, password: userPassword };
                fetch('/api/users/pwd/'+ email, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((json) => {
                    alert("Reset passwords successful.");
                    window.location.replace("./dashboard.html");
                })
                .catch((error) => {
                    console.error('Fail to update password:', error);
                })
            }
        })
    }
}
// Working For Sign Out
function signOut(){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.localStorage.removeItem('emailForSignIn');
    sessionStorage.removeItem('userSIEmail');
    window.location.replace("../index.html");
  }).catch(function(error) {
    // An error happened.
    alert(error.message);
  });
}
// Delete User
function deleteUser() {
    var email = document.getElementById("userEmail").value;
    var user = firebase.auth().currentUser;
    // const user = auth.currentUser;
    // Confirm: Are you sure?
    var answer = confirm("Are you sure?")
	if (answer){
		fetch('/api/users/'+ email, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
        .then((response) => response.json())
        .then((json) => {
            console.log('Success Delete User:', json);
            window.location.replace("../index.html");
            user.delete().then(() => {
                // User deleted.
            }).catch((error) => {
                console.error('Fail to Delete User from firebase:', error);
            });
        })
        .catch((error) => {
            console.error('Fail to Delete User:', error);
        })
	}
	else{
		alert("Thanks for sticking around!");
	}
}