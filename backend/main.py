from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, create_events, create_artists, create_genres
from models import Genres, Artists, Events
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
    # if request.methods == 'GET': # is it request.method instead of methods
        # genres = Genres.query.all()
        # return jsonify([genre.to_dict() for genre in genres])
    # elif request.methods == 'POST':
    #     # When user clicks on genre card (or name)
    #     data = request.json
    if genre_id != '':
        # Search database based on genre_id
        tgt = Genres.query.get(genre_id)
        return tgt.to_dict()

genres_page('KnvZfZ7vAvv')

@app.route('/api/GetGenres/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_genres(page, per_page, sort_by, sort_order):
    if page != '':
        page_num = int(page)
        step = int(per_page) if not per_page else 5
        genres = db.session.query('Genres').all()
        return jsonify([(genres[page_num * step + i]).to_dict() for i in range(step + 1)])

# Artists Page
@app.route('/api/GetAllArtists/', methods=['GET'])
@app.route('/api/GetArtist/<string:artist_id>', methods=['POST'])
def artists_page(artist_id):
    if request.methods == 'GET':
        artists = db.session.query('Artists').all()
        return jsonify([artist.to_dict() for artist in artists])
    elif request.methods == 'POST':
        data = request.json
        if artist_id != '':
            tgt = Artists.query.get(artist_id)
            return tgt.to_dict()

@app.route('/api/GetArtists/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_artists(page, per_page, sort_by, sort_order):
    if page != '':
        page_num = int(page)
        step = int(per_page) if not per_page else 20
        artists = db.session.query('Artists').all()
        return jsonify([(artists[page_num * step + i]).to_dict() for i in range(step + 1)])
            
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
        events = db.session.query('Events').all()
        return jsonify([event.to_dict() for event in events])
    elif request.methods == 'POST':
        data = request.json
        if event_id != '':
            tgt = Events.query.get(event_id)
            return tgt.to_dict()

@app.route('/api/GetEvents/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_events(page, per_page, sort_by, sort_order):
    if page != '':
        page_num = int(page)
        step = int(per_page) if not per_page else 20
        events = db.session.query('Events').all()
        return jsonify([(events[page_num * step + i]).to_dict() for i in range(step + 1)])


