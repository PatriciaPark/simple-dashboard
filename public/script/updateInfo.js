// Display login user info to edit_user_info.html
function editInfo() {
    fetch('/api/users/' + email)
    .then((response) => response.json())
    .then((data) => {
        // document.getElementById("userFullName").value  = data.username;
        // document.getElementById("userEmail").value  = data.email;
        // document.getElementById("userPassword").value = data.password;
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