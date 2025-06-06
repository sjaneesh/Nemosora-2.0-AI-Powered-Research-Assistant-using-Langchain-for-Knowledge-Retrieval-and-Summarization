import os
import sqlite3
from flask import Blueprint, request, jsonify
from app.utils import find_best_matching_file, read_file_content
from app.readability import calculate_readability
from app.gemini import generate_summary_and_stats, answer_question
from app.dblogger import log_query

routes_bp = Blueprint("routes", __name__)
RESEARCH_FOLDER = "research_data"
DB_PATH = "db.sqlite3"

@routes_bp.route("/search", methods=["POST"])
def search_paper():
    data = request.get_json()
    query = data.get("query", "").strip()
    user = data.get("user", "anonymous")

    if not query:
        return jsonify({"error": "Empty query"}), 400

    best_match_path, best_match_title = find_best_matching_file(RESEARCH_FOLDER, query)

    if not best_match_path:
        return jsonify({"error": "No relevant paper found"}), 404

    content = read_file_content(best_match_path)
    log_query(query, user, 0, 0.0)

    return jsonify({
        "title": best_match_title,
        "content": content,
        "source": f"Source: {best_match_title} (Nemosora Docs)"
    })


@routes_bp.route("/summarize", methods=["POST"])
def summarize_paper():
    data = request.get_json()
    content = data.get("content", "")
    user = data.get("user", "anonymous")

    if not content:
        return jsonify({"error": "Empty content"}), 400

    summary, tokens_used, readability_score = generate_summary_and_stats(content)
    log_query("summarize", user, tokens_used, readability_score)

    return jsonify({
        "summary": summary,
        "tokens_used": tokens_used,
        "readability_score": readability_score
    })


@routes_bp.route("/ask", methods=["POST"])
def ask_question():
    data = request.get_json()
    question = data.get("question", "")
    context = data.get("context", "")
    user = data.get("user", "anonymous")

    if not question or not context:
        return jsonify({"error": "Question and context required"}), 400

    answer, tokens_used = answer_question(context, question)
    readability_score = calculate_readability(answer)
    log_query(question, user, tokens_used, readability_score)

    return jsonify({
        "answer": answer,
        "tokens_used": tokens_used,
        "readability_score": readability_score
    })


# ✅ NEW ADMIN LOG VIEW ROUTE
@routes_bp.route("/logs", methods=["GET"])
def get_logs():
    try:
        import sqlite3
        conn = sqlite3.connect("db.sqlite3")
        cursor = conn.cursor()

        cursor.execute("SELECT user, file, question, response, tokens_used, timestamp FROM query_logs")
        logs = cursor.fetchall()
        conn.close()

        logs_list = [
            {
                "user": row[0],
                "file": row[1],
                "question": row[2],
                "response": row[3],
                "tokens": row[4],
                "timestamp": row[5]
            }
            for row in logs
        ]

        return jsonify({"logs": logs_list})
    except Exception as e:
        return jsonify({"error": f"failed to fetch logs: {str(e)}"}), 500
