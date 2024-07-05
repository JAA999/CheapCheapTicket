from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, create_events, create_artists, create_genres
from models import Genre, Artist, Event
from data import get_gitlab_stats

app = Flask(__name__)

# Home Page
@app.route('/')
def index():
   pass

# About Page
@app.route('/about', methods=['GET'])
def about_page():
    if request.methods == 'GET':
        return get_gitlab_stats()

# Genres Page
@app.route('/api/GetAllGenres/', methods=['GET'])
@app.route('/api/GetGenre/<string:genre_id>', methods=['POST'])
def genres_page(genre_id):
    # When genres are listed as cards in grid view
    if request.methods == 'GET':
        genres = db.session.query('Genre').all()
        return jsonify([genre.to_dict() for genre in genres])
    elif request.methods == 'POST':
        # When user clicks on genre card (or name)
        data = request.json
        if 'genre_id' in data:
            # Search database based on genre_id
            genre_id = data['genre_id']
            tgt = Genre.query.get(genre_id)
            return tgt.to_dict()
        elif 'sort_by' in data:
            return 

# Artists Page
@app.route('/api/GetAllArtists/', methods=['GET'])
@app.route('/api/GetArtist/<artist_id>', methods=['POST'])
def artists_page(artist_id):
    if request.methods == 'GET':
        artists = db.session.query('Artist').all()
        return jsonify([artist.to_dict() for artist in artists])
    elif request.methods == 'POST':
        data = request.json
        if artist_id != '':
            tgt = Artist.query.get(artist_id)
            return tgt.to_dict()
        elif 'sort_by' in data:
            return

# Get list of genre instances
    # Iterate through list of instances
        # for each instance iterate thorugh popularArtistNames
            # for each name do a post request to /artists passing in the name
                # In backend we route to artist page
                # <a href="url_for("/artists", method='POST', name=ArtistName)">Artist Name

# Events Page
@app.route('/api/GetAllEvents/', methods=['GET'])
@app.route('/api/GetEvent/<string:event_id>', methods=['POST'])
def events_page(event_id):
    if request.methods == 'GET':
        events = db.session.query('Event').all()
        return jsonify([event.to_dict() for event in events])
    elif request.methods == 'POST':
        data = request.json
        if event_id != '':
            tgt = Event.query.get(event_id)
            return tgt.to_dict()
        elif 'sort_by' in data:
            return


