# Authored By: Joseph Arteaga
# Co-Authored By: Christopher Huelitl
# from flask import Flask, jsonify
import requests
import base64

# app = Flask(__name__)
# @app.route('/')
# def index():
#     return "Hello World"

def main():
    artist_names = set()
    artist_instances = []
    venue_instances = []
    genre_instances = []    

    # Access tokens for each API
    spotify_access_token = getSpotifyAccessToken() 
    ticketmaster_access_token = 'Y7AR2Y8hCu4MFHUa1acKZxWrvvvthY4d'
    google_access_token = 'AIzaSyAVFsqiUBPbEIyxqbjoJlAh9ylHNnWT4k8'

    genre_instances = populateGenres(ticketmaster_access_token)
    sortInstances(genre_instances, 'name', '', False)
    
    playlist_names = ['The New Alt', 'Blues Classics', 'Classical Essentials', 'Hot Country', 'mint', 'Roots Rising', 'RapCaviar', 'Jazz Classics', 'Viva Latino', 'Kickass Metal', 'Summer Pop', 'RNB X', 'Reggae Classics', 'Top Christian & Gospel', 'Legends Only']

    playlist_index = 0
    for genre in genre_instances:
        # print(f"---------{playlist_names[playlist_index]}---------\n")
        populateGenreFromPlaylist(spotify_access_token, genre, playlist_names[playlist_index], artist_names, artist_instances)
        playlist_index += 1

    # FOR DEBUGGING PURPOSES ONLY
    # for artist in artist_instances:
       # print(artist)

# Sorts an array of instances based on an attribute of said instances
def sortInstances(instances, attribute_one, attribute_two, reverse):
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
def getSpotifyAccessToken():
    # Spotify API credentials
    spotify_client_id = '50effcfa2b804d1bafe4b0e9371b079a'
    spotify_client_secret = 'e4fbac04b3a44da4b0fb7b4ffe25ef12'

    auth_str = f"{spotify_client_id}:{spotify_client_secret}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()
    spotify_auth_url = 'https://accounts.spotify.com/api/token'
    b64_headers = {
        'Authorization': f'Basic {b64_auth_str}'
    }
    data = {
        'grant_type': 'client_credentials'
    }

    # Obtain the access token
    response = requests.post(spotify_auth_url, headers=b64_headers, data=data)
    auth_response_data = response.json()
    access_token = auth_response_data['access_token']
    return access_token

# Perform a search request for a single artist using their name and return their id
def getArtistId(access_token, artist_name) :
    # Define the headers with the access token
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': artist_name,
        'type': 'artist',
        'limit': 1,
        'offset': 0
    }

    response = requests.get(search_url, headers=spotify_headers, params=params)
    search_results = response.json()

    artist_id = (search_results['artists']['items'][0]['id'])

    return artist_id

# Perform an artist request and populate a dictionary with relevant info
def getArtistInformation(artist_id, access_token):
    artist_request = f'https://api.spotify.com/v1/artists/{artist_id}'
    access_token_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    response = (requests.get(artist_request, headers=access_token_headers)).json()

    artist_information = {
        'name': response['name'],
        'id': f'{artist_id}',
        'yearOfBirth': '',
        'country': '',
        'popularity': response['popularity'],
        'genre': 'None' if response['genres'] == [] else response['genres'][0],
        'albums': [],
        'album_covers': [],
        'futureEvents': [],
        'image_url': 'None' if response['images'] == [] else response['images'][-1]['url']
    }
    
    populateAlbums(access_token, artist_id, artist_information)

    return artist_information

# Given the artist id, perform an album request and return an array of album names
def populateAlbums(access_token, artist_id, artist_information):
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    search_url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'
    params = {
        'include_groups': 'album'
    }

    response = (requests.get(search_url, headers=spotify_headers, params=params)).json()

    for album in response['items']:
        artist_information['albums'] += [album['name']]
        artist_information['album_covers'] += [album['images'][0]['url']]

# Retrieve a list of all genres used by spotify to populate Genre Model
def populateGenres(access_token):
    genres_request = 'https://app.ticketmaster.com/discovery/v2/classifications.json'

    excluded_genres = ('Ballads/Romantic', 'Chanson Francaise', 'Children\'s Music', 'Holiday', 'Medieval/Renaissance', 'New Age', 'Other', 'Undefined', 'World')

    params = {'apikey': access_token}
    response = (requests.get(genres_request, params=params)).json()

    genre_instances = []
    for classification in response['_embedded']['classifications']:
        if 'segment' in classification and classification['segment']['name'] == 'Music':
            for genre in classification['segment']['_embedded']['genres']:
                if (genre['name'] not in excluded_genres):
                    genre_instance = {
                        'genreId': genre['id'],
                        'name': genre['name'],
                        'popularArtists': [],
                        'upcomingEvents': [],
                        'topSongs': [],
                        'eventsPriceRange': ''
                    }
                    genre_instances += [genre_instance]

    return genre_instances

