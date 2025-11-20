🌟 AI Resume Enhancer

An AI-powered tool that analyzes resumes, improves grammar, adds missing keywords, and provides an ATS-friendly optimization score — all through a simple and modern web interface.

🚀 Features
✅ AI-Powered Improvements

Grammar correction

Keyword enhancement

ATS score out of 100

Professional tone & clarity improvement

✅ Resume Upload Support

Upload PDF and DOCX resumes

Backend extracts text automatically

✅ Modern Frontend

Clean UI

Dark mode support

Simple and fast upload experience

✅ Backend API (FastAPI)

Uses OpenAI GPT for analysis

Secure environment handling with .env

Returns rating + improved resume text

🧠 Tech Stack
Frontend

HTML

CSS

JavaScript

Backend

Python

FastAPI

python-docx

PyPDF2

OpenAI API

📂 Project Structure
AI_Resume_Enhancer/
│
├── backend/
│   ├── app.py
│   ├── __init__.py
│   ├── .env.example
│   ├── uploads/
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│
├── README.md
├── LICENSE
└── .gitignore

🔑 Environment Setup

Before running the backend, create a .env file inside the backend folder:

OPENAI_API_KEY=your_api_key_here


(Use .env.example as reference)

⚙️ How to Run the Project
1️⃣ Install dependencies
pip install -r requirements.txt

2️⃣ Start FastAPI backend

Inside the backend folder:

uvicorn app:app --reload


Backend will run at:

http://127.0.0.1:8000

3️⃣ Open the Frontend

Open:

frontend/index.html


Upload your resume → get improved ATS-ready output.

📊 How the AI Enhances Your Resume

The AI model processes:

Experience & achievements

Missing keywords

Weak grammar

Poorly formatted lines

ATS-unfriendly content

It returns:

✔ Improved version
✔ ATS score
✔ Suggestions

🤝 Contributing

Pull requests are welcome.
If you want to improve UI or backend, feel free!

🛡️ License

This project is licensed under the MIT License — free to use & modify.

⭐ Support

If you like this project, please ⭐ star the repository!
