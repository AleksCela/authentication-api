let id = document.location.search.replace('?', '');
const container = document.getElementById('container')
const goBackBtn = document.getElementById('go-back')
const form = document.getElementById("updateTripsForm");

goBackBtn.addEventListener('click', (event) => {
    window.location.href = 'http://localhost:3000/trips'
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
form.addEventListener("submit", onSubmit);
loadPage();