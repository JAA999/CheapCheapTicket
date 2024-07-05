import unittest
from models import db, Artists, Events, Genres

class DBTestCases(unittest.TestCase):
    # ---------
    # insertion
    # ---------
    
    def test_source_insert_1(self):
        s = Artists(artist_name='Tyla', artist_id='20')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Artists).filter_by(id = '20').one()
        self.assertEqual(str(r.id), '20')

        db.session.query(Artists).filter_by(id = '20').delete()
        db.session.commit()

    def test_source_insert_2(self):
        s = Events(name='Concert', artist_id='13')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Artists).filter_by(id = '13').one()
        self.assertEqual(str(r.id), '13')

        db.session.query(Artists).filter_by(id = '13').delete()
        db.session.commit()

    def test_source_insert_3(self):
        s = Genres(name='Pop', id='13')
        db.session.add(s)
        db.session.commit()


        r = db.session.query(Artists).filter_by(id = '13').one()
        self.assertEqual(str(r.id), '13')

        db.session.query(Artists).filter_by(id = '13').delete()
        db.session.commit()

if __name__ == '__main__':
    unittest.main()