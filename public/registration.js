const form = document.getElementById('registrationForm')
const invalidPassword = document.getElementById('invalidPassword')
const invalidUsername = document.getElementById('invalidUsername')

const onSubmit = async (event) => {
    event.preventDefault();
    invalidUsername.style.display = 'none'
    invalidPassword.style.display = 'none'
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const values = { username, password };
    const response = await fetch('/api/sign-up', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();

    if (data == 'Password is invalid') {
        invalidPassword.style.display = 'block'
    } else if (data == 'Username is invalid') {
        invalidUsername.style.display = 'block'
    } else {
        window.location.href = 'http://localhost:3000/trips'
    }
};

form.addEventListener("submit", onSubmit);