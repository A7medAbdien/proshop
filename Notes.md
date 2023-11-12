# Notes frontend

* npm i axios
* npm i @reduxjs/toolkit react-redux

## Work flow

1. store - container for all the slices
2. api slice - (server slice - all api calls results are there)
   1. <model> slice - (each model has its own)
3. client slice - like cart which starts from the client

# Notes backend

* npm init and fill the data
* npm i express
* npm i -D nodemon concurrently
* npm i mongoose
* npm i bcryptjs
* npm i colors
* npm i @paypal/react-paypal-js
  
  
# Similarity With .Net Web Assembly

## .Net

1. Model
2. Service (interface - class) - (server logic)
3. Program.cs (addScoped)
4. Controller (for each service) - (endpoint)
5. fetch on Client

## Express

1. Model
2. Routes (Works as controllers in .Net we try to keep them thin as possible)
3. server.js (app.use) - (Here it just route to the file, but in it define its scope)
4. Controller (server logic - works as services in .Net)
5. fetch on Client

# Improvements

1. showing qty if it is already exist in cart 👍
2. update review 👍
3. server confirmation for the orders price 👍
4. place order affects countInStock 👍
5. sort by
6. list of images - integrate cloudinary??