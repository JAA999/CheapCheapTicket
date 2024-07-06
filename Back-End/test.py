import unittest
from flask import Flask
from models import db, Artists, Events, Genres

class DBTestCases(unittest.TestCase):
    # ---------
    # insertion
    # ---------
    def setUp(self):
        # print("SETTING UP")
        # db.create_all()

        self.app = Flask(__name__)
        self.app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/ticketsdb'
        self.app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        db.init_app(self.app)
        self.app_context = self.app.app_context()
        self.app_context.push()

        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()
    
    def test_source_insert_1(self):
        print("FIRST TEST")
        s = Artists(artist_name='Tyla', artist_id='20')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Artists).filter_by(artist_id = '20').one()
        self.assertEqual(str(r.artist_id), '20')

        db.session.query(Artists).filter_by(artist_id = '20').delete()
        db.session.commit()

    def test_source_insert_2(self):
        s = Events(name='Concert', id='13')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Events).filter_by(id = '13').one()
        self.assertEqual(str(r.id), '13')

        db.session.query(Events).filter_by(id = '13').delete()
        db.session.commit()

    def test_source_insert_3(self):
        s = Genres(name='Pop', id='13')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Genres).filter_by(id = '13').one()
        self.assertEqual(str(r.id), '13')

        db.session.query(Genres).filter_by(id = '13').delete()
        db.session.commit()

if __name__ == '__main__':
    unittest.main()