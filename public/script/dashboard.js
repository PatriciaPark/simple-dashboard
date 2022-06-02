const email = localStorage.getItem('emailForSignIn');

function emailVerification(email){
const data = { email: email, emailVerification: 1 };
// update database - email verification(emailVerification= 0 -> 1)
fetch('/api/users/verificationData/'+ email, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success Email Verification:', data);
        userData(data);
    })
    .catch((error) => {
        console.error('Fail to Email Verification:', error);
    });
}

function getAllUsers(){
    // Get All users infomation
    fetch('/api/users/')
        .then((response) => response.json())
        .then((data) => {
            appendData(data);
        })
        .catch((error) => {
        console.error('Fail to Get User:', error);
    });
}

function userData(data) {
    var userName = document.getElementById("username");
    // Login user info
    var div = document.createElement("div");
    div.innerHTML = data.username;
    userName.appendChild(div);
    // remove email from local storage
    // window.localStorage.removeItem('emailForSignIn');
}

function appendData(data) {
    var dataList = document.getElementById("dataList");
    // All users info
    if(data.length) {
        var div = document.createElement("div").setAttribute("class", "grid-item");
        for(var i = 0; i< data.length; i++) {
            div.innerHTML = data[i].id + data[i].username + data[i].email + data[i].createdAt + data[i].loginCnt + data[i].lastSession
            // div.innerHTML = data[i].id;
            // div.innerHTML = data[i].username;
            // div.innerHTML = data[i].email;
            // div.innerHTML = data[i].createdAt;
            // div.innerHTML = data[i].loginCnt;
            // div.innerHTML = data[i].lastSession;
            
            dataList.appendChild(div);
        }
    } else {
        div.innerHTML = "No Data Availed";
    } 
}

window.addEventListener('DOMContentLoaded', function() {
    emailVerification(email)
    , getAllUsers()
    // , document.getElementById("btnUserInfo").addEventListener("click")
});