# Given a playlist name, it populates a genre with artists and songs from the playlist
def populateGenreFromPlaylist(access_token, genre_instance, playlist_name, artist_names, artist_instances):
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': playlist_name,
        'type': 'playlist',
        'limit': 1,
        'offset': 0
    }

    response = (requests.get(search_url, headers=spotify_headers,params=params)).json()

    playlist_id = response['playlists']['items'][0]['id']

    playlist_items_url = f'https://api.spotify.com/v1/playlists/{playlist_id}/tracks'

    response = (requests.get(playlist_items_url, headers=spotify_headers)).json()

    for item in response['items']:
        track = item['track']
        artist_name = track['artists'][0]['name']
        artist_id = track['artists'][0]['id']

        if (artist_name not in artist_names):
            artist_names.add(artist_name)
            artist_instances += getArtistInformation(artist_id, access_token)

        # FOR DEBUGGING PURPOSES ONLY
        # print(f"Track Name: {track['name']}, By: {artist_name}\n")


# Return a list of events for a particular artist
def getEventsForArtist(access_token, artist_name, google_api_key) :
    event_search_url = 'https://app.ticketmaster.com/discovery/v2/events.json'

    params = {
        'apikey': access_token,
        'keyword': artist_name, 
        'classificationName': 'music',
        'locale': 'en-us', # filter only in the USA
    }

    response = (requests.get(event_search_url, params=params)).json()

    venue_instances = []
    for event in response['_embedded']['events']: 
        address = event['_embedded']['venues'][0]['address']['line1']
        address += f", {event['_embedded']['venues'][0]['city']['name']}"
        address += f", {event['_embedded']['venues'][0]['state']['name']}"

        salesDateRange = f"{event['sales']['public']['startDateTime']} to "
        salesDateRange += event['sales']['public']['endDateTime']

        event_instance = {
            'event_id': event['id'],
            'event_name': event['name'],
            'artist_names': [artist_name,],
            'dateAndTime': event['dates']['start']['localDate'] if not (event['dates']['start']['dateTBD']) else 'TBD',
            'salesStart-End': salesDateRange,
            'priceRange': "TBD" if 'priceRanges' not in event else f"${event['priceRanges'][0]['min']} to ${event['priceRanges'][0]['max']}",
            'genre': event['classifications'][0]['genre']['name'],
            'venue': {},
            'ticketmasterURL': event['url']
        }

        venue_id = getVenueId(event['_embedded']['venues'][0]['name'], google_api_key)
        event_instance['venue'] = getVenueInformation(google_api_key, venue_id)

        event_instance['venue']['name'] = event['_embedded']['venues'][0]['name']
        event_instance['venue']['address'] = address

        venue_instances += [event_instance]

        return venue_instances


# Return a given place's id given the address
def getVenueId(venue_name, google_api_key): 
    # Text search request based on venue address
    BASE_URL = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    
    # Fields to retrieve
    fields = 'place_id,name'
    
    # Construct the request URL with parameters
    url = f"{BASE_URL}?query={venue_name}&fields={fields}&key={google_api_key}"
    response = (requests.get(url)).json()

    return response['results'][0]['place_id']

# Populate the venue with its website, phone number, and rating
def getVenueInformation(google_api_key, venue_id):

    venue_details_url = f'https://places.googleapis.com/v1/places/{venue_id}?fields=nationalPhoneNumber,rating,websiteUri&key={google_api_key}'

    response = (requests.get(venue_details_url)).json()

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
gitlab_api_url = f'https://https://gitlab.com/api/v4/projects/{59330677}/repository/commits'

# @app.route('/commits', methods=['GET'])
def get_commits():
    headers = {'PRIVATE-TOKEN': gitlab_access_token}
    response = requests.get(gitlab_api_url, headers=headers)
    
    if response.status_code == 200:
        commits = response.json()
        return jsonify(commits)
    else:
        return jsonify({'error': 'Failed to fetch commits'}), response.status_code


if __name__ == "__main__":
    main()
    #app.run()