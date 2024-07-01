# Authored By: Joseph Arteaga
# Co-Authored By: Christopher Huelitl
# from flask import Flask, jsonify, render_template
import requests
import base64

# app = Flask(__name__)
# @app.route('/')
# def index():
#     return render_template('index.html')

artist_names = set()
artists_instances = {}
venue_instances = {}
genre_instances = {}


# Access tokens for each API
spotify_access_token = ''
ticketmaster_access_token = 'Y7AR2Y8hCu4MFHUa1acKZxWrvvvthY4d'
google_access_token = 'AIzaSyAVFsqiUBPbEIyxqbjoJlAh9ylHNnWT4k8'


def main():
    get_spotify_access_token()
    populate_genres()

    # global genre_instances
    # for key in genre_instances:
    #     print(f"{key} points to: {genre_instances[key]}\n\n")
    
    playlist_names = ['The New Alt', 'Blues Classics', 'Classical Essentials', 'Hot Country', 'mint', 'Roots Rising', 'RapCaviar', 'Jazz Classics', 'Viva Latino', 'Kickass Metal', 'Summer Pop', 'RNB X', 'Reggae Classics', 'Top Christian & Gospel', 'Legends Only']

    playlist_names_limited = ['The New Alt', 'Hot Country', 'RapCaviar', 'Viva Latino', 'Summer Pop', 'Legends Only']

    playlist_names_test = ['Hot Country', 'RapCaviar', 'Summer Pop']

    # playlist_index = 0
    # for genre_id in genre_instances:
    #     create_instances_from_playlist(genre_instances[genre_id], playlist_names_test[playlist_index])
    #     playlist_index += 1

    # print("---Artists---")
    # for artist_key in artists_instances:
    #     print(artists_instances[artist_key])
    #     print("\n")
    # print("---Genres---")
    # for genre_key in genre_instances:
    #     print(genre_instances[genre_key])
    #     print("\n")
    # print("---Events---")
    # for event_key in venue_instances:
    #     print(venue_instances[event_key])
    #     print("\n")

    print(get_commits())


# Sorts an array of instances based on an attribute of said instances
def sort_instances(instances, attribute_one, attribute_two, reverse):
    if (not attribute_two):
        if attribute_one not in instances:
            return "Attribute not found for instances"

        if isinstance(instances[attribute_one], list):
            return sorted(instances, key=lambda instance: instance[attribute_one][0])

        return sorted(instances, key=lambda instance: instance[attribute_one], reverse=reverse)
    else:
        if attribute_one not in instances or attribute_two not in instances[attribute_one]:
            return "Attributes not found for instances"
        return sorted(instances, key=lambda instance: instance[attribute_one][attribute_two], reverse=reverse)

    
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

# Perform a search request for a single artist using their name and return their id
def get_artist_id(artist_name) :
    global spotify_access_token

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
    global spotify_access_token

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

    venue_results = get_events_for_artist(response['name'])

    return venue_results, artist_instance

# Given the artist id, perform an album request and return an array of album names
def populate_albums(artist_id, artist_instance):
    global spotify_access_token

    spotify_headers = {'Authorization': f'Bearer {spotify_access_token}'}

    search_url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'
    params = {'include_groups': 'album'}

    response = requests.get(search_url, headers=spotify_headers, params=params)
    check_request_status(response)
    response = response.json()

    for album in response['items']:
        artist_instance['albums'] += [album['name']]
        artist_instance['album_covers'] += [album['images'][0]['url']]

# Retrieve a list of all genres used by spotify to populate Genre Model
def populate_genres():
    genres_request = 'https://app.ticketmaster.com/discovery/v2/classifications.json'

    excluded_genres = ('Ballads/Romantic', 'Chanson Francaise', 'Children\'s Music', 'Holiday', 'Medieval/Renaissance', 'New Age', 'Other', 'Undefined', 'World')

    excluded_genres_limited = ('Ballads/Romantic', 'Blues', 'Chanson Francaise', 'Children\'s Music', 'Classical', 'Dance/Electronic', 'Folk', 'Holiday', 'Jazz', 'Medieval/Renaissance', 'Metal', 'New Age', 'Other', 'R&B', 'Reggae', 'Religious', 'Undefined', 'World')

    excluded_genres_test = ('Alternative', 'Ballads/Romantic', 'Blues', 'Chanson Francaise', 'Children\'s Music', 'Classical', 'Dance/Electronic', 'Folk', 'Holiday', 'Jazz', 'Latin', 'Medieval/Renaissance', 'Metal', 'New Age', 'Other', 'R&B', 'Reggae', 'Religious', 'Rock', 'Undefined', 'World')

    global ticketmaster_access_token
    params = {'apikey': ticketmaster_access_token}

    response = requests.get(genres_request, params=params)
    check_request_status(response)
    response = response.json()

    global genre_instances
    for classification in response['_embedded']['classifications']:
        if 'segment' in classification and classification['segment']['name'] == 'Music':
            for genre in classification['segment']['_embedded']['genres']:
                if (genre['name'] not in excluded_genres_test):
                    genre_instance = {
                        'genreId': genre['id'],
                        'name': genre['name'],
                        'popularArtists': [],
                        'upcomingEvents': [],
                        'topSongs': [],
                        'eventsPriceRange': ''
                    }
                    genre_instances[genre['id']] = genre_instance

