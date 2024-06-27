# from flask import Flask, render_template

# Artists Billie Eilish, Zach Bryan, Jason Aldean
# Genres: Pop, Country, Rock
# Venues: TD Garden (Boston, MA), Caesars Superdome (New Orleans, LA), Brick's Off road Park (Poplar Bluff, MO)

# from flask import Flask, render_template, request, url_for, redirect, json, json

import requests
import base64

def main():
    spotify_access_token = getSpotifyAccessToken() # Get Authorization for Spotify API

    artist_instances = []
    # venue_instances = []

    # ISSUE: Genres in this list are not comprehensive to those used in artist_instances
    genre_instances = populateGenres(spotify_access_token)

    artist_names = ['Zach Bryan', 'Billie Eilish', 'Jason Aldean']

    # Data storage for Artist Model
    for artist_name in artist_names:
        artist_id = getArtistId(spotify_access_token, artist_name)
        artist_instances += [getArtistInformation(artist_id, spotify_access_token)]

    # FOR DEBUGGING PURPOSES ONLY
    # for artist in artist_instances:
        print(artist)
    
    
def getSpotifyAccessToken():
    # Spotify API credentials
    spotify_client_id = '50effcfa2b804d1bafe4b0e9371b079a'
    spotify_client_secret = 'e4fbac04b3a44da4b0fb7b4ffe25ef12'
    auth_str = f"{spotify_client_id}:{spotify_client_secret}"
    b64_auth_str = base64.b64encode(auth_str.encode()).decode()

    # Define the headers and data for the POST request
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

def getArtistId(access_token, artist_name) :
    # Define the headers with the access token
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    # Make a GET request to the Spotify API using search request
    # To obtain uri of artists and extract artist id
    search_url = 'https://api.spotify.com/v1/search'
    params = {
        'q': artist_name,
        'type': 'artist',
        'limit': 2,
        'offset': 0
    }

    response = requests.get(search_url, headers=spotify_headers, params=params)
    search_results = response.json()

    artist_id = (search_results['artists']['items'][0]['id'])

    return artist_id

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
        'genre': response['genres'][0],
        'albums': populateAlbums(access_token, artist_id),
        'futureEvents': []
    }

    return artist_information

def populateAlbums(access_token, artist_id):
    # Define the headers with the access token
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    search_url = f'https://api.spotify.com/v1/artists/{artist_id}/albums'

    response = (requests.get(search_url, headers=spotify_headers)).json()
    albums = []
    for item in response['items']:
        if item['album_type'] == 'album':
            albums += [item['name']]
    
    return albums

def populateGenres(access_token):
    # Define the headers with the access token
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    search_url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds'

    response = (requests.get(search_url, headers=spotify_headers)).json()
    return response['genres']

if __name__ == "__main__":
    main()