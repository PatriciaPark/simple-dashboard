function emailVerification(){
    // update database - email verification(emailVerification= 0 -> 1)
    const email = sessionStorage.getItem('emailForSignIn');
    var data = { email: email };
    fetch('/api/users/verificationData', {
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
    console.log("Auth Result: " + authResult);
    return true;
}

window.addEventListener('DOMContentLoaded', function() {
    emailVerification();
});