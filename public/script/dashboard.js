const email = localStorage.getItem('emailForSignIn');

function emailVerification(email){
    const data = { email: email };
    // update database - email verification(emailVerification= 0 -> 1)
    fetch('/api/users/verificationData', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
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
    emailVerification(email);
});