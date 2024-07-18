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
            id=genre['genreId'],
            popular_artists=genre['popularArtists'],
            upcoming_events=genre['upcomingEvents'],
            top_songs=genre['topSongs'],
            events_price_min=genre['eventsPriceMin'],
            events_price_max=genre['eventsPriceMax']
        )
        db.session.add(i)
    db.session.commit()

def create_artists():
    artists = load_json_file('artists.json')

    for artist in artists['Artists']:
        i = Artists(
            name=artist['name'],
            id=artist['id'],
            popularity=artist['popularity'],
            albums=artist['albums'],
            album_covers=artist['albumCovers'],
            future_events=artist['futureEvents'],
            image_url=artist['imageURL'],
            genre_id=artist['genreId'],
            genre_name=artist['genreName']
        )
        db.session.add(i)
    db.session.commit()

def create_events():
    events = load_json_file('events.json')

    for event in events['Events']:
        if event['venue'] == "Unavailable":
            venue_exists = Venues.query.filter_by(name="Unavailable").first()
        else:
            venue_exists = Venues.query.filter_by(name=event['venue']['name']).first()
        
        if venue_exists:
            venueId = venue_exists.id
        else:
            venueId = generate_unique_id()
            if event['venue'] == "Unavailable":
                new_venue = Venues(
                    id=venueId,
                    name="Unavailable",
                    address="Unavailable",
                    phoneNumber="Unavailable",
                    rating=-1,
                    venueWebsite="Unavailable"
                )
            else:
                new_venue = Venues(
                    id=venueId,
                    name=event['venue']['eventName'],
                    address=event['venue']['address'],
                    phoneNumber=event['venue']['phoneNumber'],
                    rating=event['venue']['rating'],
                    venueWebsite=event['venue']['website']
                )
            
                db.session.add(new_venue)
                db.session.commit()


        i = Events(
            name=event['eventName'],
            id=event['eventId'],
            event_date=event['eventDate'],
            artist_names=event['artistNames'],
            artist_ids = event['artistIds'],
            price_range_min = event['priceRangeMin'],
            price_range_max = event['priceRangeMax'],
            venue_id = venueId
            venue = venue_exists if venue_exists else new_venue,
            ticketmaster_URL=event['ticketmasterURL'],
            genre_id=event['genreId'],
            genre_name=event['genreName'],
            sales_start=event['salesStart'],
            eventImage_URL=event['eventImageURL']
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