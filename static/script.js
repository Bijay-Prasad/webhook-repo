async function fetchEvents() {
    try {
        const res = await fetch("/events");
        const data = await res.json();

        const list = document.getElementById("events-container");
        list.innerHTML = "";

        if (data.length === 0) {
            list.innerHTML = `
                <li class="empty-state">
                    <i class="fas fa-inbox fa-3x" style="color: var(--text-secondary); opacity: 0.5;"></i>
                    <p style="margin-top: 1rem;">No events received yet.</p>
                </li>`;
            return;
        }

        data.forEach(e => {
            const li = document.createElement("li");
            li.className = "event-card";

            const iconClass = getEventIcon(e.event_type);
            const timeAgo = timeSince(new Date(e.timestamp));
            
            let details = "";
            if (e.event_type === "push") {
                details = `<span class="event-actor">${e.pusher || 'Unknown'}</span> pushed to <span class="event-repo">${e.repo}</span>`;
            } else if (e.event_type === "pull_request") {
                details = `<span class="event-actor">${e.author || 'Unknown'}</span> ${e.action || 'acted on'} PR in <span class="event-repo">${e.repo}</span>`;
            } else {
                details = `${e.event_type} event in <span class="event-repo">${e.repo}</span>`;
            }

            li.innerHTML = `
                <div class="event-icon-wrapper">
                    <i class="${iconClass}"></i>
                </div>
                <div class="event-content">
                    <div class="event-header">
                        <span class="event-type">${formatEventType(e.event_type)}</span>
                        <span class="event-time">${timeAgo}</span>
                    </div>
                    <div class="event-details">
                        ${details}
                    </div>
                </div>
            `;
            list.appendChild(li);
        });
    } catch (err) {
        console.error("Error fetching events:", err);
    }
}

function getEventIcon(type) {
    if (type === "push") return "fas fa-code-branch icon-push";
    if (type === "pull_request") return "fas fa-code-pull-request icon-pr";
    if (type === "issues") return "fas fa-exclamation-circle icon-issue";
    if (type === "delete") return "fas fa-trash-alt icon-delete";
    return "fas fa-history"; // Default
}

function formatEventType(type) {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

function timeSince(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
}

setInterval(fetchEvents, 5000);
fetchEvents();