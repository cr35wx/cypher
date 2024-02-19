# cypher  
To create or remove database tables that are registered as models in models.py:  
flask manage-db create|drop  

To create data required by the diagrams:  
flask manage-db populate  

fake.py has more commands such as:  
flask fake students 10  
this will add 10 records of the StudentParticipants model to the db.  
