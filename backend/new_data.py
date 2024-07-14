import json
import requests
import base64

from venue_info import get_venue

# Credit: Class Slides
# Get the contents of a JSON file
def load_json_file(filename):
    with open (filename) as fp:
        jsn = json.load(fp)
        fp.close()
    return jsn

# Retrieve genre mappings from json file
genre_mappings = load_json_file('genre_mappings.json')
genres_to_playlists = genre_mappings['genres_to_playlists']
genres_to_playlists_test = genre_mappings['genres_to_playlists_test']
subgenres_to_genres = genre_mappings['subgenres_to_genres']
subgenres_to_genres_test = genre_mappings['subgenres_to_genres_test']

MAX_ARTISTS = 15
artist_names = set()
event_ids = set()

artist_instances = {}
additional_artists = []

event_instances = []
genre_instances = {}

spotify_access_token = ''
ticketmaster_access_token = 'Y7AR2Y8hCu4MFHUa1acKZxWrvvvthY4d'

def main():
    get_spotify_access_token()
    populate_genres()
    populate_from_playlists()

    for artist_id in artist_instances:
        populate_from_artist(artist_instances[artist_id])

    for artist in additional_artists:
        populate_from_artist(artist)
        artist_instances[artist['id']] = artist
    
    create_json_files()

# Retrieve a list of all genres used by spotify to populate Genre Model
def populate_genres():
    genres_request = 'https://app.ticketmaster.com/discovery/v2/classifications.json'

    params = {'apikey': ticketmaster_access_token}

    response = requests.get(genres_request, params=params)
    check_request_status(response)
    response = response.json()

    global genre_instances
    for classification in response['_embedded']['classifications']:
        if 'segment' in classification and classification['segment']['name'] == 'Music':
            for genre in classification['segment']['_embedded']['genres']:
                if (genre['name'] in genres_to_playlists_test):
                    genre_instance = {
                        'genreId': genre['id'],
                        'name': genre['name'],
                        'popularArtists': [],
                        'upcomingEvents': [],
                        'topSongs': [],
                        'eventsPriceRange': []
                    }
                    genre_instances[genre['id']] = genre_instance

# Creates JSON files for each model
def create_json_files():
    with open ('artists.json', 'w') as fp:
        json.dump({'Artists': [artist_instances[artist_id] for artist_id in artist_instances]}, fp, indent=4)

    with open ('events.json', 'w') as fp:
        json.dump({'Events': event_instances}, fp, indent=4)
    
    with open ('genres.json', 'w') as fp:
        json.dump({'Genres': [genre_instances[genre_id] for genre_id in genre_instances]}, fp, indent=4)

# Create access point to the Spotify API and return given access token
def get_spotify_access_token():
    global spotify_access_token

    # Spotify API Credentials
    spotify_client_id = '50effcfa2b804d1bafe4b0e9371b079a'
    spotify_client_secret = 'e4fbac04b3a44da4b0fb7b4ffe25ef12'

    # Spotify API Test Credentials
    # spotify_client_id = '9159ae5d05f84da8a969181af1b786cf'
    # spotify_client_secret = '96161c4bf45f410980432c795170494b'

    auth_str = f"{spotify_client_id}:{spotify_client_secret}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()

    spotify_auth_url = 'https://accounts.spotify.com/api/token'

    b64_headers = {'Authorization': f'Basic {b64_auth_str}'}
    data = {'grant_type': 'client_credentials'}

    # Obtain the access token
    response = requests.post(spotify_auth_url, headers=b64_headers, data=data)
    check_request_status(response)
    response = response.json()

    spotify_access_token = response['access_token']

