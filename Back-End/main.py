# Authored By: Joseph Arteaga

# from flask import Flask, render_template
# from flask import Flask, render_template, request, url_for, redirect, json, json

import requests
import base64

def main():
    # Get Authorization for Spotify API
    spotify_access_token = getSpotifyAccessToken() 

    artist_instances = []
    # venue_instances = []

    # ISSUE: Genres in this list are not comprehensive to those used in artist_instances
    genre_instances = populateGenres(spotify_access_token)

    # Sample artists 
    artist_names = ['Zach Bryan', 'Billie Eilish', 'Jason Aldean']

    # Populate artist_instances with dictionaries of each artist
    for artist_name in artist_names:
        artist_id = getArtistId(spotify_access_token, artist_name)
        artist_instances += [getArtistInformation(artist_id, spotify_access_token)]

    # FOR DEBUGGING PURPOSES ONLY
    # for artist in artist_instances:
       # print(artist)
    
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

# Perform a search request for the artist using their name and return their id
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
    spotify_headers = {
        'Authorization': f'Bearer {access_token}'
    }

    search_url = 'https://api.spotify.com/v1/recommendations/available-genre-seeds'

    response = (requests.get(search_url, headers=spotify_headers)).json()
    genre_instances = []
    for genre in response['genres']:
        genre_instance = {
            'name': f'{genre}',
            'popularArtist': [],
            'upcomingEvents': [],
            'popularityInUSA': '',
            'topSongs': [],
            'eventsPriceRange': ''
        }
        genre_instances += [genre_instance]
    return genre_instances

if __name__ == "__main__":
    main()