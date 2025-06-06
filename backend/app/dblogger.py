import sqlite3

DB_NAME = 'db.sqlite3'

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS query_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            query TEXT,
            source TEXT,
            tokens_used INTEGER,
            readability_score REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def log_query(query, source, tokens_used, readability_score):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        INSERT INTO query_logs (query, source, tokens_used, readability_score)
        VALUES (?, ?, ?, ?)
    ''', (query, source, tokens_used, readability_score))
    conn.commit()
    conn.close()
