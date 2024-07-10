import json
from models import app, db, Artists, Events, Genres

# Credit: Class Slides
# Get the contents of a JSON file
def load_json_file(filename):
    with open (filename) as fp:
        jsn = json.load(fp)
        fp.close()
    return jsn

def create_genres():
    genres = load_json_file('genres.json')

    for genre in genres['Genres']:
        i = Genres(
            genre_name=genre['name'],
            genre_id=genre['genreId'],
            popular_artists=genre['popularArtists'],
            upcoming_events=genre['upcomingEvents'],
            top_songs=genre['topSongs'],
            events_price_range=genre['eventsPriceRange']
        )
        db.session.add(i)
    db.session.commit()

def create_artists():
    artists = load_json_file('artists.json')

    for artist in artists['Artists']:
        i = Artists(
            artist_name=artist['name'],
            artist_id=artist['id'],
            popularity=artist['popularity'],
            albums=artist['albums'],
            album_covers=artist['album_covers'],
            future_events=artist['futureEvents'],
            image_url=artist['image_url'],
            genre_id=artist['genreId']
        )
        db.session.add(i)
    db.session.commit()


def create_events():
    events = load_json_file('events.json')

    for event in events['Events']:
        i = Events(
            event_name=event['eventName'],
            event_id=event['eventId'],
            date_and_time=event['dateAndTime'],
            artist_names=event['artistNames'],
            price_range=event['priceRange'],
            venue=event['venue'],
            ticketmaster_URL=event['ticketmasterURL'],
            genre_id=event['genreId'],
            sales_start_end=event['salesStart-End'],
            #salesStart-End?
        )
        db.session.add(i)
    db.session.commit()


def initialize_database():
    db.drop_all()
    db.create_all()

    create_genres()
    create_artists()
    create_events()

# This needs to be called every main.py is run

# load each json by name
#   call each method with the loaded data
# then it is ready