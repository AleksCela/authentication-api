window.onload = redirectIfNotLogged();

let id = document.location.search.replace('?', '');
const container = document.getElementById('container')
const goBackBtn = document.getElementById('go-back')
const form = document.getElementById("updateTripsForm");

goBackBtn.addEventListener('click', (event) => {
    window.location.pathname = '/trips'
})

function loadPage() {
    const header = document.createElement('h1')
    header.innerText = `You are updating the trip with ID: ${id}`
    container.appendChild(header)
}

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const destination = formData.get("destination");
    const date = formData.get("date");
    const values = { destination, date };
    console.log(JSON.stringify(values));
    console.log(values);
    const response = await fetch(`/api/trips/${id}`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })

    const data = await response.json();
    console.log(data);
};

function redirectIfNotLogged() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    if (username && password) { }
    else { window.location.pathname = '/loginPage' }
}

form.addEventListener("submit", onSubmit);
loadPage();