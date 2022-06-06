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

function getUserData() {
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
    var allUserCnt = document.getElementById("allUserCnt");
    // All users info
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

function countVisitors() {
    var todayCnt = document.getElementById("todayCnt");
    var avgCnt = document.getElementById("avgCnt");
    fetch('/api/users/count/')
        .then((response) => response.json())
        .then((data) => {
            todayCnt.innerHTML = data[0];
            avgCnt.innerHTML = data[1];
        })
        .catch((error) => {
        console.error('Fail to Get Count Visitors:', error);
    });
}

// // 오늘의 방문자 수 cookie
// function countVisitors() {
//     var todayCnt = document.getElementById("todayCnt");
//     var avgCnt = document.getElementById("avgCnt");

//     var expireDate = new Date  // 현재의 날짜 객체를 생성 
//     expireDate.setMinutes(expireDate.getMinutes()+30)  // 현재 시간에 30분을 더함. 쿠키의 유효기간 설정.(현재~30분) 
//     hitCt = eval(cookieVal("pageHit"))  // 방문 카운트 변수이며 cookieVal 함수를 실행. 
//     hitCt++  // 방문 카운트 +1
//     document.cookie = "pageHit="+hitCt+";expires=" + expireDate.toGMTString() // 이곳에서 쿠키를 갱신.
//     todayCnt.innerHTML = hitCt;
    
//     function cookieVal(cookieName) {  // cookieVal 함수를 선언함.   
//         thisCookie = document.cookie.split("; ")  // 쿠키의 문자열 구조가 '쿠키명=쿠키값; expires=유효기간' 이기 때문에 먼저 세미콜론(;)으로 나눔.(split) 
//         for (i=0; i<thisCookie.length; i++) { // ; 으로 나눈 만큼 반복문을 실행. 여기서는 2번을 반복함.   
//             if (cookieName == thisCookie[i].split("=")[0]) {  // 먼저 thisCookie[i].split("=")[0]은 '쿠키명=쿠키값' 구조에서 =으로 나눈 배열의 첫번째 값을 지칭함(쿠키명). 
//                     return thisCookie[i].split("=")[1]  // thisCookie[i].split("=")[1] 은 =으로 나눈 배열의 두번째 값.(쿠키값) 
//             }   
//         }   
//         return 0   
//     }   
// }

window.addEventListener('DOMContentLoaded', function() {
    if(email) emailVerification(email);
    getUserData();
    getAllUsers();
    countVisitors();
});