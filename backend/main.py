from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, create_events, create_artists, create_genres

app = Flask(__name__)

# Home Page
@app.route('/')
def index():
   pass

# About Page
@app.route('/gitlab', methods=['GET'])
def about_page():
    pass

# Genres Page
@app.route('/genres', methods=['GET'])
@app.route('/genres/<genre_name>', methods=['POST'])
def genres_page(genre_name):
    # When genres are listed as cards in grid view
    if request.methods == 'GET':
        genres = db.session.query('Genre').all()
        return jsonify([genre.to_dict() for genre in genres])
    elif request.methods == 'POST':
        # When user clicks on genre card (or name)
        data = request.json
        if 'sort_by' in data:
            pass
        elif 'genre_id' in data:
            # Search database based on genre_id
            genre_id = data['genre_id']
            tgt = Genre.query.get(genre_id)
            return tgt.to_dict()

# Artists Page
@app.route('/artists', methods=['GET','POST'])
def artists_page():
    if request.methods == 'POST':
        data = request.json
        artist_name = data['name']
        # Insert code to return data for that one artist, search database

# Get list of genre instances
    # Iterate through list of instances
        # for each instance iterate thorugh popularArtistNames
            # for each name do a post request to /artists passing in the name
                # In backend we route to artist page
                # <a href="url_for("/artists", method='POST', name=ArtistName)">Artist Name

# Events Page
@app.route('/events', methods=['GET'])


