# Cypher Cybersecurity Clinic

# Requirements

NodeJS, tested on node v21.6.1.
Python3, tested on python 3.11 and 3.12.
MariaDB

# Installation (Mac/Linux)

git clone https://github.com/cr35wx/cypher
cd cypher
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt # (see troubleshooting for common errors)
cd frontend
npm install

At the root directory (cypher), run initUserDb.sql inside the MariaDB shell to enable the development database:
SOURCE initUserDb.sql;
It may be easier to open this SQL file with a text editor and paste each of the four commands separately.

You can start the react app within the frontend directory with npm start.
You can start flask within the backend directory with flask run or flask --app start.py run

# Troubleshooting

(Mac/Linux)
You may run into some errors while installing the python dependencies.
If there is an installation error relating to scrypt, install OpenSSL. Run the following commands in order. On MacOS:
brew install openssl
export CFLAGS="-I$(brew --prefix openssl)/include $CFLAGS"
export LDFLAGS="-L$(brew --prefix openssl)/lib $LDFLAGS"

On Ubuntu:
sudo apt install openssl libssl-dev
export CFLAGS="-I/usr/include $CFLAGS"
export LDFLAGS="-L/usr/lib/x86_64-linux-gnu $LDFLAGS"

Another error may occur which relates to the mariadb python package.
To fix this, install mariadb.
On mac:
brew install mariadb

On Ubuntu:
sudo apt install mariadb-server libmariadb-dev

# Flask Commands

To create or remove database tables that are registered as models in models.py:
flask manage-db create|drop

To create data required by the diagrams:
flask manage-db populate

fake.py has more commands such as:
flask fake students 10
this will add 10 records of the StudentParticipants model to the db.
Cypher's Cybersecurity Clinic is a collaborative initiative between the School of Computing, the Driehaus College of Business, and the College of Law at DePaul University. It serves as an interdisciplinary platform providing students with hands-on, real-world experience in cybersecurity projects. These projects are conducted for organizational clients, thereby preparing students for careers in the cybersecurity workforce.

## Mission

Our mission at Cypher Cybersecurity Clinic is to raise organizational awareness of information security and privacy risks through student-led risk assessments. By conducting these assessments, we aim to facilitate incremental improvements in our client's security policies and practices. In doing so, students gain valuable real-world experience that contributes to the cybersecurity workforce.

## Overview

- **Interdisciplinary Collaboration**: Cypher brings together students and faculty from various academic disciplines, fostering collaboration between the School of Computing, the Driehaus College of Business, and the College of Law.

- **Real-World Experience**: Students engage in hands-on projects that simulate real-world cybersecurity challenges, providing them with practical skills and insights.

- **Client Engagement**: We partner with organizational clients, including community-based non-profit organizations and small businesses in the Chicago area, to provide cybersecurity assessment services.

- **Community Impact**: Through our partnership with DePaul's Steans Center, we extend our services to community-based non-profit organizations, helping to address cybersecurity needs in under-resourced communities.

## Objectives

1. **Student Development**: Empower students to apply theoretical knowledge to practical cybersecurity challenges, enhancing their employability and career readiness.

2. **Client Support**: Assist organizational clients in identifying and mitigating information security and privacy risks, thereby improving their cybersecurity posture.

3. **Community Service**: Extend our services to community-based non-profit organizations and small businesses, contributing to the broader cybersecurity ecosystem and promoting social impact.

## GETTING STARTED ON THE CYPHER REPO

To create or remove database tables that are registered as models in models.py:
flask manage-db create|drop

To create data required by the diagrams:
flask manage-db populate

fake.py has more commands such as:
flask fake students 10
this will add 10 records of the StudentParticipants model to the db.
