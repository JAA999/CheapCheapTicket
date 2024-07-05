import json
from models import app, db, Artist, Event, Genre

# Credit: Class Slides
# Get the contents of a JSON file
def load_json_file(filename):
    with open (filename) as fp:
        jsn = json.load(fp)
        fp.close()
    return jsn

# def create_genres:

# def create_artists:

# def create_events:

# create_genres()
# create_artists()
# create_events()