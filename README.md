# What is this?

A Weight tracking app, similar to MFP

## How does it work?

You enter your weight, height, sex and activity level.

You then choose a goal weight, and how fast you would like your weight to change to get there.

You enter Foods that are found using the Edamam Food Api. It will track your caloric intake, and your macronutrient intake over time.

## How was it made?
Built using React, Material Ui, Node and Express.

It utilizes the Edamam Food Api to get food data. This data is pretty local, specifically to the United States. It has some local foods depending on their popularity.

### How can i use it?

There is a live version hosted [here](3.25.111.216)

(This is not always up, it's hosted on AWS and i take it down for 7 days a month to reduce costs)

### How can i host it locally?

Clone the repo.
You will need to set a few variables in a .env file.
First, sign up for an Edamam developer account, get an ID and KEY as you will need them for the .env file.
```
NODE_ENV=development
APPLICATION_ID={your edamam id}
APPLICATION_KEY={your edamam key}
SECRET={some secret to encrypt passwords}
DEV_DATABASE_URL={the url of your database}
```
After this run:
```
npm install
cd client/
npm install
npm run build
cd ../
node dbinit.js
ctrl + c
node server.js
```

The app will now be hosted on localhost:8000