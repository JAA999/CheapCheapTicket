from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.dialects.postgresql import ARRAY

# initializing Flask app 
app = Flask(__name__) 

app.app_context().push()

# Make these command line arguments that provide when you deploy the app
# or use other options like connecting directly from App Engine

# Change this accordingly 
USER ="postgres"
PASSWORD ="asd123"
PUBLIC_IP_ADDRESS ="localhost:5432"
DBNAME ="bookdb"

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = \
os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # To suppress a warning message
db = SQLAlchemy(app)

# Many-To-Many relation: Assume that an Author can have many Books 
# and a Book can also have many Authors.
#
# You cannot setup a Many-To-Many where you have a relationship
# on one object and an ID stored in the table becuase in this way 
# you will only be able to store a single ID in that table
# with the related object. So we need something to store
# an ID of one object and an idea of the related object and maintain
# multiple objects can relate to multiple other objects.
#
# link is a (joined or association) table with two columns.
# It maintains the relationship between Author and Book
# It has two forign keys (the primary keys of the tables)
# To automatically update link table, one need to create
# a connection within Author and Book via 'relationship()' 
# in each corresponding table.
artists_events = db.Table('link',
   db.Column('artist_id', db.Integer, db.ForeignKey('artist.id')), 
   db.Column('event_id', db.Integer, db.ForeignKey('event.id'))
   )
  
class Artists(db.Model):
    __tablename__ = 'artists'
	
    artist_name = db.Column(db.String(80), nullable = False)
    artist_id = db.Column(db.Integer, primary_key = True)
    popularity = db.Column(db.Integer)  
    albums = db.Column(ARRAY(db.String)) 
    album_covers = db.Column(ARRAY(db.String))
    future_events = db.Column(ARRAY(db.String))
    image_url = db.Column(db.String(80)) 


    # Relationship
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)
    genre = db.relationship('Genre', back_populates='artists')
    events = db.relationship('Event', secondary ='artist_events', back_populates='artists')

    # This attribute connects an Artist object, a Event object, 
    # and the table link 
    # books = db.relationship('Events', secondary = 'link', backref='wrote')
    # genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'))
    
class Events(db.Model):
    __tablename__ = 'events'
	
    name = db.Column(db.String(80), nullable = False)
    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(250))

    artistNames = db.Column(ARRAY(db.String)) 
    dateAndTime = db.Column(db.String)
    salesStartEnd = db.Column(db.String) 
    priceRange = db.Column(db.Integer)
    # venue = db.Column(JSON) 
    ticketmasterURL = db.Column(db.String) 

    # Relationship
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=False)
    genre = db.relationship('Genre', back_populates='events')
    artists = db.relationship('Artist', secondary='artist_events', back_populates='events')

class Genres(db.model):
    __tablename__ = 'genre'
    name = db.Column(db.String(80), nullable = False)
    id = db.Column(db.Integer, primary_key = True)


    popularArtists = db.Column(ARRAY(db.String))
    upcomingEvents = db.Column(ARRAY(db.String)) 
    topsongs = db.Column(ARRAY(db.String)) 
    eventsPriceRange = db.Column(db.Integer)

    # Relationship
    artists = db.relationship('Artist', back_populates='genre')
    events = db.relationship('Event', back_populates='genre')
    # This attribute connects Genre with Artist
    # The name stored in backref is a sort of virtual column 
    # that will be inserted in the Artist table. This column will 
    # refer back to the Genre.

    # books = db.relationship('Artists', backref = 'genre')
