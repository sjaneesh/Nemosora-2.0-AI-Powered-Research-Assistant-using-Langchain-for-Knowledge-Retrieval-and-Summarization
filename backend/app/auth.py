from flask import Blueprint, redirect, request, session, url_for
import os
from google_auth_oauthlib.flow import Flow
import google.auth.transport.requests
import pathlib

auth_bp = Blueprint('auth', __name__)

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"  # Enable HTTP for dev

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

GOOGLE_DISCOVERY_URL = (
    "https://accounts.google.com/.well-known/openid-configuration"
)

@auth_bp.route("/login")
def login():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": ["http://localhost:5000/callback"]
            }
        },
        scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"]
    )
    flow.redirect_uri = "http://localhost:5000/callback"
    auth_url, _ = flow.authorization_url(prompt='consent')
    return redirect(auth_url)

@auth_bp.route("/callback")
def callback():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": ["http://localhost:5000/callback"]
            }
        },
        scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"]
    )
    flow.redirect_uri = "http://localhost:5000/callback"

    flow.fetch_token(authorization_response=request.url)
    credentials = flow.credentials

    request_session = google.auth.transport.requests.Request()
    id_info = google.oauth2.id_token.verify_oauth2_token(
        credentials._id_token, request_session
    )

    session["user"] = {
        "name": id_info.get("name"),
        "email": id_info.get("email"),
        "picture": id_info.get("picture")
    }
    return redirect(url_for("routes.dashboard"))

@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect("/")
