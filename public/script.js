console.clear();

const form = document.getElementById("tripsForm");

const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const destination = formData.get("destination");
    const date = formData.get("date");
    const days = formData.get('number')
    const values = { destination, date, days };
    const response = await fetch('/api/trips', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(values)
    })
    const data = await response.json();
    console.log(data);
};

form.addEventListener("submit", onSubmit);