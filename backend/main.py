from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, create_events, create_artists, create_genres
from models import Genres, Artists, Events
from gitlab_stats import get_gitlab_stats

app = Flask(__name__)

# Home Page
@app.route('/')
def index():
   pass

# About Page
@app.route('/about', methods=['GET'])
def about_page():
    if request.method == 'GET':
        return get_gitlab_stats()

# Genres Page
@app.route('/api/GetAllGenres/', methods=['GET'])
def get_all_genres():
    if (request.method == 'GET'):
        genres = Genres.query.all()
        return jsonify([genre.to_dict() for genre in genres])

@app.route('/api/GetGenre/<string:genre_id>', methods=['POST'])
def genres_page(genre_id):
    # When genres are listed as cards in grid view
    if request.method == 'POST':
        # When user clicks on genre card (or name)
        if genre_id != '':
            # Search database based on genre_id
            tgt = Genres.query.get(genre_id)
            return tgt.to_dict()

@app.route('/api/GetGenres/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_genres(page, per_page, sort_by, sort_order):
    if page != '':
        page_num = int(page)
        step = int(per_page) if not per_page else 5
        genres = Genres.query.all()
        return jsonify([(genres[page_num * step + i]).to_dict() for i in range(step + 1)])

# Artists Page
@app.route('/api/GetAllArtists/', methods=['GET'])
def get_all_artists():
    if request.method == 'GET':
        artists = Artists.query.all()
        return jsonify([artist.to_dict() for artist in artists])

@app.route('/api/GetArtist/<string:artist_id>', methods=['POST'])
def artists_page(artist_id):
    if request.method == 'POST':
        if artist_id != '':
            tgt = Artists.query.get(artist_id)
            return tgt.to_dict()

@app.route('/api/GetArtists/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_artists(page, per_page, sort_by, sort_order):
    if page != '':
        page_num = int(page)
        step = int(per_page) if not per_page else 20
        artists = Artists.query.all()
        return jsonify([(artists[page_num * step + i]).to_dict() for i in range(step + 1)])
            
# Get list of genre instances
    # Iterate through list of instances
        # for each instance iterate thorugh popularArtistNames
            # for each name do a post request to /artists passing in the name
                # In backend we route to artist page
                # <a href="url_for("/artists", method='POST', name=ArtistName)">Artist Name

# Events Page
@app.route('/api/GetAllEvents/', methods=['GET'])
def get_all_events():
    if request.method == 'GET':
        events = Events.query.all()
        return jsonify([event.to_dict() for event in events])

@app.route('/api/GetEvent/<string:event_id>', methods=['POST'])
def events_page(event_id):
    if request.method == 'POST':
        data = request.json
        if event_id != '':
            tgt = Events.query.get(event_id)
            return tgt.to_dict()

@app.route('/api/GetEvents/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_events(page, per_page, sort_by, sort_order):
    if page != '':
        page_num = int(page)
        step = int(per_page) if not per_page else 20
        events = Events.query.all()
        return jsonify([(events[page_num * step + i]).to_dict() for i in range(step + 1)])


