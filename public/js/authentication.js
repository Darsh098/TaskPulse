const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (() => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (() => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
});
signupLink.onclick = (() => {
    signupBtn.click();
    return false;
});

// Notification
function clearForm() {
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

// Function to display an error message for 5 seconds
function displayErrorMessage(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.innerText = message;
    errorElement.style.display = 'block';

    setTimeout(() => {
        errorElement.innerText = '';
        errorElement.style.display = 'none';
    }, 5000);
}

const loginSubmit = document.getElementById('loginSubmit');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
loginSubmit.addEventListener('click', buttonClickHandler);

function buttonClickHandler(event) {
    event.preventDefault();
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail.value, password: loginPassword.value }) // Your POST data
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.message;
            }
            else {
                clearForm();
                displayErrorMessage(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}