def populate_from_playlists():
    global artist_instances

    for genre_id in genre_instances:
        genre_playlist_name = genres_to_playlists_test[genre_instances[genre_id]['name']]
        playlist = get_playlist_information(genre_playlist_name)

        num_artists = 0

        for item in playlist['items']:
            if (num_artists >= MAX_ARTISTS):
                break
            
            track = item['track']
            if track and 'album' in track and 'name' in track['album']:
                # Add track to top songs for genre
                genre_instances[genre_id]['topSongs'].append(track['album']['name'])

                # Get each artist on track and add to artist_instances if not already there
                for artist in track['artists']:
                    artist_name = artist['name']
                    artist_id = artist['id']

                    if artist_name not in artist_names:
                        artist_names.add(artist_name)

                        num_artists += 1

                        artist_instance = get_artist_information(artist_id)
                        if artist_instance != None:
                            artist_instances[artist_instance['id']] = artist_instance

# Given a playlist name, find its id and return its information
def get_playlist_information(playlist_name):
    spotify_headers = {'Authorization': f'Bearer {spotify_access_token}'}

    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': playlist_name,
        'type': 'playlist',
        'limit': 1,
        'offset': 0
    }

    # Search for Spotify playlist given playlist name
    response = requests.get(search_url, headers=spotify_headers,params=params)
    check_request_status(response)
    response = response.json()

    playlist_id = response['playlists']['items'][0]['id']

    playlist_items_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    # Get Spotify playlist information given playlist id
    response = requests.get(playlist_items_url, headers=spotify_headers)
    check_request_status(response)
    response = response.json()

    return response

# Perform a search request for a single artist using their name and return their id
def get_artist_id(artist_name) :
    # Define the headers with the access token
    spotify_headers = {'Authorization': f'Bearer {spotify_access_token}'}

    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': artist_name,
        'type': 'artist',
        'limit': 1,
        'offset': 0
    }

    response = requests.get(search_url, headers=spotify_headers, params=params)
    check_request_status(response)
    search_results = response.json()

    return search_results['artists']['items'][0]['id']

# Perform an artist request and populate a dictionary with relevant info
def get_artist_information(artist_id):
    artist_request = f'https://api.spotify.com/v1/artists/{artist_id}'

    access_token_headers = {'Authorization': f'Bearer {spotify_access_token}'}

    response = requests.get(artist_request, headers=access_token_headers)
    check_request_status(response)
    response = response.json()

    # Only create an artist instance if the artist belongs to a genre
    if 'genres' in response and len(response['genres']) > 0 and response['genres'][0] in subgenres_to_genres_test:
        genre_id = get_genre_id_from_name(subgenres_to_genres[response['genres'][0]])

        artist_instance = {
            'name': response['name'],
            'id': artist_id,
            'popularity': response['popularity'],
            'genreId': genre_id,
            'albums': [],
            'album_covers': [],
            'futureEvents': [],
            'image_url': 'None' if response['images'] == [] else response['images'][-1]['url']
        }

        populate_albums(artist_id, artist_instance)

        return artist_instance

    return None

# Given the artist id, perform an album request and return an array of album names
def populate_albums(artist_id, artist_instance):
    spotify_headers = {'Authorization': f'Bearer {spotify_access_token}'}

    search_url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'
    params = {'include_groups': 'album', 'limit': 3}

    response = requests.get(search_url, headers=spotify_headers, params=params)
    check_request_status(response)
    response = response.json()

    for album in response['items']:
        artist_instance['albums'].append(album['name'])
        artist_instance['album_covers'].append(album['images'][0]['url'])

# For each artist get their events and link to genre_instance
def populate_from_artist(artist_instance):
    artist_genre = genre_instances[artist_instance['genreId']]

    # Add artist to genre's artists
    artist_genre['popularArtists'].append(artist_instance['id'])

    artist_events = get_events_for_artist(artist_instance['id'], artist_instance['name'])

    for event in artist_events:
        artist_genre['upcomingEvents'].append(event['eventId'])
        artist_instance['futureEvents'].append(event['eventId'])
        event_instances.append(event)

        event['genreId'] = artist_genre['genreId']

        # Update artist_genre event price range if necessary
        if len(event['priceRange']) > 0:
            if len(artist_genre['eventsPriceRange']) == 0:
                artist_genre['eventsPriceRange'].append(event['priceRange'][0])
                artist_genre['eventsPriceRange'].append(event['priceRange'][1])
            else:
                if event['priceRange'][0] < artist_genre['eventsPriceRange'][0]:
                    artist_genre['eventsPriceRange'][0] = event['priceRange'][0]
                    
                if event['priceRange'][1] > artist_genre['eventsPriceRange'][1]:
                    artist_genre['eventsPriceRange'][1] = event['priceRange'][1]


