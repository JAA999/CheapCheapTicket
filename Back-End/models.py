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
class artist(db.Model): 
    __tablename__ = 'artist'
    
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

# Relationship to Artist: one venue can have multiple artists
# Relationship to Genre: one venue(event) can have one genre
class venue(db.Model): 
    __tablename__ = 'venue' 

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
    
# Relationship to Artist: one genre can have multiple artists
# Relationship to Venues: one genre ca multiple venues(events)
class genres(db.Model): 
    __tablename__ = 'genre' 

    genreId = db.Column(db.String(80), primary_key = True)
    name = db.Column(db.String(80)) 
    popularArtists = db.Column(ARRAY(db.String))
    upcomingEvents = db.Column(ARRAY(db.String)) 
    topsongs = db.Column(ARRAY(db.String)) 
    eventsPriceRange = db.Column(db.Integer)

    venue_id = db.Column(db.Integer, db.ForeignKey('venue.eventId'))
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'))

db.create_all()


