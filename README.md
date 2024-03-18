# Cypher's Cyberclinic 

### Requirements
[NodeJS](https://nodejs.org/en), tested on node v21.6.1.  
[Python3](https://www.python.org/downloads/), tested on python 3.11 and 3.12.  
[MariaDB](https://mariadb.org/)  
### Installation (Mac/Linux)
`git clone https://github.com/cr35wx/cypher`  
`cd cypher`  
`python3 -m venv .venv`  
`source .venv/bin/activate`  
`pip install -r requirements.txt`  # (see troubleshooting for common errors)  
`cd frontend`  
`npm install`  

At the root directory (cypher), run initUserDb.sql inside the MariaDB shell to enable the development database:  
`SOURCE initUserDb.sql;`  
It may be easier to open this SQL file with a text editor and paste each of the four commands separately.

You can start the react app within the frontend directory with `npm start`.  
You can start flask within the backend directory with  `flask run` or `flask --app start.py run`

### Troubleshooting
#### (Mac/Linux)  
You may run into some errors while installing the python dependencies.  
If there is an installation error relating to scrypt, install OpenSSL. Run the following commands in order.
On MacOS:  
`brew install openssl`  
`export CFLAGS="-I$(brew --prefix openssl)/include $CFLAGS"`  
`export LDFLAGS="-L$(brew --prefix openssl)/lib $LDFLAGS"`  

On Ubuntu:  
`sudo apt install openssl libssl-dev`  
`export CFLAGS="-I/usr/include $CFLAGS"`  
`export LDFLAGS="-L/usr/lib/x86_64-linux-gnu $LDFLAGS"`  


Another error may occur which relates to the mariadb python package.  
To fix this, install mariadb.  
On mac:  
`brew install mariadb`  

On Ubuntu:  
`sudo apt install mariadb-server libmariadb-dev`  


### Flask Commands
To create or remove database tables that are registered as models in models.py:  
`flask manage-db create|drop`  

To create data required by the diagrams:  
`flask manage-db populate`  

fake.py has more commands such as:  
`flask fake students 10`  
this will add 10 records of the StudentParticipants model to the db.  
