# Authored By: Christopher Huelitl
from unittest import main, TestCase
from main import get_artist_information, get_artist_id, get_spotify_access_token, populate_genres, populate_albums
import base64

get_spotify_access_token()

class MyUnitTests (TestCase):
    #Testing if name and ID match 
    def test_get_artist_info_name(self):
        beyonce, adele, dualipa = "6vWDO969PvNqNYHIOW5v0m", "4dpARuHxo51G3z768sgnrY", "6M2wZ9GZgrQXHCFfjv46we"
        venue_results, bey_info = get_artist_information(beyonce) 
        venue_results, adele_info = get_artist_information(adele)
        venue_results, dua_info = get_artist_information(dualipa)
        
        self.assertEqual(bey_info['name'], "Beyoncé")
        self.assertEqual(adele_info['name'], "Adele")
        self.assertEqual(dua_info['name'], "Dua Lipa")
    
    #Testing if genre and ID match
    def test_get_artist_info_popularity(self):
        grupoFrontera, radioHead, vanbur = "6XkjpgcEsYab502Vr1bBeW", "4Z8W4fKeB5YxbusRsdQVPb", "0R2bPrDcf0qEFHbQazwiXj"
        
        venue_results, front_info = get_artist_information(grupoFrontera)
        venue_results, radio_info = get_artist_information(radioHead)
        venue_results, vanbur_info = get_artist_information(vanbur)
        
        self.assertEqual(front_info['popularity'], 83)
        self.assertEqual(radio_info['popularity'], 80)
        self.assertEqual(vanbur_info['popularity'], 46)
        
    #Testing if ID is properly returned
    def test_get_artist_id(self):
        beyonce, adele, dualipa = get_artist_id("Beyoncé"), get_artist_id("Adele"), get_artist_id("Dua Lipa")
        
        self.assertEqual(beyonce, "6vWDO969PvNqNYHIOW5v0m")  
        self.assertEqual(adele, "4dpARuHxo51G3z768sgnrY")
        self.assertEqual(dualipa, "6M2wZ9GZgrQXHCFfjv46we")      
    
    #Testing if all proper albums are returned for a given artist ID
    def test_get_artist_info_albums(self):
        theStrokes, maluma, ariana_grande = "0epOFNiUfyON9EYx7Tpr6V", "1r4hJ1h58CWwUQe3MxPuau", "66CXWjxzNUsdJxJ2JdwvnR"
        
        venue_results, strokes_lst = get_artist_information("0epOFNiUfyON9EYx7Tpr6V")
        venue_results, maluma_lst = get_artist_information("1r4hJ1h58CWwUQe3MxPuau")
        venue_results, ari_lst = get_artist_information("66CXWjxzNUsdJxJ2JdwvnR")
        
        strokes_ans = ["The Singles - Volume 01", "The New Abnormal", "Comedown Machine", "Angles", "First Impressions Of Earth", "Room On Fire", "Is This It"]
        maluma_ans = ["Don Juan", "The Love & Sex Tape (Deluxe Edition)", "The Love & Sex Tape", "Marry Me (Original Motion Picture Soundtrack)", "#7DJ (7 Días En Jamaica)", "PAPI JUANCHO", "11:11", "F.A.M.E.", "Pretty Boy, Dirty Boy", "PB.DB. The Mixtape", "Magia"]
        ari_ans = ["eternal sunshine (slightly deluxe)", "eternal sunshine", "Yours Truly (Tenth Anniversary Edition)", "Positions (Deluxe)", "Positions", "k bye for now (swt live)", "thank u, next", "Sweetener", "Dangerous Woman", "My Everything (Deluxe)", "Yours Truly"]
        
        self.assertEqual(strokes_ans, strokes_lst['albums'])
        self.assertEqual(maluma_ans, maluma_lst['albums'])
        self.assertEqual(ari_ans, ari_lst['albums'])
    
if __name__ == "__main__":
    main()