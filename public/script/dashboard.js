let email = localStorage.getItem('emailForSignIn');

function emailVerification(email){
    let data = { email: email, emailVerification: 1 };
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
        console.error('Fail to Get All Users:', error);
    });
}

function getUserData(data) {
    if (email == null) {
        email = sessionStorage.getItem('userSIEmail');
    }
    fetch('/api/users/' + email)
        .then((response) => response.json())
        .then((data) => {
            var userName = document.getElementById("username");
            // Login user info
            var div = document.createElement("div");
            div.innerHTML = data.username;
            userName.appendChild(div);
        })
        .catch((error) => {
        console.error('Fail to Get User data:', error);
    });
}

function appendData(data) {
    var dataList = document.getElementById("dataList");
    var div = document.createElement("div");
    div.setAttribute("class", "grid-item");
    // All users info
    if(data.length) {
        for(var i = 0; i< data.length; i++) {
            div.appendChild(data[i].id);
            div.appendChild(data[i].username);
            div.appendChild(data[i].email);
            div.appendChild(data[i].createdAt);
            div.appendChild(data[i].loginCnt);
            div.appendChild(data[i].lastSession);
            
            dataList.appendChild(div);
        }
    } else {
        div.innerHTML = "No Data Availed";
    } 
}

window.addEventListener('DOMContentLoaded', function() {
    if(email) emailVerification(email);
    getUserData();
    getAllUsers();
    // , document.getElementById("btnUserInfo").addEventListener("click")
});