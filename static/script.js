async function fetchEvents() {
    const res = await fetch("/events");
    const data = await res.json();

    const list = document.getElementById("events");
    list.innerHTML = "";

    data.forEach(e => {
        const li = document.createElement("li");
        li.textContent = `${e.event_type} in ${e.repo} at ${e.timestamp}`;
        list.appendChild(li);
    });
}

setInterval(fetchEvents, 10000);
fetchEvents();