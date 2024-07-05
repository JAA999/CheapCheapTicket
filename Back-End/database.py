import json
from models import app, db, Artists, Events, Genres

# Credit: Class Slides
# Get the contents of a JSON file
def load_json_file(filename):
    with open (filename) as fp:
        jsn = json.load(fp)
        fp.close()
    return jsn

def create_genres(data):
    for genre in data['genre']:
        i = Genres(
            name=genre['name'],
            popular_artists=genre['popularArtists'],
            upcoming_events=genre['upcomingEvents'],
            top_songs=genre['topsongs'],
            events_price_range=genre['eventsPriceRange']
        )
        db.session.add(i)

    db.session.commit()

def create_artists(data):
    for artist in data['artist']:
        i = Artists(
            artist_name=artist['name'],
            artist_id=artist['id'],
            popularity=artist['popularity'],
            albums=artist['albums'],
            album_covers=artist['album_covers'],
            future_events=artist['future_events'],
            image_url=artist['image_url']
        )
        db.session.add(i)
    db.session.commit()


def create_events(data):
    for event in data['events']:
        i = Events(
            name=event['name'],
            id=event["id"],
            artist_names=event['artist_names'],
            price_range=event['price_range'],
            venue=event['venue'],
            ticketmaster_URL=event['ticketmaster_URL']
        )
        db.session.add(i)
    db.session.commit()

# create_genres()
# create_artists()
# create_events()