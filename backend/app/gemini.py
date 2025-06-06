import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

# Real summary + estimated token usage
def generate_summary_and_stats(text):
    try:
        prompt = f"Summarize this research paper in a clear and concise manner:\n\n{text}"
        response = model.generate_content(prompt)
        summary = response.text.strip()
        tokens_used = len(summary.split()) * 1.2  # estimate
        return summary, tokens_used, calculate_readability(summary)
    except Exception as e:
        print("Error during summary:", e)
        return "Summary failed.", 0, 0.0

# Real question-answer
def answer_question(context, question):
    try:
        prompt = f"Based on this paper:\n\n{context}\n\nAnswer the following question:\n{question}"
        response = model.generate_content(prompt)
        answer = response.text.strip()
        tokens_used = len(answer.split()) * 1.2
        return answer, tokens_used
    except Exception as e:
        print("Error during answering:", e)
        return "Answer failed.", 0.0

# Realistic readability (Flesch-Kincaid basic)
def calculate_readability(text):
    words = len(text.split())
    sentences = text.count('.') + text.count('!') + text.count('?')
    syllables = sum(len([char for char in word if char in "aeiouAEIOU"]) for word in text.split())

    if words == 0 or sentences == 0:
        return 0.0
    score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    return round(score, 2)
