# Authored By: Joseph Arteaga
# Co-Authored By: Christopher Huelitl
import json
import requests
import base64

from venue_info import get_venue

genres_playlist = {
    'Alternative': 'The New Alt',
    'Blues': 'Nu-Blue', # originally: 'Blues Classics'
    'Classical': 'Classical New Releases', # originally: Classical Essentials
    'Country': 'Hot Country',
    'Dance/Electronic': 'mint',
    'Folk': 'Roots Rising',
    'Hip-Hop/Rap': 'RapCaviar',
    'Jazz': 'State of Jazz', # originally: 'Jazz Classics'
    'Latin': 'Viva Latino',
    'Metal': 'Kickass Metal',
    'Pop': 'Summer Pop',
    'R&B': 'RNB X',
    'Reggae': 'Irie', # originally: 'Reggae Classics'
    'Religious': 'Top Christian & Gospel',
    'Rock': 'Legends Only' # originally: 'MARROW'
}

genres_playlist_test = {
    'Country': 'Hot Country',
    'Hip-Hop/Rap': 'RapCaviar',
    'Pop': 'Summer Pop'
}

MAX_ARTISTS = 15
artist_names = set()
event_ids = set()

artist_instances = []
event_instances = []
genre_instances = []

spotify_access_token = ''
ticketmaster_access_token = 'Y7AR2Y8hCu4MFHUa1acKZxWrvvvthY4d'

def main():
    get_spotify_access_token()
    populate_genres()
    populate_models()
    # print_all_instances()
    
# Populates all the models, using playlists as starting points
def populate_models():
    for genre_instance in genre_instances:
        genre_name = genre_instance['name']

        create_instances_from_playlist(genre_instance, genres_playlist[genre_name])

    create_json_files()

# Creates JSON files for each model
def create_json_files():
    with open ('artists.json', 'w') as fp:
        json.dump({'Artists': artist_instances}, fp, indent=4)

    with open ('events.json', 'w') as fp:
        json.dump({'Events': event_instances}, fp, indent=4)
    
    with open ('genres.json', 'w') as fp:
        json.dump({'Genres': genre_instances}, fp, indent=4)
    
# Create access point to the Spotify API and return given access token
def get_spotify_access_token():
    global spotify_access_token

    # Spotify API Credentials
    # spotify_client_id = '50effcfa2b804d1bafe4b0e9371b079a'
    # spotify_client_secret = 'e4fbac04b3a44da4b0fb7b4ffe25ef12'

    # Spotify API Test Credentials
    spotify_client_id = '9159ae5d05f84da8a969181af1b786cf'
    spotify_client_secret = '96161c4bf45f410980432c795170494b'

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
                if (genre['name'] in genres_playlist):
                    genre_instance = {
                        'genreId': genre['id'],
                        'name': genre['name'],
                        'popularArtists': [],
                        'upcomingEvents': [],
                        'topSongs': [],
                        'eventsPriceRange': []
                    }
                    genre_instances.append(genre_instance)

# Given a playlist name, it populates a genre with artists and songs from the playlist
def create_instances_from_playlist(genre_instance, playlist_name):
    global artist_instances
    global event_instances

    spotify_headers = {'Authorization': f'Bearer {spotify_access_token}'}

    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': playlist_name,
        'type': 'playlist',
        'limit': 1,
        'offset': 0
    }

    response = requests.get(search_url, headers=spotify_headers,params=params)
    check_request_status(response)
    response = response.json()

    playlist_id = response['playlists']['items'][0]['id']

    playlist_items_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    response = requests.get(playlist_items_url, headers=spotify_headers)
    check_request_status(response)
    response = response.json()

    num_artists = 0

    min_price = 100000
    max_price = -1

    for item in response['items']:
        if (num_artists >= MAX_ARTISTS):
                break
        track = item['track']
        if track and 'album' in track and 'name' in track['album']:
            genre_instance['topSongs'].append(track['album']['name'])

            artist_name = track['artists'][0]['name']
            artist_id = track['artists'][0]['id']

            if (artist_name not in artist_names):
                num_artists += 1
                genre_instance['popularArtists'].append(artist_id)

                artist_names.add(artist_name)
                event_results, artist_instance = get_artist_information(artist_id)

                artist_instance['genreId'] = genre_instance['genreId']
                artist_instances.append(artist_instance)

                for event in event_results:
                    if (event['priceRange']):
                        if (event['priceRange'][0] < min_price):
                            min_price = event['priceRange'][0]
                        if (event['priceRange'][1] > max_price):
                            max_price = event['priceRange'][1]
                    event['genreId'] = genre_instance['genreId']
                    if (event['eventId'] not in event_ids):
                        event_instances.append(event)
                        event_ids.add(event['eventId'])
                    artist_instance['futureEvents'].append(event['eventId'])
                    genre_instance['upcomingEvents'].append(event['eventId'])

    genre_instance['eventsPriceRange'].append(min_price)
    genre_instance['eventsPriceRange'].append(max_price)

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

    artist_instance = {
        'name': response['name'],
        'id': artist_id,
        'popularity': response['popularity'],
        'genreId': '',
        'albums': [],
        'album_covers': [],
        'futureEvents': [],
        'image_url': 'None' if response['images'] == [] else response['images'][-1]['url']
    }
    
    populate_albums(artist_id, artist_instance)

    venue_results = get_events_for_artist(response['name'], artist_id)

    return venue_results, artist_instance

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

# Return a list of events for a particular artist
def get_events_for_artist(artist_name, artist_id):
    event_search_url = 'https://app.ticketmaster.com/discovery/v2/events.json'

    params = {
        'apikey': ticketmaster_access_token,
        'keyword': artist_name, 
        'size': 5, # Limit the number of events returned for artist
        'classificationName': 'music',
        # 'locale': 'en-us', 
        'countryCode': 'US' # Filter only in the USA
    }

    response = requests.get(event_search_url, params=params)
    check_request_status(response)
    response = response.json()

    event_instances_local = []
    if '_embedded' in response:
        for event in response['_embedded']['events']: 
            
            salesDateRange = ''
            if 'startDateTime' in event['sales']['public']:
                salesDateRange += f"{event['sales']['public']['startDateTime']} to "
                salesDateRange += event['sales']['public']['endDateTime']
            
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
                'artistNames': [artist_name,],
                'artistIds': [artist_id,],
                'dateAndTime': event_date, # [year, month, day]
                'salesStart-End': salesDateRange,
                'priceRange': price_range,
                'genreId': '',
                'venue': {},
                'ticketmasterURL': event['url']
            }

            get_venue(event, event_instance)

            event_instances_local.append(event_instance)

    return event_instances_local

# Check if API call resulted in error
def check_request_status(response):
    if response.status_code != 200:
        print(f"Received status code {response.status_code}")
        print(f"Response content: {response.content}")
        print(f"Response headers: {response.headers}")
        response.raise_for_status()

# Prints all the data retrieved from APIs
def print_all_instances():
    print("---Artists---")
    for artist_instance in artist_instances:
        print(artist_instance)
        print("\n")
    print("---Genres---")
    for genre_instance in genre_instances:
        print(genre_instance)
        print("\n")
    print("---Events---")
    for event_instance in event_instances:
        print(event_instance)
        print("\n")

if __name__ == "__main__":
    main()