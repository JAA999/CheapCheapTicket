import json
from models import app, db, Artist, Event, Genre

# Credit: Class Slides
# Get the contents of a JSON file
def load_json_file(filename):
    with open (filename) as fp:
        jsn = json.load(fp)
        fp.close()
    return jsn

def create_genres(data):
    for genre in data['genre']:
        i = Genre(
            name=genre['name'],
            popularArtists=genre['popularArtists'],
            upcomingEvents=genre['upcomingEvents'],
            topsongs=genre['topsongs'],
            eventsPriceRange=genre['eventsPriceRange']
        )
        db.session.add(genre)

    db.session.commit()

def create_artists(data):
    for artist in data['artist']:
        i = Artist(
            name=artist['name'],
            
        )

# def create_events:

# create_genres()
# create_artists()
# create_events()