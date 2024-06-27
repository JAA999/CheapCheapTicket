# Authored By: Christopher Huelitl
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
    
    #Testing if all proper albums are returned for a given artist ID
    def test_getArtistInfo_albums(self):
        theStrokes, maluma, ariana_grande = "0epOFNiUfyON9EYx7Tpr6V", "1r4hJ1h58CWwUQe3MxPuau", "66CXWjxzNUsdJxJ2JdwvnR"
        strokes_lst = getArtistInformation("0epOFNiUfyON9EYx7Tpr6V", token)
        maluma_lst = getArtistInformation("1r4hJ1h58CWwUQe3MxPuau", token)
        ari_lst = getArtistInformation("66CXWjxzNUsdJxJ2JdwvnR", token)
        
        strokes_ans = ["The Singles - Volume 01", "The New Abnormal", "Comedown Machine", "Angles", "First Impressions Of Earth", "Room On Fire", "Is This It"]
        maluma_ans = ["Don Juan", "The Love & Sex Tape (Deluxe Edition)", "The Love & Sex Tape", "Marry Me (Original Motion Picture Soundtrack)", "#7DJ (7 Días En Jamaica)", "PAPI JUANCHO", "11:11", "F.A.M.E.", "Pretty Boy, Dirty Boy", "PB.DB. The Mixtape", "Magia"]
        ari_ans = ["eternal sunshine (slightly deluxe)", "eternal sunshine", "Yours Truly (Tenth Anniversary Edition)", "Positions (Deluxe)", "Positions", "k bye for now (swt live)", "thank u, next", "Sweetener", "Dangerous Woman", "My Everything (Deluxe)", "Yours Truly"]
        
        self.assertEqual(strokes_ans, strokes_lst['albums'])
        self.assertEqual(maluma_ans, maluma_lst['albums'])
        self.assertEqual(ari_ans, ari_lst['albums'])
    
if __name__ == "__main__":
    main()