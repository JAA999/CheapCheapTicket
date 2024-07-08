from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os
from sqlalchemy.dialects.postgresql import ARRAY, JSON

# initializing Flask app 
app = Flask(__name__) 

app.app_context().push()

USER ="postgres"
PASSWORD ="asd123"
PUBLIC_IP_ADDRESS ="localhost:5432"
DBNAME ="ticketsdb"

# Configuration 
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True 
db = SQLAlchemy(app)

class Genres(db.Model):
    __tablename__ = 'genres'
    
    name = db.Column(db.String(80), nullable = False)
    id = db.Column(db.String, primary_key = True)

    popular_artists = db.Column(ARRAY(db.String))
    upcoming_events = db.Column(ARRAY(db.String)) 
    top_songs = db.Column(ARRAY(db.String)) 
    events_price_range = db.Column(ARRAY(db.Integer))

    # Relationship
    artists = db.relationship('Artists', back_populates='genre')
    events = db.relationship('Events', back_populates='genre')
   
    # books = db.relationship('Artists', backref = 'genre')

    def to_dict(self):
        instance = {
            'name': self.name,
            'id': self.id,
            'popular_artists': self.popular_artists,
            'upcoming_events': self.upcoming_events,
            'top_songs': self.top_songs,
            'events_price_range': self.events_price_range
        }
        return instance
  
class Artists(db.Model):
    __tablename__ = 'artists'
	
    artist_name = db.Column(db.String(80), nullable = False)
    artist_id = db.Column(db.String, primary_key = True)
    popularity = db.Column(db.Integer)  
    albums = db.Column(ARRAY(db.String)) 
    album_covers = db.Column(ARRAY(db.String))
    future_events = db.Column(ARRAY(db.String))
    image_url = db.Column(db.String(80)) 
    # Relationship
    genre_id = db.Column(db.String, db.ForeignKey('genres.id'), nullable=False)
    genre = db.relationship('Genres', back_populates='artists')
    events = db.relationship('Events', secondary ='artist_events', back_populates='artists')

    def to_dict(self):
        instance = {
            'name': self.artist_name,
            'id': self.artist_id,
            'popularity': self.popularity,
            'albums': self.albums,
            'album_covers': self.album_covers,
            'future_events': self.future_events,
            'image_url': self.image_url,
            'genre_id': self.genre_id
        }
        return instance
    
class Events(db.Model):
    __tablename__ = 'events'
	
    name = db.Column(db.String, nullable = False)
    id = db.Column(db.String, primary_key = True)
    # description = db.Column(db.String(250))

    artist_names = db.Column(ARRAY(db.String)) 
    date_and_time = db.Column(ARRAY(db.Integer))
    sales_start_end = db.Column(db.String) 
    price_range = db.Column(ARRAY(db.Integer))
    venue = db.Column(JSON) 
    ticketmaster_URL = db.Column(db.String) 

    # Relationship
    genre_id = db.Column(db.String, db.ForeignKey('genres.id'), nullable=False)
    genre = db.relationship('Genres', back_populates='events')
    artists = db.relationship('Artists', secondary='artist_events', back_populates='events')

    def to_dict(self):
        instance = {
            'artist_names': self.artist_names,
            'date_and_time': self.date_and_time,
            'sales_start_end': self.sales_start_end,
            'price_range': self.price_range,
            'venue': self.venue,
            'ticketmaster_URL': self.ticketmaster_URL,
            'genre_id': self.genre_id
        }
        return instance

artists_events = db.Table('artist_events',
   db.Column('artist_id', db.String, db.ForeignKey('artists.artist_id')), 
   db.Column('event_id', db.String, db.ForeignKey('events.id'))
   )