# Given a playlist name, it populates a genre with artists and songs from the playlist
def create_instances_from_playlist(genre_instance, playlist_name):
    global spotify_access_token

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

    # PHASE #1: Only Three Instances
    max_artists = 3
    num_artists = 0

    for item in response['items']:
        if (num_artists >= max_artists):
                break
        track = item['track']
        genre_instance['topSongs'] += [track['album']['name']]

        artist_name = track['artists'][0]['name']
        artist_id = track['artists'][0]['id']

        if (artist_name not in artist_names):
            num_artists += 1
            genre_instance['popularArtists'] += [artist_id]

            artist_names.add(artist_name)
            venue_results, artist_instance = get_artist_information(artist_id)

            artist_instance['genreId'] = genre_instance['genreId']
            artists_instances[artist_instance['id']] = artist_instance

            for venue in venue_results:
                venue['genreId'] = genre_instance['genreId']
                venue_instances[venue['eventId']] = venue
                artist_instance['futureEvents'] += [venue['eventId']]
                genre_instance['upcomingEvents'] += [venue['eventId']]

        # FOR DEBUGGING PURPOSES ONLY
        # print(f"Track Name: {track['name']}, By: {artist_name}\n")


# Return a list of events for a particular artist
def get_events_for_artist(artist_name):
    global ticketmaster_access_token

    event_search_url = 'https://app.ticketmaster.com/discovery/v2/events.json'

    params = {
        'apikey': ticketmaster_access_token,
        'keyword': artist_name, 
        'size': 5, # Limit the number of events returned for artist
        'classificationName': 'music',
        'locale': 'en-us', # filter only in the USA
    }

    response = requests.get(event_search_url, params=params)
    check_request_status(response)
    response = response.json()

    venue_instances = []
    if '_embedded' in response:
        for event in response['_embedded']['events']: 
            address = ''
            if 'address' in event['_embedded']['venues'][0]:
                address += event['_embedded']['venues'][0]['address']['line1'] if 'line1' in event['_embedded']['venues'][0]['address'] else ''

            address += f", {event['_embedded']['venues'][0]['city']['name']}" if 'city' in event['_embedded']['venues'][0] else ''

            address += f", {event['_embedded']['venues'][0]['state']['name']}" if 'state' in event['_embedded']['venues'][0] else ''

            salesDateRange = ''
            if 'startDateTime' in event['sales']['public']:
                salesDateRange += f"{event['sales']['public']['startDateTime']} to "
                salesDateRange += event['sales']['public']['endDateTime']

            event_instance = {
                'eventId': event['id'],
                'eventName': event['name'],
                'artistNames': [artist_name,],
                'dateAndTime': event['dates']['start']['localDate'] if not (event['dates']['start']['dateTBD']) else 'TBD',
                'salesStart-End': salesDateRange,
                'priceRange': "TBD" if 'priceRanges' not in event else f"${event['priceRanges'][0]['min']} to ${event['priceRanges'][0]['max']}",
                'genreId': '',
                'venue': {},
                'ticketmasterURL': event['url']
            }

            if 'name' in event['_embedded']['venues'][0]:
                venue_id = get_venue_id(event['_embedded']['venues'][0]['name'])
                event_instance['venue'] = get_venue_information(venue_id)
                event_instance['venue']['name'] = event['_embedded']['venues'][0]['name']
                event_instance['venue']['address'] = address
            else:
                event_instance['venue'] = 'Unavailable'

            venue_instances += [event_instance]

    return venue_instances


# Return a given place's id given the address
def get_venue_id(venue_name): 
    global google_access_token

    # Text search request based on venue address
    BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    
    # Fields to retrieve
    fields = 'place_id,name'
    
    # Construct the request URL with parameters
    url = f"{BASE_URL}?query={venue_name}&fields={fields}&key={google_access_token}"
    response = requests.get(url)
    check_request_status(response)
    response = response.json()

    return response['results'][0]['place_id']

# Populate the venue with its website, phone number, and rating
def get_venue_information(venue_id):
    global google_access_token

    venue_details_url = f'https://places.googleapis.com/v1/places/{venue_id}?fields=nationalPhoneNumber,rating,websiteUri&key={google_access_token}'

    response = requests.get(venue_details_url)
    check_request_status(response)
    response = response.json()

    venue_information = {
        'name': '',
        'address': '',
        'phoneNumber': "Unavailable" if 'nationalPhoneNumber' not in response else response['nationalPhoneNumber'],
        'rating': "Unavailable" if 'rating' not in response else f"{response['rating']} / 5",
        'website': "Unavailable" if 'websiteUri' not in response else response['websiteUri']
    }

    return venue_information

# GitLab REST API
gitlab_project_id = '59330677'
gitlab_access_token = 'glpat-1xy11CZ5q9ps6cjSeruK'
gitlab_api_url = f'https://gitlab.com/api/v4/projects/{gitlab_project_id}/repository/commits'

# @app.route('/commits', methods=['GET'])
def get_commits():
    headers = {'PRIVATE-TOKEN': gitlab_access_token}
    response = requests.get(gitlab_api_url, headers=headers)

    params = {'per_page': 100, 'page': 1}
    
    commits = []
    response = requests.get(gitlab_api_url, headers=headers, params=params)
    if response.status_code == 200:
        response = response.json()
        commits.extend(response)
    
    commits_per_author = {}
    for commit in commits:
        author_name = commit['author_name']
        if (author_name not in commits_per_author):
            commits_per_author[author_name] = 1
        else:
            commits_per_author[author_name] += 1
    
    for author in commits_per_author:
        print(f"{author} has performed {commits_per_author[author]} commits")


# Check if API call resulted in error
def check_request_status(response):
    if response.status_code != 200:
        print(f"Received status code {response.status_code}")
        print(f"Response content: {response.content}")
        print(f"Response headers: {response.headers}")
        response.raise_for_status()

if __name__ == "__main__":
    #app.run()
    main()