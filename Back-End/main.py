# from flask import Flask, render_template

# Artists Billie Eilish, Zach Bryan, Jason Aldean
# Genres: Pop, Country, Rock
# Venues: TD Garden (Boston, MA), Caesars Superdome (New Orleans, LA), Brick's Off road Park (Poplar Bluff, MO)

# from flask import Flask, render_template, request, url_for, redirect, json, json

import requests
import base64

# Spotify API credentials
client_id = '50effcfa2b804d1bafe4b0e9371b079a'
client_secret = 'e4fbac04b3a44da4b0fb7b4ffe25ef12'

auth_str = f"{client_id}:{client_secret}"
b64_auth_str = base64.b64encode(auth_str.encode()).decode()

# Define the headers and data for the POST request
auth_url = 'https://accounts.spotify.com/api/token'
headers = {
    'Authorization': f'Basic {b64_auth_str}'
}
data = {
    'grant_type': 'client_credentials'
}

# Obtain the access token
response = requests.post(auth_url, headers=headers, data=data)
auth_response_data = response.json()
access_token = auth_response_data['access_token']

# Define the headers with the access token
headers = {
    'Authorization': f'Bearer {access_token}'
}

# Get a list of venues from Stub Hub, get the artists name from the each venue's lineup, pass that into a search request to get artist id, then do an artist request

# Make a GET request to the Spotify API using search request
# To obtain uri of artists and extract artist id
search_url = 'https://api.spotify.com/v1/search'
params = {
    'q': 'Zach Bryan+Billie Eilish',
    'type': 'artist',
    'limit': 2,
    'offset': 0
}

response = requests.get(search_url, headers=headers, params=params)
search_results = response.json()

artist_id = (search_results['artists']['items'][0]['uri']).split(':')[-1]

# Get artist information 
search_url = f'https://api.spotify.com/v1/artists/{artist_id}'
response = requests.get(search_url, headers=headers)
print(response.json())

# Artist Name
# popularity
# genre 
