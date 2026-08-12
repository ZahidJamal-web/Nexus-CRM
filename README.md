# 🤖 AI-Powered CRM Dashboard

A modern, full-stack **AI-powered Customer Relationship Management (CRM)** platform built with the **MERN stack**, **Tailwind CSS**, and **Google Gemini AI**.

The application helps businesses manage leads, track sales pipelines, analyze performance, and use AI to generate insights and professional sales communication.

---

## 🚀 Features

### 🔐 Authentication & Security

* Secure user registration and login
* JWT-based authentication
* Password hashing with bcrypt
* Protected API routes
* Role-based access control

### 👥 Lead Management

* Create, update, and delete leads
* Search and filter leads
* Sort leads by relevant fields
* Track lead status and priority
* Manage lead sources
* Export leads to CSV

### 📊 Sales Pipeline

* Interactive Kanban-style sales pipeline
* Drag-and-drop lead management
* Pipeline stages
* Persistent database updates
* Track deal values and sales progress

### 🧠 AI-Powered Features

Powered by **Google Gemini AI**.

#### AI Lead Summary

Generate intelligent summaries for individual leads, including:

* Lead overview
* Potential opportunities
* Key concerns
* Recommended actions
* AI-generated risk score from 0–100

#### ✉️ AI Email Generator

Generate professional sales emails based on:

* Lead information
* Email purpose
* Communication tone
* Sales context

#### 📈 AI Pipeline Insights

Analyze the current sales pipeline and receive actionable AI recommendations to:

* Identify potential risks
* Find high-value opportunities
* Improve conversion strategies
* Prioritize leads
* Optimize the sales pipeline

### 📊 Dashboard Analytics

Track important CRM metrics through interactive dashboards:

* Total leads
* Revenue
* Pipeline value
* Conversion rate
* Lead sources
* Sales performance
* Pipeline health

Charts and visualizations are powered by **Recharts**.

### 📱 Responsive UI

* Fully responsive design
* Desktop and mobile friendly
* Modern dashboard interface
* Tailwind CSS styling
* Clean component-based architecture

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Tailwind CSS v4
* React Router
* Recharts
* DND Kit
* Axios
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* REST API

### AI

* Google Gemini API
* Gemini SDK

### Development Tools

* Git
* GitHub
* VS Code
* Nodemon
* npm

---

## 🏗️ Project Architecture

```text
AI-CRM-Dashboard/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-crm-dashboard.git
```

Navigate into the project:

```bash
cd ai-crm-dashboard
```

---

### 2. Setup Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your_gemini_model

CLIENT_URL=http://localhost:5173
```

Start the backend development server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:8000
```

---

### 3. Setup Frontend

Open a new terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file if required:

```env
VITE_API_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

| Variable         | Description                            |
| ---------------- | -------------------------------------- |
| `PORT`           | Backend server port                    |
| `MONGODB_URI`    | MongoDB connection string              |
| `JWT_SECRET`     | Secret key used for JWT authentication |
| `JWT_EXPIRES_IN` | JWT expiration duration                |
| `GEMINI_API_KEY` | Google Gemini API key                  |
| `GEMINI_MODEL`   | Gemini model to use                    |
| `CLIENT_URL`     | Frontend application URL               |

### Frontend

| Variable       | Description     |
| -------------- | --------------- |
| `VITE_API_URL` | Backend API URL |

> ⚠️ Never commit your `.env` files or API keys to GitHub.

Add them to `.gitignore`:

```gitignore
node_modules/
.env
.env.local
dist/
build/
```

---

## 🔄 Application Flow

```text
                ┌─────────────────────┐
                │     React Client    │
                │   Tailwind CSS UI   │
                └──────────┬──────────┘
                           │
                           │ REST API
                           ▼
                ┌─────────────────────┐
                │   Express Backend   │
                │   Authentication    │
                │   Business Logic    │
                └───────┬───────┬─────┘
                        │       │
              ┌─────────┘       └──────────┐
              ▼                            ▼
      ┌───────────────┐            ┌───────────────┐
      │    MongoDB    │            │  Gemini AI    │
      │   Database    │            │ AI Services   │
      └───────────────┘            └───────────────┘
```

---

## 📌 Main CRM Modules

```text
Dashboard
   │
   ├── Analytics
   │
   ├── Leads
   │     ├── Create Lead
   │     ├── Edit Lead
   │     ├── Delete Lead
   │     ├── Search
   │     ├── Filter
   │     └── CSV Export
   │
   ├── Sales Pipeline
   │     ├── New
   │     ├── Contacted
   │     ├── Qualified
   │     ├── Proposal
   │     ├── Won
   │     └── Lost
   │
   └── AI Tools
         ├── Lead Summary
         ├── Email Generator
         └── Pipeline Insights
```

---

## 🧠 AI Integration

The CRM uses Google Gemini to provide intelligent sales assistance.

### Lead Analysis

```text
Lead Data
   ↓
Gemini AI
   ↓
Lead Summary
   ↓
Risk Score
   ↓
Recommended Actions
```

### AI Email Generation

```text
Lead Information
       +
Email Purpose
       +
Communication Tone
       ↓
   Gemini AI
       ↓
Professional Sales Email
```

### Pipeline Analysis

```text
CRM Pipeline Data
       ↓
   Gemini AI
       ↓
Business Analysis
       ↓
Risks + Opportunities
       ↓
Actionable Recommendations
```

---

## 📊 Example Dashboard Metrics

The dashboard can provide insights such as:

```text
Total Leads        → 245
Pipeline Value     → $125,000
Won Deals          → 42
Conversion Rate    → 17.1%
High Risk Leads    → 18
```

---

## 🔒 Security

The application implements several security practices:

* JWT authentication
* bcrypt password hashing
* Protected API endpoints
* Environment-based secrets
* Role-based authorization
* CORS configuration
* Input validation
* Secure database access

---

## 🧪 Development

Run the backend:

```bash
cd backend
npm run dev
```

Run the frontend:

```bash
cd frontend
npm run dev
```

For production builds:

```bash
npm run build
```

---

## 🚀 Future Improvements

* [ ] Real-time notifications
* [ ] WebSocket-based live pipeline updates
* [ ] Advanced role and permission management
* [ ] CRM activity timeline
* [ ] Automated follow-up reminders
* [ ] AI-powered lead scoring
* [ ] AI sales forecasting
* [ ] Advanced reporting
* [ ] PDF report generation
* [ ] Email integration
* [ ] Calendar integration
* [ ] Team collaboration
* [ ] Docker deployment
* [ ] CI/CD pipeline
* [ ] Cloud deployment
* [ ] Automated testing

---

## 🌐 Deployment

The application can be deployed using services such as:

### Frontend

* Vercel
* Netlify

### Backend

* Render
* Railway
* AWS
* Azure

### Database

* MongoDB Atlas

---

## 📸 Screenshots

Add screenshots of your application here:

```text
/screenshots/
├── dashboard.png
├── leads.png
├── pipeline.png
├── lead-details.png
└── ai-insights.png
```

Example:

```markdown
![Dashboard](./screenshots/dashboard.png)
```

---

## 🎯 Learning Objectives

This project demonstrates practical experience with:

* Full-stack MERN development
* REST API development
* MongoDB database design
* JWT authentication
* Secure password management
* React application architecture
* Drag-and-drop interfaces
* Data visualization
* AI API integration
* Gemini prompt engineering
* Environment configuration
* Git and GitHub workflows
* Production-ready application architecture

---

## 👨‍💻 Author

**Zahid Jamal**

Software Developer | Full-Stack Developer | Cloud & AI Enthusiast

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.
