#Authored by: Christopher Huelitl
from unittest import main, TestCase
from main import get_venue_id, get_venue_information

google_access_token = 'AIzaSyAVFsqiUBPbEIyxqbjoJlAh9ylHNnWT4k8'
class myTestCases(TestCase):
    def test_getVenueId(self):
        moodyCenter, alamoDome = "Myers Stadium", "Alamodome"
        moodyId, alamoId = get_venue_id(moodyCenter), get_venue_id(alamoDome)
        # print("moody ID " + str(moodyId), + " alamoID " + str(alamoId))
        
    def test_getVenueInfo(self):
        moodyCenter, alamoDome = "Myers Stadium", "Alamodome"
        moodyId, alamoId = get_venue_id(moodyCenter), get_venue_id(alamoDome)
        self.assertNotEqual(moodyId, "")
        self.assertNotEqual(alamoDome, "")
        moody_info = get_venue_information(moodyId)
        alamo_info = get_venue_information(alamoId)
        # print("Moody Info: " + str(moody_info) + "\n")
        # print("Alamo Info: " + str(alamo_info) + "\n")
        self.assertNotEqual(moody_info, {})
        self.assertNotEqual(alamo_info, {})
    
if __name__ == "__main__":
    main()