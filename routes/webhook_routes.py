from flask import Blueprint, request, jsonify
from models.event_model import save_event
from datetime import datetime

webhook_bp = Blueprint("webhook", __name__)

@webhook_bp.route("/webhook", methods=["POST"])
def github_webhook():
    payload = request.json
    event_type = request.headers.get("X-GitHub-Event")

    event_data = {
        "event_type": event_type,
        "repo": payload.get("repository", {}).get("full_name"),
        "timestamp": datetime.utcnow()
    }

    if event_type == "push":
        event_data["pusher"] = payload.get("pusher", {}).get("name")

    elif event_type == "pull_request":
        event_data["action"] = payload.get("action")
        event_data["author"] = payload.get("pull_request", {}).get("user", {}).get("login")

    save_event(event_data)
    return jsonify({"status": "received"}), 200