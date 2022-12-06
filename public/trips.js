const btn = document.getElementById("btn")
const container = document.getElementById('container')
btn.addEventListener('click', loadTrips)

async function loadTrips() {
    const response = await fetch('/api/trips')
    const data = await response.json()
    console.log(data);
    container.innerHTML = ''
    for (const trip of data) {
        const p = document.createElement('p')
        p.innerText = `Destination: ${trip.destination} , Date:${trip.date} , ID: ${trip.id} `
        container.appendChild(p)
    }
}

loadTrips()