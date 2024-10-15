# Hidden Gems API

## About This Project

This API was built for the purpose of accessing application data programatically for a front end application. This is the backend server which provides information about events and places in Greater Manchester, user information, and comment information, and provides this information to the front end architecture.

## Project Links

Backend API: https://hidden-gems-cd0h.onrender.com/api <br>
Backend Repo: https://github.com/christianaao/hidden-gems-backend <br>
Original Repo Link: https://github.com/espiers13/hidden-gems <br>

Frontend APP: https://hidden-gems-frontend.vercel.app/ <br>
Frontend Repo: https://github.com/christianaao/hidden-gems-frontend <br>
Original Repo Link: https://github.com/flynnjim/hidden-gems-frontend <br>

## features of this Project

This project was created using Model View Controller architecture, using Agile workflow.

This project was written in JavaScript through Test Driven Development (TDD) using Jest and SuperTest. This datbase is run with PostgreSQL and node-postgres.

### Available Endpoints

GET /api <br>
GET /api/users <br>
GET /api/users/:user_id <br>
POST /api/users <br>
PATCH /api/users <br>
GET /api/comments <br>
GET /api/comments/:gem_id <br>
POST /api/comments <br>
DELETE /api/comments/:comment_id <br>
GET /api/gems <br>
GET /api/gems/:gem_id <br>
POST /api/gems <br>
PATCH /api/gems <br>

## Running this Project Locally

### Installation

To install PostgreSQL: https://www.w3schools.com/postgresql/postgresql_install.php

To install npm: `npm install npm@latest -g`

### Setup and Software Requirements

1. Clone or fork this repo.

2. In your terminal, locate the directory you would like to save the code to and type `git clone` followed by the cloned/forked repo link.

3. In the cloned directory, type `npm install` in your terminal to install all dependencies.
   #### Dev Dependencies used:
      {
      "husky": "^9.1.6",
      "jest": "^29.7.0",
      "jest-extended": "^4.0.2",
      "jest-sorted": "^1.0.15",
      "supertest": "^7.0.0"
      }

4. Create two dotenv files: `.env.test` and `.env.development`, and insert `PGDATABASE=hidden_gems_test` and `PGDATABASE=hidden_gems` to the files respectively. This will allow you to connect to the databases.

5. Type `npm run setup-dbs` in the terminal to set up the database

6. Type `npm run seed` in the terminal to seed the local database

7. To run the code, run `npm run dev` for the server data or `npm test` for the test data in the terminal.

☺ I hope you enjoy testing my server ☺
