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
            name=genre['name'],
            id=genre['id'],
            popular_artists=genre['popularArtists'],
            upcoming_events=genre['upcomingEvents'],
            top_songs=genre['topsongs'],
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
            future_events=artist['future_events'],
            image_url=artist['image_url'],
            genre_id=artist['genre_id']
        )
        db.session.add(i)
    db.session.commit()


def create_events():
    events = load_json_file('events.json')

    for event in events['Events']:
        i = Events(
            name=event['name'],
            id=event["id"],
            artist_names=event['artist_names'],
            price_range=event['price_range'],
            venue=event['venue'],
            ticketmaster_URL=event['ticketmaster_URL'],
            genre_id=event['genre_id']
        )
        db.session.add(i)
    db.session.commit()

db.drop_all()
db.create_all()

create_genres()
create_artists()
create_events()

# This needs to be called every main.py is run

# load each json by name
#   call each method with the loaded data
# then it is ready