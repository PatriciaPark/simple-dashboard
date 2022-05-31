const email = localStorage.getItem('emailForSignIn');

function emailVerification(email){
    const data = { email: email };
    // update database - email verification(emailVerification= 0 -> 1)
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
    window.localStorage.removeItem('emailForSignIn');
}

window.addEventListener('DOMContentLoaded', function() {
    emailVerification(email);
});