from flask import render_template, jsonify
from database import app, db, create_events, create_artists, create_genres
from models import db, Artists, Events, Genres
import os

# Change this accordingly 
USER ="postgres"
PASSWORD ="asd123"
PUBLIC_IP_ADDRESS ="localhost:5432"
DBNAME ="ticketsdb"

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = \
os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # To suppress a warning message

db.init_app(app)


# Home Page
@app.route('/')
def index():

# About Page
@app.route()

# Genres Page
@app.route()

# Artists Page
@app.route()

# Events Page
@app.route()


