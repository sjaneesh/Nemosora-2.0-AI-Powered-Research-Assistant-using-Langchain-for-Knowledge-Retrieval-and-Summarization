import os
import difflib

def find_best_matching_file(folder, query):
    best_score = 0
    best_match = None

    for category in os.listdir(folder):
        category_path = os.path.join(folder, category)
        if os.path.isdir(category_path):
            for filename in os.listdir(category_path):
                if filename.endswith(".txt"):
                    score = difflib.SequenceMatcher(None, filename.lower(), query.lower()).ratio()
                    if score > best_score:
                        best_score = score
                        best_match = os.path.join(category_path, filename)

    if best_match:
        title = os.path.splitext(os.path.basename(best_match))[0].replace("-", " ").title()
        return best_match, title
    return None, None


def read_file_content(path):
    try:
        with open(path, "r", encoding="utf-8") as file:
            return file.read()
    except Exception:
        return "Error reading file"
