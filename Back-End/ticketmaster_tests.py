#Authored By: Christopher Huelitl
from unittest import main, TestCase
from main import get_events_for_artist

class MyUnitTests (TestCase):
    #Testing all parameters match the given artist
    def test_get_events_for_artist(self):
        gunna_lst = get_events_for_artist("Gunna")
        key_param = {'1AvfZbkGkyXU-8o': {'eventId': '1AvfZbkGkyXU-8o', 'eventName': 'Broccoli City Festival 2-day Ticket (7/27-7/28)', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-27', 'salesStart-End': '2024-03-22T14:00:00Z to 2024-07-29T00:30:00Z', 'priceRange': '$169.5 to $1069.5', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.com/broccoli-city-festival-2day-ticket-727728-washington-district-of-columbia-07-27-2024/event/1500606E7EDA1411'}, '17A8vOG61rsGNd9': {'eventId': '17A8vOG61rsGNd9', 'eventName': 'Broccoli City Festival - SUNDAY SINGLE DAY', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-28', 'salesStart-End': '2024-05-31T14:00:00Z to 2024-07-29T01:00:00Z', 'priceRange': '$99.5 to $544.5', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.com/broccoli-city-festival-sunday-single-day-washington-district-of-columbia-07-28-2024/event/150060A7B13230D7'}, 'G5djZ9mQDu9YJ': {'eventId': 'G5djZ9mQDu9YJ', 'eventName': 'Rockstar Energy presents Wireless - Saturday Payment Plan', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-13', 'salesStart-End': '2024-01-31T10:00:00Z to 2024-07-13T10:00:00Z', 'priceRange': '$49.0 to $49.0', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.co.uk/rockstar-energy-presents-wireless-saturday-payment-london-13-07-2024/event/37005EE6BB357C26'}, 'G5djZ9mhRYI-P': {'eventId': 'G5djZ9mhRYI-P', 'eventName': 'Rockstar Energy Presents Wireless - Saturday Day Ticket', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-13', 'salesStart-End': '2024-01-31T10:00:00Z to 2024-07-13T10:00:00Z', 'priceRange': '$94.6 to $148.0', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.co.uk/rockstar-energy-presents-wireless-saturday-day-london-13-07-2024/event/37005EE6EFC28865'}, 'G5djZ9m9z5MMG': {'eventId': 'G5djZ9m9z5MMG', 'eventName': 'Rockstar Energy Presents Wireless - 2 Day Payment Plan Sat & Sun', 'artistNames': ['Gunna'], 'dateAndTime': '2024-07-13', 'salesStart-End': '2024-01-31T10:00:00Z to 2024-07-14T10:00:00Z', 'priceRange': '$45.0 to $49.0', 'genreId': 'KnvZfZ7vAv1', 'venue': 'Unavailable', 'ticketmasterURL': 'https://www.ticketmaster.co.uk/rockstar-energy-presents-wireless-2-day-london-13-07-2024/event/37005EE5F82F7DCC'}
        }
        i = 0
        for event in key_param:
            self.assertEqual(event, gunna_lst[i]['eventId'])
            self.assertEqual(key_param[event]['eventName'], gunna_lst[i]['eventName'])
            self.assertEqual(key_param[event]['artistNames'], gunna_lst[i]['artistNames'])
            self.assertEqual(key_param[event]['dateAndTime'], gunna_lst[i]['dateAndTime'])
            self.assertEqual(key_param[event]['salesStart-End'], gunna_lst[i]['salesStart-End'])
            self.assertEqual(key_param[event]['priceRange'], gunna_lst[i]['priceRange'])
            i += 1
    
if __name__ == "__main__":
    main()