# GitHub Webhook Dashboard

A powerful, modern dashboard to visualize GitHub repository events in real-time. Built with **Flask**, **MongoDB**, and a premium **Vanilla CSS** frontend featuring glassmorphism and smooth animations.

## 🚀 Features

- **Real-time Monitoring**: Automatically fetches and displays new GitHub events every 5 seconds.
- **Premium UI**: 
  - Dark mode aesthetic with deep slate/blue gradients.
  - Glassmorphic event cards with blur effects.
  - Interactive hover states and fluid animations.
- **Auto-Formatting**:
  - Dynamic icons for different event types (Push, PR, Issues).
  - Relative timestamps (e.g., "5m ago").
  - Rich formatting for committers and repository names.
- **Robust Backend**: Stores all webhook payloads in MongoDB for persistence.

## 🛠️ Tech Stack

- **Backend**: Python, Flask, PyMongo
- **Database**: MongoDB
- **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **Fonts**: Google Fonts (Outfit)
- **Icons**: FontAwesome

## ⚙️ Installation

### 1. Clone the Repository
```bash
git clone <repository_url>
cd webhook-repo
```

### 2. Set Up Virtual Environment
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configuration
Create a `.env` file in the root directory and add your MongoDB connection string. You can use a local instance or MongoDB Atlas.

```ini
MONGO_URI=mongodb://localhost:27017/github_events
PORT=5000
```

## 🏃‍♂️ Usage

### Start the Server
```bash
python app.py
```
The server will start on `http://localhost:5000`.

### Setup GitHub Webhook
1. Go to your GitHub Repository Settings -> **Webhooks**.
2. Click **Add webhook**.
3. **Payload URL**: `http://<your-public-ip-or-ngrok>/webhook`
   - *Note: For local development, use [ngrok](https://ngrok.com/) to expose your local server.*
   - Example: `ngrok http 5000` -> `https://a1b2.ngrok.io/webhook`
4. **Content type**: `application/json`.
5. **Events**: Select "Send me everything" or specific events like Pushes and Pull Requests.

### View Events
Open your browser to `http://localhost:5000`. As webhooks arrive, they will appear instantly on the dashboard with a smooth slide-in animation.

## 📂 Project Structure

```
webhook-repo/
├── app.py              # Application entry point
├── config.py           # Environment configuration
├── models/             # Database models
├── routes/             # API routes (webhooks & events)
├── static/             # CSS and JavaScript assets
│   ├── style.css       # Premium dark mode styles
│   └── script.js       # Dynamic DOM manipulation
├── templates/          # HTML templates
│   └── index.html      # Main dashboard view
└── requirements.txt    # Python dependencies
```

## 🤝 Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---
*Designed with ❤️ for Developers*