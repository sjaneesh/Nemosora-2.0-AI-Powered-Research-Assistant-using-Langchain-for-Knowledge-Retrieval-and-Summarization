from flask import Flask
from flask_cors import CORS
from app.routes import routes_bp
from app.dblogger import init_db

app = Flask(__name__)
CORS(app)  # Allow frontend requests

app.register_blueprint(routes_bp)

# Initialize DB
with app.app_context():
    init_db()

if __name__ == "__main__":
    app.run(debug=True, host="localhost", port=5000)