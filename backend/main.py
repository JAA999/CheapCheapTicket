from flask import Flask, jsonify, request
from flask_cors import CORS
from database import app, db, initialize_database
from models import Genres, Artists, Events
from gitlab_stats import get_gitlab_stats

app = Flask(__name__)
CORS(app)


with app.app_context():
    initialize_database()

# Home Page
@app.route('/')
def index():
   return "Welcome to the Home Page"

# About Page
@app.route('/about', methods=['GET']) #if the only method in the parameter is GET, we don't need to check I think -Hudson
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
        #return tgt.to_dict() was there down below before
    if genre: return jsonify(genre)
    return "Genre not found", 404

@app.route('/GetGenres/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>', methods=['GET'])
def specific_genres(page, per_page, sort_by, sort_order):
    genres = Genres.query.paginate(page, per_page, False).items
    return jsonify([genre.to_dict() for genre in genres])
    # if page != '':
    #     page_num = int(page)
    #     step = int(per_page) if not per_page else 5
    #     genres = Genres.query.all() # delete 2 lines above and put = Genres.query.paginate(page, per_page, False).items
    # return jsonify([(genres[page_num * step + i]).to_dict() for i in range(step + 1)])

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

@app.route('/GetArtists/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_artists(page, per_page, sort_by, sort_order):
    artists = Artists.query.paginate(page, per_page, False).items
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
    #data = request.json
    event = Events.query.get(event_id)
    if event:
        return jsonify(event.to_dict())
    return "Event not found", 404

@app.route('/GetEvents/<string:page>&<string:per_page>&<string:sort_by>&<string:sort_order>')
def specific_events(page, per_page, sort_by, sort_order):
    events = Events.query.paginate(page, per_page, False).items
    return jsonify([event.to_dict() for event in events])

if __name__ == '__main__':
    app.run(debug=True)