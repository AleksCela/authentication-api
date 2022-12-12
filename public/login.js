window.onload = rememberUser()
const form = document.getElementById('loginForm')
const invalidPassword = document.getElementById('invalidPassword')


const onSubmit = async (event) => {
    event.preventDefault();
    invalidPassword.style.display = 'none'
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    localStorage.setItem("username", `${username}`);
    localStorage.setItem("password", `${password}`);
    const values = { username, password };
    const response = await fetch('/api/sign-in', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    localStorage.setItem("id", `${data.id}`);
    if (data == 'Username and password do not match!') {
        invalidPassword.style.display = 'block'
        localStorage.clear()
    } else {
        window.location.pathname = '/trips'
    }
};

async function rememberUser() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    if (username && password) {
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
            window.location.pathname = '/trips'
        }
    }
}






form.addEventListener("submit", onSubmit);