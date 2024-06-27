from unittest import main, TestCase
from main import getArtistInformation, getArtistId, getSpotifyAccessToken, populateGenres, populateAlbums
import base64

token = getSpotifyAccessToken() # Spotify Access Token
class MyUnitTests (TestCase):
    #Testing if name and ID match 
    def test_getArtistInfo_nameID(self):
        beyonce, adele, dualipa = "6vWDO969PvNqNYHIOW5v0m", "4dpARuHxo51G3z768sgnrY", "6M2wZ9GZgrQXHCFfjv46we"
        bey_info = getArtistInformation(beyonce, token) 
        adele_info = getArtistInformation(adele, token)
        dua_info = getArtistInformation(dualipa, token)
        
        self.assertEqual(bey_info['name'], "Beyoncé")
        self.assertEqual(adele_info['name'], "Adele")
        self.assertEqual(dua_info['name'], "Dua Lipa")
        
    #Testing if genre and ID match
    def test_getArtistInfo_genre(self):
        theStrokes, maluma, ariana_grande = "0epOFNiUfyON9EYx7Tpr6V", "1r4hJ1h58CWwUQe3MxPuau", "66CXWjxzNUsdJxJ2JdwvnR"
        stroke_info = getArtistInformation(theStrokes, token)
        maluma_info = getArtistInformation(maluma, token)
        ari_info = getArtistInformation(ariana_grande, token)
        
        self.assertEqual(stroke_info['genre'], "alternative rock")
        self.assertEqual(maluma_info['genre'], "latin pop")
        self.assertEqual(ari_info['genre'], "pop")
    
    #Testing if genre and ID match
    def test_getArtistInfo_pop(self):
        grupoFrontera, radioHead, vanbur = "6XkjpgcEsYab502Vr1bBeW", "4Z8W4fKeB5YxbusRsdQVPb", "0R2bPrDcf0qEFHbQazwiXj"
        
        front_info = getArtistInformation(grupoFrontera, token)
        radio_info = getArtistInformation(radioHead, token)
        vanbur_info = getArtistInformation(vanbur, token)
        
        self.assertEqual(front_info['popularity'], 83)
        self.assertEqual(radio_info['popularity'], 80)
        self.assertEqual(vanbur_info['popularity'], 46)
        
    #Testing if ID is properly returned
    def test_getArtistId(self):
        beyonce, adele, dualipa = getArtistId(token, "Beyoncé"), getArtistId(token, "Adele"), getArtistId(token, "Dua Lipa")
        
        self.assertEqual(beyonce, "6vWDO969PvNqNYHIOW5v0m")  
        self.assertEqual(adele, "4dpARuHxo51G3z768sgnrY")
        self.assertEqual(dualipa, "6M2wZ9GZgrQXHCFfjv46we")      
        
    def test_populateGenres(self):
        pass
    def test_populateAlbums(self):
        pass
    
if __name__ == "__main__":
    main()