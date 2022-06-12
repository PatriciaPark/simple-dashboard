let email = sessionStorage.getItem('userSIEmail');
if(email == null) {
    email = localStorage.getItem('emailForSignIn');
    if(email == null) {
        email = sessionStorage.getItem('emailForAuth');
    }
}

// Display login user info to edit_user_info.html
function editInfo() {
    fetch('/api/users/' + email)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById("userFullName").setAttribute("value", data.username);
        document.getElementById("userEmail").setAttribute("value", data.email);
    })
    .catch((error) => {
    console.error('Fail to Get User data:', error);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    editInfo();
});