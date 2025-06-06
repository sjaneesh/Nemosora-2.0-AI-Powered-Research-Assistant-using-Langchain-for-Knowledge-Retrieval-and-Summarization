# Nemosora 2.0 — AI-Powered Research Assistant  
## Recall. Refine. Radiate. ✨  
https://github.com/sjaneesh/Nemosora-2.0-AI-Powered-Research-Assistant-using-Langchain-for-Knowledge-Retrieval-and-summarization

---

### 🔍 What is Nemosora?

**Nemosora 2.0** is an AI-powered research assistant designed to help  
**researchers, students, and professionals** search, understand, and summarize academic papers with clarity and depth.  

Powered by **LangChain**, **Gemini API**, and **ChromaDB** for intelligent semantic search,  
Nemosora doesn’t just search — it *understands*.

---

### 🎯 Core Features

- 🔎 **Context-Aware Semantic Search**  
  Search by meaning, not just keywords. Retrieve the most relevant preloaded research paper.

- 📄 **Readable Paper Viewer**  
  Academic-style document view in A4 layout with clean formatting.

- 🧠 **Insightful Summaries**  
  Summarizes the entire paper on demand using Gemini API.

- ❓ **Smart Question-Answering**  
  Ask follow-up questions about the retrieved paper.

- 📊 **Readability & Token Tracking**  
  Displays how readable a response is + estimated token usage.

- 🔐 **Google OAuth Login**  
  Secure user login for personalized experience.

- 🗃️ **Admin Query Logs**  
  Admin-only route to view all user queries, tokens, and activity.

---

### 🏗️ Tech Stack

```
Frontend   → React + Vite + TypeScript + TailwindCSS  
Backend    → Python + Flask  
AI Engine  → Gemini 2.0 Flash API (Google Generative AI)  
Search     → Keyword & Semantic Matching via LangChain + ChromaDB (for semantic search)
Embeddings → Vector Embeddings (for meaning-based document retrieval)
Database   → SQLite  
Auth       → Google OAuth
```

---

### 🚀 Running the Project Locally

#### 1. Clone the repository

```
git clone https://github.com/sjaneesh/Nemosora-2.0-AI-Powered-Research-Assistant-using-Langchain-for-Knowledge-Retrieval-and-summarization.git
cd Nemosora-2.0
```

#### 2. Start the Backend Server (Flask)

```
cd backend
python -m venv .venv
.\.venv\Scripts\activate       # On Windows
pip install -r requirements.txt
python main.py                 # Runs backend on http://localhost:5000
```
#### 3. Start the Frontend (React)

```
cd ../frontend
npm install
npm run dev                    # Runs frontend on http://localhost:8080
```
> ✅ Now open your browser and visit: `http://localhost:8080` in your web browser

---

### 📁 Folder Structure

Nemosora-2.0/
├── backend/              # Flask backend
│   ├── app/              # API routes, utils, db logic
│   ├── research_data/    # Preloaded academic papers (.txt)
│   ├── templates/        # HTML template for A4-style view
│   └── main.py           # Flask entry point
│
├── frontend/             # React frontend (Lovable UI)
│   ├── src/              # Components, pages, routes
│   ├── public/           # Static assets
│   └── index.html
│
└── README.md             # This file!

---

### 🚀 Future Scope & Ideas

- ✅ Upload feature (PDF, DOCX, TXT) with direct summarization
- 📌 Real-time citation generation and source linking
- 📊 Trend detection from user queries and research data
- 🧠 Multi-modal AI integration (images + text) for future research exploration
- 🏫 Institution-ready local deployments – search internal libraries for papers
- 🌐 API-level access for integration into LMS platforms or researcher portals
- 🔐 OAuth-based personalization with user dashboards and search history
- 🎨 Theme switching: Dark/Light modes for better UX

---

### ✨ Author

Built with ❤️ by **Aneesh Shaji**

> Let's make research *smarter*, not harder.

GitHub: [@sjaneesh](https://github.com/sjaneesh)
LinkedIn: [@aneesh-shaji](https://www.linkedin.com/in/aneesh-shaji/)