# Return a list of events for a particular artist
def get_events_for_artist(artist_id, artist_name):
    event_search_url = 'https://app.ticketmaster.com/discovery/v2/events.json'

    params = {
        'apikey': ticketmaster_access_token,
        'keyword': artist_name, 
        'size': 5, # Limit the number of events returned for artist
        'classificationName': 'music', 
        'countryCode': 'US' # Filter only in the USA
    }

    response = requests.get(event_search_url, params=params)
    check_request_status(response)
    response = response.json()

    event_instances_local = []
    if '_embedded' in response:
        for event in response['_embedded']['events']: 

            # Make sure the event hasn't already been created
            if event['id'] not in event_ids:
                event_ids.add(event['id'])

                artists = []
                artists_ids = []
                if '_embedded' in event and 'attractions' in event['_embedded']:
                    for artist in event['_embedded']['attractions']:
                        if 'name' in artist:
                            artist_name = artist['name']
                            artist_id = get_artist_id(artist_name)

                            # Artist already exists, add event to their future events
                            if artist_id in artist_instances:
                                artist_instances[artist_id]['futureEvents'].append(event['id'])

                                artists.append(artist_instances[artist_id]['name'])
                                artists_ids.append(artist_id)
                            # Artist does not exist and has not been checked for valid genre
                            elif artist_name not in artist_names:
                                # Add artist name to list of checked artist names
                                artist_names.add(artist_name)

                                new_artist_instance = get_artist_information(artist_id)

                                # Want to validate artist has valid genre before adding them to list of artist names and ids for event
                                if new_artist_instance != None:
                                    artists.append(artist_name)
                                    artists_ids.append(artist_id)

                                    # For each artist in this event that does not exist, create an instance for it and add the event to their futureEvents
                                    add_supplemental_artist(new_artist_instance, event['id'])
            
                salesDateRange = ''
                if 'startDateTime' in event['sales']['public']:
                    salesDateRange += f"{event['sales']['public']['startDateTime']} to "
                    salesDateRange += event['sales']['public']['endDateTime']

                if 'images' in event and len(event['images']) > 0:
                    event_image_url = event['images'][0]['url']
            
                event_date = []
                if (not event['dates']['start']['dateTBD']):
                    tokens = (event['dates']['start']['localDate']).split('-')
                    event_date = [int(token) for token in tokens]

                price_range = []
                if ('priceRanges' in event and 'min' in event['priceRanges'][0] and 'max' in event['priceRanges'][0]):
                    price_range = [event['priceRanges'][0]['min'], event['priceRanges'][0]['max']]

                event_instance = {
                    'eventId': event['id'],
                    'eventName': event['name'],
                    'artistNames': artists,
                    'artistIds': artists_ids,
                    'dateAndTime': event_date, # [year, month, day]
                    'salesStart-End': salesDateRange,
                    'priceRange': price_range,
                    'genreId': '',
                    'venue': {},
                    'ticketmasterURL': event['url'],
                    'eventImageURL': event_image_url
                }

                get_venue(event, event_instance)

                event_instances_local.append(event_instance)

    return event_instances_local

# Create another artist instance (done for events with multiple artists, those of which do not have an artist_instance)
def add_supplemental_artist(new_artist_instance, event_id):
    new_artist_instance['futureEvents'].append(event_id)
    additional_artists.append(new_artist_instance)

def get_genre_id_from_name(genre_name):
    for genre_id in genre_instances:
        if genre_instances[genre_id]['name'] == genre_name:
            return genre_id

# Check if API call resulted in error
def check_request_status(response):
    if response.status_code != 200:
        print(f"Received status code {response.status_code}")
        print(f"Response content: {response.content}")
        print(f"Response headers: {response.headers}")
        response.raise_for_status()
    
if __name__ == "__main__":
    main()