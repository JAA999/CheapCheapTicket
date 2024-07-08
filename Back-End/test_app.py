import unittest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from models import app, db, Genres, Artists, Events  # Adjust the import as needed

# Configure the application for testing
# app.config['TESTING'] = True
# app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DB_STRING",f'postgresql://{USER}:{PASSWORD}@{PUBLIC_IP_ADDRESS}/{DBNAME}')
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

class BasicTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        app.app_context().push()
        db.create_all()

    @classmethod
    def tearDownClass(cls):
        db.session.remove()
        db.drop_all()

    def setUp(self):
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_genre_creation(self):
        genre = Genres(name="Rock")
        db.session.add(genre)
        db.session.commit()
        
        self.assertEqual(Genres.query.count(), 1)
        self.assertEqual(Genres.query.first().name, "Rock")

        # Clean up
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Genres.query.count(), 0)

    def test_artist_creation(self):
        genre = Genres(name="Pop")
        db.session.add(genre)
        db.session.commit()
        
        artist = Artists(artist_name="Taylor Swift", genre_id=genre.id)
        db.session.add(artist)
        db.session.commit()
        
        self.assertEqual(Artists.query.count(), 1)
        self.assertEqual(Artists.query.first().artist_name, "Taylor Swift")
        self.assertEqual(Artists.query.first().genre.name, "Pop")
        
        # Clean up
        db.session.delete(artist)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Artists.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_event_creation(self):
        genre = Genres(name="Jazz")
        db.session.add(genre)
        db.session.commit()
        
        event = Events(name="Jazz Festival", genre_id=genre.id)
        db.session.add(event)
        db.session.commit()
        
        self.assertEqual(Events.query.count(), 1)
        self.assertEqual(Events.query.first().name, "Jazz Festival")
        self.assertEqual(Events.query.first().genre.name, "Jazz")

        # Clean up
        db.session.delete(event)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Events.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

    def test_many_to_many_relationship(self):
        genre = Genres(name="Classical")
        db.session.add(genre)
        db.session.commit()
        
        artist = Artists(artist_name="Ludwig van Beethoven", genre_id=genre.id)
        event = Events(name="Classical Evening", genre_id=genre.id)
        db.session.add(artist)
        db.session.add(event)
        db.session.commit()
        
        event.artists.append(artist)
        db.session.commit()
        
        self.assertEqual(event.artists[0].artist_name, "Ludwig van Beethoven")
        self.assertEqual(artist.events[0].name, "Classical Evening")

        # Clean up
        event.artists.remove(artist)
        db.session.commit()
        db.session.delete(artist)
        db.session.delete(event)
        db.session.delete(genre)
        db.session.commit()
        self.assertEqual(Artists.query.count(), 0)
        self.assertEqual(Events.query.count(), 0)
        self.assertEqual(Genres.query.count(), 0)

if __name__ == "__main__":
    unittest.main()
