window.onload = redirectIfNotLogged();
const form = document.getElementById("tripsForm");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const destination = formData.get("destination");
    const date = formData.get("date");
    const user_id = localStorage.getItem("id");
    const values = { destination, date, user_id };
    const response = await fetch('/api/trips', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
    window.alert('The trip was created!');
};

function removeLogin() {
    localStorage.clear();
}

function redirectIfNotLogged() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    if (username && password) { }
    else { window.location.pathname = '/loginPage' }
}

form.addEventListener("submit", onSubmit);