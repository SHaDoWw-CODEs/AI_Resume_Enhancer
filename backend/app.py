from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from openai import OpenAI
import os
from dotenv import load_dotenv
from pathlib import Path

import docx2txt
import fitz   # from pymupdf

# ------------------------------
# Load .env correctly (IMPORTANT)
# ------------------------------
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

# Load API key from environment
api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise Exception("❌ OPENAI_API_KEY not found in .env file!")

client = OpenAI(api_key=api_key)

# ------------------------------
# Initialize FastAPI app
# ------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ------------------------------
# PDF Extract Function
# ------------------------------
def extract_pdf(file_path):
    text = ""
    pdf = fitz.open(file_path)
    for page in pdf:
        text += page.get_text()
    return text


# ------------------------------
# DOCX Extract Function
# ------------------------------
def extract_docx(file_path):
    return docx2txt.process(file_path)


# ------------------------------
# Main API Endpoint
# ------------------------------
@app.post("/enhance")
async def enhance_resume(file: UploadFile = File(...)):

    # Save uploaded file temporarily
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Detect file type
    if file.filename.lower().endswith(".pdf"):
        resume_text = extract_pdf(file_path)
    else:
        resume_text = extract_docx(file_path)

    # AI Prompt
    prompt = f"""
    Improve this resume’s grammar, structure, wording, and add ATS keywords.
    Also rate it out of 100 and list improvements.

    RESUME:
    {resume_text}
    """

    # Call OpenAI API
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )

    return JSONResponse({
        "enhanced": response.output_text
    })
