# envelope-budgeting-app
envelope-budgeting app backend(Node, Express, PostgreSQL, Sequelize, Passport.js, Swagger, Jest(Supertest), etc.)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
  This is a REST API for web app, which organize your budget using envelope principles. 
  Currently in development and testing. Working on __test__ folder...
	
## Technologies
Project is created with:
* postgresql v13,
* node v13.14.0,
* express: 4.17.1,
* passport: 0.4.1,
* sequelize 6.6.5,
* swagger-ui-express: 4.1.6
* jest: 27.2
	
## Setup
To run this project, install it locally using npm and change .env file name:

```
$ npm install
$ rename .env_sample -> .env -> set your own password for local postgres database
$ npm run db:create (creates and seeds a simple database for development and testing the app)
$ npm start 
```
