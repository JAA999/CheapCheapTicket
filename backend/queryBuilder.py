# queryBuilder.py is a file that contains a query builder class for all models to use 
# in an effort to not reimplement the same logic to add and remove filters as well as 
# the search and filter arguments
from flask_restful import reqparse #module that provides a convenient way to parse and validate request args for flask based webapps
# run cmd 'pip install Flask-RESTful' to import package and use it 
from sqlalchemy import or_, case
# Importing `or_` from SQLAlchemy allows creating OR clauses in queries.
# Usage example: `or_(condition1, condition2)` creates a condition where at least one must be true
# Example: select(users).where(or_(users.c.name == 'Alice', users.c.age == 30))
from models import Artists, Genres, Events
'''
Genres
    Searchable Fields: name
    Filterable Fields: eventsPriceRange (min, max)
    Sortable Fieds: name, eventsPriceRange (min, max)
Artists
    Searchable Fields: name
    Filterable Fields: genre
    Sortable Fields: name, popularity
Events
    Searchable Fields: eventName
    Filterable Fields: dateAndTime, salesStart-End, priceRange, genre_name
    Sortable Fields: event_name, event_date, sales_start, price_range_min, price_range_max 
'''

class QueryBuilder:
    def __init__(
        self, model, args, sortables, exact_filterables, searchables, range_filterables
    ): 
        self.query = model.query
        self.model = model
        self.args = args

        self.sortable_fields = sortables
        self.exact_filterable_fields = exact_filterables # will be a dictionary
        self.range_filterable_fields = range_filterables
        self.searchable_fields = searchables
        
        self.apply_sorting()
        self.apply_exact_filters()
        self.apply_range_filters()
        self.apply_search()
        
        self.result = None
    def paginate(self):
        per_page = int(self.args['per_page'])
        page = int(self.args['page'])
        return self.query.paginate(
            page=page,
            per_page=per_page
        )

    def apply_sorting(self):
        if ('sort_by' not in self.args or 'sort_order' not in self.args):
            sort_by = "name"
            sort_order = "asc"
        else:
            sort_by = self.args["sort_by"]
            sort_order = self.args["sort_order"]
        
        sort_attr = getattr(self.model, sort_by)

        genre_model = self.model is Genres and (sort_by == "events_price_min" or sort_by == "events_price_max")
        event_model self.model is Events and (sort_by == "price_range_min" or sort_by == "price_range_max")

        if (genre_model or event_model):
            case_stmt = case((sort_attr == -1, 1), else_=0)
            if sort_order == "asc":
                self.query = self.query.order_by(case_stmt, sort_attr.asc())
            else:
                self.query = self.query.order_by(case_stmt, sort_attr.desc())
        else:
            if sort_order == "asc":
                self.query = self.query.order_by(sort_attr.asc())
            else:
                self.query = self.query.order_by(sort_attr.desc())
        
        
    def apply_exact_filters(self): 
        filters = []
        filterable_field_names = [field.name for field in self.exact_filterable_fields]     
        for arg in self.args:
            value = self.args[arg]
            if value and arg in filterable_field_names:
                field_attr = getattr(self.model, arg)
                filters.append(field_attr == value)
        self.query = self.query.filter(*filters)

    
    def apply_range_filters(self):
        filters = []

        filterable_field_names = []
        for field in self.range_filterable_fields:
            filterable_field_names.append(f"{field.name}.min")
            filterable_field_names.append(f"{field.name}.max")
        
        for field in self.args:
            if field in filterable_field_names:
                name, min_or_max = field.split(".")
                value = self.args[field]
                
                if value:
                    field_attr = getattr(self.model, name)
                    
                    if min_or_max == "min":
                        filters.append(field_attr >= value)
                    else:
                        filters.append(field_attr <= value)
        
        self.query = self.query.filter(*filters)
    
    def apply_search(self):
        # Default case if no search term provided
        if ('q' not in self.args):
            return
        search_query = self.args["q"]
        if not search_query:
            return

        filters = []
        # For each field in searchable_fields, add a filter that for that field checks if the "search_query" (case-insensitive) is found anywhere inside the field (that is what %% does)
        for field in self.searchable_fields:
            filters.append(field.ilike(f"%{search_query}%"))
        
        # The or_ condition makes it so if any of the filters are true the row will be included in the results
        self.query = self.query.filter(or_(*filters))
                        

        