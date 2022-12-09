const form = document.getElementById('loginForm')
const invalidPassword = document.getElementById('invalidPassword')

const onSubmit = async (event) => {
    event.preventDefault();
    invalidPassword.style.display = 'none'
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const values = { username, password };
    const response = await fetch('/api/sign-in', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
    if (data == 'Username and password do not match!') {
        invalidPassword.style.display = 'block'
    } else {
        window.location.href = 'http://localhost:3000/trips'
    }

};

form.addEventListener("submit", onSubmit);