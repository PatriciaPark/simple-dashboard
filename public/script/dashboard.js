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
        })
        .catch((error) => {
            console.error('Fail to Email Verification:', error);
    });
    window.localStorage.removeItem('emailForSignIn');
}

window.addEventListener('DOMContentLoaded', function() {
    emailVerification(email)
    // , document.getElementById("btnUserInfo").addEventListener("click")
});