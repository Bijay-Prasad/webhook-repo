from flask import Blueprint, jsonify
from models.event_model import get_recent_events

event_bp = Blueprint("events", __name__)

@event_bp.route("/events", methods=["GET"])
def fetch_events():
    events = get_recent_events()
    for e in events:
        e["_id"] = str(e["_id"])
    return jsonify(events)