from flask import Flask, render_template 
from flask_sqlalchemy import SQLAlchemy 
from sqlalchemy.dialects.postgresql import ARRAY, JSON 
import os 

app = Flask(__name__) 

app.app_context().push() 

USER ="postgres" 
PASSWORD ="asd123" 
PUBLIC_IP_ADDRESS ="localhost:5432" 
DBNAME ="ticketsdb" 

app.config['SQLALCHEMY_DATABASE_URI'] = \ 
os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True 
db = SQLAlchemy(app) 

link = db.Table('link',
    db.Column('artist_id', db.Integer, db.ForeignKey('artist.id')), 
    db.Column('venue_id', db.Integer, db.ForeignKey('venue.id')), 
    db.Column('genre_id', db.Integer, db.ForeignKey('genre.id')), 
    ) 

# Relationship to Genre: one artist can have one genre
# Relationship to Venues: one artist can have multiple venues(events)
class Artist(db.Model): 
    __tablename__ = 'artists'
    
    name = db.Column(db.String(80), nullable = False) 
    id = db.Column(db.Integer, primary_key = True) 
    popularity = db.Column(db.Integer) 
    genreId = db.Column(db.Integer, primary_key = True) 
    albums = db.Column(ARRAY(db.String)) 
    album_covers = db.Column(ARRAY(db.String))
    future_events = db.Column(ARRAY(db.String))
    image_url = db.Column(db.String(80)) 

    venue_id = db.Column(db.Integer, primary_key = True)
    venues = db.relationship('venue', backref = 'artist') # one to many 
    
    genre = db.relationship(db.Integer, db.ForeignKey('genre')) # one to one

    def to_dict(self):
        instance = {
            'name': self.name,
            'id': self.id,
            'popularity': self.popularity,
            'genreName': self.name,
            'albums': self.albums,
            'album_covers': self.album_covers,
            'future_events': [(Event.query.get(event_id)).eventName for event_id in self.future_events],
            'image_url': self.image_url
        }
        return instance

# Relationship to Artist: one venue can have multiple artists
# Relationship to Genre: one venue(event) can have one genre
class Event(db.Model): 
    __tablename__ = 'venues' 

    eventId = db.Column(db.String(80), primary_key = True) 
    eventName = db.Column(ARRAY(db.String)) 
    artistNames = db.Column(ARRAY(db.String)) 
    dateAndTime = db.Column(db.String)
    salesStartEnd = db.Column(db.String) 
    priceRange = db.Column(db.Integer)
    genreId =  db.Column(db.String) 
    venue = db.Column(JSON) 
    ticketmasterURL = db.Column(db.String) 

    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))
    genre = db.relationship('genre', secondary = 'link', backref='wrote') 

    def to_dict():
        instance = {
            'eventId': self.eventId,
            'eventName': self.eventName,
            'artistNames': self.artistNames,
            'dateAndTime': self.dateAndTime,
            'salesStartEnd': self.salesStartEnd,
            'priceRange': self.priceRange,
            'genreId': self.genreId,
            'venue': self.venue,
            'ticketmasterURL': self.ticketmasterURL
        }
        return instance
    
# Relationship to Artist: one genre can have multiple artists
# Relationship to Venues: one genre ca multiple venues(events)
class Genres(db.Model): 
    __tablename__ = 'genres' 

    genreId = db.Column(db.String(80), primary_key = True)
    name = db.Column(db.String(80)) 
    popularArtists = db.Column(ARRAY(db.String))
    upcomingEvents = db.Column(ARRAY(db.String)) 
    topsongs = db.Column(ARRAY(db.String)) 
    eventsPriceRange = db.Column(db.Integer)

    venue_id = db.Column(db.Integer, db.ForeignKey('venue.eventId'))
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))

    def to_dict(self):
        instance = {
            'name': self.name,
            'genreId': self.genreId
            'popularArtists': [(User.query.get(artist_id)).name for artist_id in self.popularArtists],
            'upcomingEvents': [(Event.query.get(event_id)).eventName for event_id in self.upcomingEvents],
            'topSongs': self.topSongs,
            'eventsPriceRange': ''
        }
        return instance

db.create_all()


