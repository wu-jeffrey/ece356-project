# ece356-project

## Project Structure

#### `database-initialization` 
used to setup the DB schema, load the data from CSV, and all modifications performed on the tables to get it to the state it was when the project was handed in.

#### `web-client`
React based frontend client, ant-design UI, pretty straightforward. All the frontend code lives here

#### `web-server`
nodejs/express based backend services / REST API. Theoretically, it's a proxy between Marmoset and the frontend

## How to use (for the teaching team)
Assuming the database, `db356_j387wu` is still accessible on Marmoset 4:

Visit this webapp, hosted on heroku: [link]() # TODO ADD LINK ONCE DEPLOYED

## How to use (locally)
#### Assumptions / Pre-requisites
1. Assuming the database, `db356_j387wu` is still accessible on Marmoset 4:
2. You should have nodejs installed, version 12.18.3

#### Process
1. Clone this repo `git clone ...`
2. Install dependencies in both webapp folders

&nbsp;&nbsp;&nbsp;&nbsp;Run both these commands from the project root directory,\
&nbsp;&nbsp;&nbsp;&nbsp;`cd web-client && npm install`\
&nbsp;&nbsp;&nbsp;&nbsp;`cd web-server && npm install`

3. Start both local servers

&nbsp;&nbsp;&nbsp;&nbsp;Run both these commands from the project root directory,\
&nbsp;&nbsp;&nbsp;&nbsp;`cd web-client && npm start`\
&nbsp;&nbsp;&nbsp;&nbsp;`cd web-server && npm run server`
