import os
from flask import Flask, render_template
from flask_cors import CORS
from routes.webhook_routes import webhook_bp
from routes.event_routes import event_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(webhook_bp)
app.register_blueprint(event_bp)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))