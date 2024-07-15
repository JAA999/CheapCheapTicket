# queryBuilder.py is a file that contains a query builder class for all models to use 
# in an effort to not reimplement the same logic to add and remove filters as well as 
# the search and filter arguments

from flask_restful import reqparse #module that provides a convenient way to parse and validate request args for flask based webapps
# run cmd 'pip install Flask-RESTful' to import package and use it 
from sqlalchemy import or_
# Importing `or_` from SQLAlchemy allows creating OR clauses in queries.
# Usage example: `or_(condition1, condition2)` creates a condition where at least one must be true
# Example: select(users).where(or_(users.c.name == 'Alice', users.c.age == 30))

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
    Filterable Fields: dateAndTime, salesStart-End, priceRange, address (state), rating
    Sortable Fields: eventName, dateAndTime, salesStart-End (start, end), priceRange(min, max), rating
'''


#default class in case client doesn't pass any args, pagination, or sortby args  
class DefaultRequestParser:
    def __init__(
        self,
        sortable_fields: list, 
        exact_filterable_fields: list, 
        range_filterable_fields: list,
    ):
        self.parser = reqparse.RequestParser()
        self.add_pagination_args()
        
        self.add_sort_args(sortable_fields)
        self.add_exact_filter_args(exact_filterable_fields)
        self.add_range_filter_args(range_filterable_fields)
        self.add_search_args()

    def add_pagination_args(self):
        # Add pagination arguments to self.parser:
        # - "page": Integer, defaults to 1 if not provided, found in the query string
        # - "per_page": Integer between 1 and 100, defaults to 12 if not provided, found in the query string
        # - "all_items": Boolean, defaults to False if not provided, found in the query string
        self.parser.add_argument("page", type=int, default=1, location="args")
        self.parser.add_argument(
            "per_page", type=int, default=12, location="args", choices=range(1,101)
        )
        self.parser.add_argument("all_items", type=bool, default=False, location="args")
        
    def add_sort_args(self, sortable_fields):
        # Add sorting arguments to self.parser based on sortable_fields:
        # - "sort_by": String, defaults to "id.asc" if not provided, found in the query string
        #   Valid choices include ascending ("field.asc") and descending ("field.desc") sorts
        #   for each field in sortable_fields
        field_names = [field.name for field in sortable_fields]
        
        asc_fields = [f"{field}.asc" for field in field_names]
        desc_fields = [f"{field}.desc" for field in field_names]
        
        self.parser.add_argument(
            "sort_by",
            type=str,
            default="id.asc",
            location="args",
            choices=asc_fields + desc_fields,
        )
        
    def add_exact_filter_args(self, exact_filterable_fields):
        # Add exact filtering arguments to self.parser based on exact_filterable_fields:
        # Each field in exact_filterable_fields is added as a query string argument of type string
        fields_names = [field.name for field in exact_filterable_fields]
        
        for field in fields_names:
            self.parser.add_argument(field, type=str, location="args")
            
        
    def add_range_filter_args(self, range_filterable_fields):
        # Add range filtering arguments to self.parser based on range_filterable_fields:
        # Each field in range_filterable_fields is added as two query string arguments:
        # - "{field}.min": String, location in the query string
        # - "{field}.max": String, location in the query string
        field_names = [field.name for field in range_filterable_fields]
        
        for field in field_names:
            self.parser.add_argument(f"{field}.min", type=str, location="args")
            self.parser.add_argument(f"{field}.max", type=str, location="args")
        
    def add_search_args(self):
        # Add search argument to self.parser:
        # - "q": String, location in the query string
        self.parser.add_argument("q", type=str, location="args")

    def parse_args(self):
        # Parse and return the parsed arguments using self.parser
        return self.parser.parse_args()

class QueryBuilder:
    def __init__(
        self, model, args, sortables, exact_filterables, range_filterables, searchables
    ): 
        self.query = model.query
        self.model = model
        self.args = args
        
        self.sortable_fields = sortables
        self.exact_filterable_fields = exact_filterables
        self.range_filterable_fields = range_filterables
        self.searchable_fields + searchables
        
        self.apply_sorting()
        self.apply_exact_filters()
        self.apply_range_filters()
        self.apply_search()
        
    def paginate(self):
        per_page = self.args["per_page"]
        # If all_items in query set per_page to be all items
        if self.args["all_items"]:
            per_page = self.query.count()
        
        # Return the requested page
        return self.query.paginate(
            page=self.args["page"],
            per_page=per_page,
            error_out=False,
        )

    def apply_sorting(self):
        # Assumes arguments are passed in as, example: name.asc
        sort_by, sort_order = self.args["sort_by"].split(".")
        sort_attr = getattr(self.model, sort_by)
        
        if sort_order == "asc":
            self.query = self.query.order_by(sort_attr.asc())
        else:
            self.query = self.query.order_by(sort_attr.desc())
    
    def apply_exact_filters(self):
        filters = []
        # Get the names of all the fields for the model that can be filtered
        filterable_field_names = [field.name for field in self.exact_filterable_fields]
        
        for field in self.args:
            value = self.args[field]
            
            # For each argument check if it is a filterable field name, if it is add it to the filters list
            if value and field in filterable_field_names:
                field_attr = getattr(self.model, field)
                filters.append(field_attr == value)

        # *filters unpacks the list so that each filter is applied individually
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
                        filters.append(field_attr if field_attr >= value else value)
                    else:
                        filters.append(field_attr if field_attr <= value else value)
        
        self.query = self.query.filter(*filters)
    
    def apply_search(self):
        search_query = self.args["q"]
        if not search_query:
            return

        filters = []
        # For each field in searchable_fields, add a filter that for that field checks if the "search_query" (case-insensitive) is found anywhere inside the field (that is what %% does)
        for field in self.searchable_fields:
            filters.append(field.ilike(f"%{search_query}%"))
        
        # The or_ condition makes it so if any of the filters are true the row will be included in the results
        self.query = self.query.filter(or_(*filters))
                        

        