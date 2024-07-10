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

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True 
db = SQLAlchemy(app) 

link = db.Table('link',
    db.Column('artist_id', db.Integer, db.ForeignKey('artists.id')), 
    db.Column('venue_id', db.Integer, db.ForeignKey('events.id')), 
    db.Column('genre_id', db.Integer, db.ForeignKey('genres.id')), 
    ) 

# Relationship to Genre: one artist can have one genre
# Relationship to Venues: one artist can have multiple venues(events)
class Artist(db.Model): 
    __tablename__ = 'artists'
    
    name = db.Column(db.String(80), nullable = False) 
    id = db.Column(db.Integer, primary_key = True, nullable = False) 
    
    popularity = db.Column(db.Integer) 
    albums = db.Column(ARRAY(db.String)) 
    album_covers = db.Column(ARRAY(db.String))
    future_events = db.Column(ARRAY(db.String))
    image_url = db.Column(db.String(80)) 

    venue_id = db.Column(db.Integer, primary_key = True)
    venues = db.relationship('events', backref = 'artists') # one to many 

    genre_id = db.Column(db.Integer, primary_key = True) 
    genre = db.relationship(db.Integer, db.ForeignKey('genres.id')) # one to one


# Relationship to Artist: one venue can have multiple artists
# Relationship to Genre: one venue(event) can have one genre
class Event(db.Model): 
    __tablename__ = 'events' 

    name = db.Column(ARRAY(db.String), nullable = False)
    id = db.Column(db.String(80), primary_key = True, nullable = False)
   
    
    artistNames = db.Column(ARRAY(db.String)) 
    dateAndTime = db.Column(db.String)
    salesStartEnd = db.Column(db.String) 
    priceRange = db.Column(db.Integer)
    genreId =  db.Column(db.String) 
    eventInfo = db.Column(JSON) 
    ticketmasterURL = db.Column(db.String) 

    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id')) # one to many
    genre = db.relationship(db.Integer, db.ForeignKey('genres.id')) # one to one 
    
# Relationship to Artist: one genre can have multiple artists
# Relationship to Venues: one genre can multiple venues(events)
class Genre(db.Model): 
    __tablename__ = 'genres' 

    name = db.Column(db.String(80), nullable = False)
    id = db.Column(db.String(80), primary_key = True, nullable = False)
     
    popularArtists = db.Column(ARRAY(db.String))
    upcomingEvents = db.Column(ARRAY(db.String)) 
    topSongs = db.Column(ARRAY(db.String)) 
    eventsPriceRange = db.Column(db.Integer)

    event_id = db.Column(db.Integer, db.ForeignKey('events.id')) # one to many
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id')) # one to many

db.create_all()


