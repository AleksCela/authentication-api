window.onload = redirectIfNotLogged();
const btn = document.getElementById("btn")
const container = document.getElementById('container')
btn.addEventListener('click', loadTrips)
const tableBody = document.getElementById('tableBody')

async function loadTrips() {
    const response = await fetch('/api/trips')
    const data = await response.json()
    tableBody.innerHTML = ('')
    const currentlyLoggedId = localStorage.getItem('id')
    for (const trip of data) {
        console.log(currentlyLoggedId, trip.user_id);
        if (currentlyLoggedId == trip.user_id) {
            const tr = document.createElement('tr')
            tableBody.appendChild(tr)
            for (const key in trip) {
                if (key == "user_id") { continue }
                const td = document.createElement('td')
                td.innerText = trip[key]
                tr.appendChild(td)
            }
            const btnRemoveRow = document.createElement('td')
            const btnUpdateRow = document.createElement('td')
            tr.appendChild(btnRemoveRow)
            tr.appendChild(btnUpdateRow)
            const btnRemove = document.createElement('button')
            const btnUpdate = document.createElement('button')
            btnRemove.className = 'btn removeBtn btn-danger'
            btnUpdate.className = 'btn updateBtn btn-outline-success'
            btnRemove.setAttribute(`id`, `${trip.id}`)
            btnUpdate.setAttribute(`id`, `${trip.id}`)
            btnRemove.innerText = 'Remove'
            btnUpdate.innerText = 'Update'
            btnRemoveRow.appendChild(btnRemove)
            btnUpdateRow.appendChild(btnUpdate)
            btnRemove.addEventListener('click', async (event) => {
                await fetch(`/api/trips/${trip.id}`, {
                    method: 'DELETE'
                }); loadTrips()
            })
            btnUpdate.addEventListener('click', (event) => {
                window.location.href = `http://localhost:3000/updateTrips?${trip.id}`
            })
        }
    }
}

function removeLogin() {
    localStorage.clear();
}
function redirectIfNotLogged() {
    const username = localStorage.getItem("username")
    const password = localStorage.getItem("password")
    if (username && password) { }
    else { window.location.pathname = '/loginPage' }
}


loadTrips()
