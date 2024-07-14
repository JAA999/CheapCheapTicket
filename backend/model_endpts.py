import database
from flask_restful import Resource, reqparse

from models import Artists, Genres, Events
from queryBuilder import DefaultRequestParser, QueryBuilder

sortable_fields = [
    Artists.popularity, # sort all artists based on popularity
]

# I want all events for exact artist or all events for exactly this genre
exact_filterable_fields = [Artists.genre] 

range_filterable_fields = [
    Artists.popularity, #can filter based on popularity of artists
]

searchable_fields = [Artists.artist_name, Artists.events]
# class ArtistPopulateResources(Resource):
#     def post(self):
#         populate.Artists.popupalte_artists()
#         return 
    
class ArtistListResources(Resource):
    def __init__(self) -> None:
        self.parser = DefaultRequestParser(
            sortable_fields, 
            exact_filterable_fields,
            range_filterable_fields,
        )
    
    def get(self):
        args = self.parser.parse_args()
        
        query = QueryBuilder(
            Artists,
            args,
            sortable_fields,
            exact_filterable_fields,
            range_filterable_fields,
            searchable_fields, 
        )
        
        paginate = query.paginate()
        artists = paginate.items
        
        metadata = {
            "page": paginate.page,
            "per_page": paginate.per_page,
            "total_pages": paginate.pages,
            "total_items": paginate.total,
        }
        return {"metadata": metadata, "results": Artists.to_dict(artists)} # not sure if we need to make a schema function

sortable_fields = [
    Genres.events_price_range, 
]

exact_filterable_fields = [Genres.events_price_range] 

range_filterable_fields = [
    Genres.genre_name
]

searchable_fields = [] #maybe add new fields to all three models like location, distance etc 
# class GenrePopulateResources(Resource):
#     def post(self):
#         populate.Genres.populate_genres()
#         return 
    
class GenresListResources(Resource):
    def __init__(self) -> None:
        self.parser = DefaultRequestParser(
            sortable_fields, 
            exact_filterable_fields,
            range_filterable_fields,
        )
    
    def get(self):
        args = self.parser.parse_args()
        
        query = QueryBuilder(
            Genres,
            args,
            sortable_fields,
            exact_filterable_fields,
            range_filterable_fields,
            searchable_fields, 
        )
        
        paginate = query.paginate()
        genres = paginate.items
        
        metadata = {
            "page": paginate.page,
            "per_page": paginate.per_page,
            "total_pages": paginate.pages,
            "total_items": paginate.total,
        }
        return {"metadata": metadata, "results": Genres.to_dict(genres)} # not sure if we need to make a schema function

sortable_fields = [
    Events.price_range, 
]
 
exact_filterable_fields = [Events.venue] 

range_filterable_fields = [
    Events.sales_start_end
]

searchable_fields = [] #maybe add new fields to all three models like location, distance etc 
# class EventsPopulateResources(Resource):
#     def post(self):
#         populate.Events.populate_genres()
#         return 
    
class EventsListResources(Resource):
    def __init__(self) -> None:
        self.parser = DefaultRequestParser(
            sortable_fields, 
            exact_filterable_fields,
            range_filterable_fields,
        )
    
    def get(self):
        args = self.parser.parse_args()
        
        query = QueryBuilder(
            Events,
            args,
            sortable_fields,
            exact_filterable_fields,
            range_filterable_fields,
            searchable_fields, 
        )
        
        paginate = query.paginate()
        genres = paginate.items
        
        metadata = {
            "page": paginate.page,
            "per_page": paginate.per_page,
            "total_pages": paginate.pages,
            "total_items": paginate.total,
        }
        return {"metadata": metadata, "results": Events.to_dict(genres)} # not sure if we need to make a schema function