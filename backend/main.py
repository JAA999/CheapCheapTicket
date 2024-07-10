from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, initialize_database
from models import Genres, Artists, Events
from gitlab_stats import get_gitlab_stats
import os

CORS(app)

with app.app_context():
    initialize_database()

# Home Page
@app.route('/')
def index():
   return "Welcome to the Home Page"

# About Page
@app.route('/about', methods=['GET']) 
def about_page():
    return get_gitlab_stats()

# Genres Page
@app.route('/GetAllGenres/', methods=['GET'])
def get_all_genres():
    genres = Genres.query.all()
    return jsonify([genre.to_dict() for genre in genres])

@app.route('/GetGenre/<string:genre_id>', methods=['GET'])
def genres_page(genre_id):
    genre = Genres.query.get(genre_id)
    if genre: return jsonify(genre.to_dict())
    return "Genre not found", 404

@app.route('/GetGenres/', methods=['GET'])
def specific_genres():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    genres = Genres.query.paginate(page=page, per_page=per_page)
    return jsonify([genre.to_dict() for genre in genres])

# Artists Page
@app.route('/GetAllArtists/', methods=['GET'])
def get_all_artists():
    if request.method == 'GET':
        artists = Artists.query.all()
        return jsonify([artist.to_dict() for artist in artists])

@app.route('/GetArtist/<string:artist_id>', methods=['GET'])
def artists_page(artist_id):
    artist = Artists.query.get(artist_id)
    if artist:
        return jsonify(artist.to_dict())
    return "Artist not found", 404

@app.route('/GetArtists/')
def specific_artists():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    artists = Artists.query.paginate(page=page, per_page=per_page) 
    return jsonify([artist.to_dict() for artist in artists])

# Events Page
@app.route('/GetAllEvents/', methods=['GET'])
def get_all_events():
    events = Events.query.all()
    if events:
        return jsonify([event.to_dict() for event in events])
    return "No events found", 404

@app.route('/GetEvent/<string:event_id>', methods=['GET'])
def events_page(event_id):
    event = Events.query.get(event_id) 
    if event:
        return jsonify(event.to_dict())
    return "Event not found", 404

@app.route('/GetEvents/')
def specific_events():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 5, type=int)
    events = Events.query.paginate(page=page, per_page=per_page)
    return jsonify([event.to_dict() for event in events])

if __name__ == '__main__':
    app.run(debug=True)