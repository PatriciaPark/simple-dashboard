let email = sessionStorage.getItem('userSIEmail'); 
let emailForSignIn = localStorage.getItem('emailForSignIn');    // from email.js

// Update database - email verification(emailVerification= 0 -> 1).
function emailVerification(email){
    let data = { email: email, emailVerification: 1 };
    fetch('/api/users/email/'+ email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success Email Verification:', data);
        })
        .catch((error) => {
            console.error('Fail to Email Verification:', error);
    });
}
// Get All users infomation.
function getAllUsers(){
    fetch('/api/users/')
        .then((response) => response.json())
        .then((data) => {
            appendData(data);
        })
        .catch((error) => {
        console.error('Fail to Get All Users:', error);
    });
}
// Login user info for display profile.
function getUserData(emailForSignIn) {
    if (emailForSignIn == null) {
        emailForSignIn = sessionStorage.getItem('userSIEmail');
    }
    fetch('/api/users/' + emailForSignIn)
        .then((response) => response.json())
        .then((data) => {
            var userName = document.getElementById("username");
            var div = document.createElement("div");
            div.innerHTML = data.username;
            userName.appendChild(div);
        })
        .catch((error) => {
        console.error('Fail to Get User data:', error);
    });
}
// All users info for display board.
function appendData(data) {
    var dataList = document.getElementById("dataList");
    var allUserCnt = document.getElementById("allUserCnt");
    if(data.length) {
        allUserCnt.innerHTML = data.length;
        for(var i = 0; i< data.length; i++) {
            var result = '';
            result += '<div class="grid-item">' + data[i].id + '</div>';
            result += '<div class="grid-item">' + data[i].username + '</div>';
            result += '<div class="grid-item">' + data[i].email + '</div>';
            result += '<div class="grid-item">' + data[i].createdAt + '</div>';
            result += '<div class="grid-item">' + data[i].loginCnt + '</div>';
            result += '<div class="grid-item">' + data[i].lastSession + '</div>';
            dataList.innerHTML += result;
        }
    } else {
        div.innerHTML = "No Data Availed";
    } 
}
// Count visitors(for today, a week).
function countVisitors() {
    var todayCnt = document.getElementById("todayCnt");
    var avgCnt = document.getElementById("avgCnt");
    fetch('/api/users/count')
        .then((response) => response.json())
        .then((data) => {
            todayCnt.innerHTML = data[0].visitors;
            avgCnt.innerHTML = data[1].visitors;
        })
        .catch((error) => {
        console.error('Fail to Get Count:', error);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    if(emailForSignIn) emailVerification(emailForSignIn);
    getUserData(emailForSignIn);
    getAllUsers();
    countVisitors();
});