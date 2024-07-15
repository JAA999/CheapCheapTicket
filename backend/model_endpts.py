import database
from flask_restful import Resource, reqparse

from models import Artists, Genres, Events
from queryBuilder import DefaultRequestParser, QueryBuilder

searchable_fields = [Artists.artist_name]
exact_filterable_fields = [Artists.genre_name] 
range_filterable_fields = [Artists.popularity]
sortable_fields = [Artists.artist_name, Artists.popularity]

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
        self.args # ADDED ON 7/14
    
    def get(self):
        args = self.parser.parse_args()
        
        query = QueryBuilder(
            Artists,
            self.args, # CHANGED FROM args
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

searchable_fields = [Genres.genre_name] 
exact_filterable_fields = [] 
range_filterable_fields = [Genres.events_price_min, Genres.events_price_max]
sortable_fields = [Genres.genre_name, Genres.events_price_min, Genres.events_price_max]

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

searchable_fields = [Events.event_name] 
exact_filterable_fields = []
range_filterable_fields = [Events.event_date, Events.sales_start, Events.price_range_min, Events.price_range_max]
sortable_fields = [Events.event_name, Events.event_date, Events.sales_start, Events.price_range_min, Events.price_range_max]

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