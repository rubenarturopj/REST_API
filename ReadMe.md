# Build your compelte REST API from scratch:

Features:

-   Environment, Typescript, Nodemon setup
-   MongoDB & Mongoose connect, Database creation
-   Controllers creation
-   Middlewares creation
-   Cookie based authentication
-   Postman testing
-   Create, Read, Update, Delete

### Technologies used

Express, http, bodyparser, cookieParser, compression, cors, mongoose, mongoDB(cloud), lodash, crypto (from node.js).

#### To install all packages

_npm i_

#### to set up MongoDB URL

in _src/index.ts_:
const MONGO_URL = "" // DB URI

##### To start the app

_npm start_

## Steps used to build:

#### Seting up our environment

1. Type in terminal _npm init -y_ to set up our project and create our environment (package.json) (don't touch it yet).
2. Type in terminal _npm install -D typescript_ to set up our language.
3. Type in terminal _npm install -D ts-node_ to transform TypScript into JavaScript.
4. Type in terminal _npm install -D nodemon_ to install Nodemon (to avoid restarting server, nodemon detects a change and it restarts automatically).
5. Create a file called _tsconfig.json_ and write the compiler options (copy and paste).
6. Create a file named _nodemon.json_ to set up nodemon (copy and paste, attention to the src path).
7. Create a "src" folder and inside a file named _index.ts_ (you can add a console.log("hello typscript") as a test).
8. In the package.json, add _"start": "nodemon"_ in the scripts.
9. In the terminal, run _npm start_. Then stop the server by pressing the keys: shift + C.

#### setting up the server

1. Express. In the index.ts add the imports and set the structure of the server:

-   import express from "express";
-   import http from "http";
-   import bodyParser from "body-parser";
-   import cookieParser from "cookie-parser";
-   import compression from "compression";
-   import cors from "cors";
-   const app = express();
-   app.use(cors({credentials: true}));
-   app.use(compression());
-   app.use(cookieParser());
-   app.use(bodyParser.json());
-   const server = http.createServer(app);

2. Install all the imports previously set. In the terminal, run _npm i express body-parser cookie-parser compression cors_.

3. Install all their types. In the terminal run _npm i -D @types/express @types/body-parser @types/cookie-parser @types/compression @types/cors_. All the previously marked errors should be gone now.

4. Add a listener to the server and choose your port:
   server.listen(8080, () => {console.log("Server running on http://localhost:8080/")});

-   If you run the server it should be working fine and you should see the console log: _npm start_. You can also go to this adress on the explorer and get a cannotGet page.

#### setting up the database using MongoDB

1. Google _MongoDB Atlas_ (cloud) (https://www.mongodb.com/atlas/database).

2. Create an account or Sign in with google.

3. In the dashboard, click on "Build a dabase". Select a share free DB. Choose the name of your cluster. Click on create.

4. Set username and password. Create user.

5. Click on Add my current IP address.

6. Click finish and close. Click "go to databases".

7. Back in the dashboard, you'll see your cluster. Click on connect. Then on the option whose description matches "connect your application to your cluster using MondoDB's native drivers".

8. In option 1, leave it the way it is (driver = node.js, version = the one suggeted ).
9. In option 2, install your driver. _npm install mongodb_. <------ ??????
10. In option 3, grab the line of code given, copy it and we will paste it in our server. Create a constant in our index.ts and paste the code there. Change the < password > value for your chosen password. Close the popwindow in the explorer from MongoDB page.

#### Mongoose's User's schema

1. Install mongoose: _npm install mongoose_; and its types: _npm i -D @types/mongoose_.

2. In the index.ts, import moongose and add the almost-final lines in our server.

3. Run the server _npm start_.

4. In src, create a new folder called "db", in it create a new file calle users.ts. This will be our schema/model/blueprint for authentication. Fill it in with the schema of the user and the functions to do REST actions (create, read(get), update, delete).

#### Helpers for authentication (random token generator & encrypting)

1. In src create a new folder called "helpers", in it create a new file called "index.ts". Here we are going to create the user helpers for authentication (creat a random token or incript password)

2. Crypto (for password encryption) is built into Node.js. You don't need to install it before you use it. So, we fill in src/helpers/index.ts with crypto and with the random token generator.

3. In src, create a new folder called "controllers" and inside a new file called "authentication.ts" (src/controllers/authentication.ts).

4. import express. ANd let's start setting up the response of the server when a request is made: the controller or middleware. Set up what happens when a user wants to sign in: success and email already exists.

5. in src create another folder named router, and inside create a file called index.ts. Import express. We're going to create the router.

6. Inside the same folder (src/router/) create another file called "authentication.ts". Import express. Create the authentication router.---- import it in index.ts in the same folder.

7. We can try with insomnia now to hit the DB and create a new user (http://localhost:8080/auth/register).

8. Once everything works, set the Log in controller/middleware in controler/authentication.

9. Once done, set the router in src/router/authentication

10. Time to test. With insomnia try to log in with the credentials used before to create a new user. Make sure to write the right http router in insomnia (http://localhost:8080/auth/login)

11. create a folder named Middlewares in src (src/middlewares). In it create the files: index.ts.

12. Press shit + c to stop the server. Open the terminal en install another package:_npm i lodash_. Then install its types: _npm i -D @types/lodash_. Then restart your server by running _npm start_.

13. in middlewares/index.ts, import express, {get, merge} from lodash, and continue... We'll create a middleware to verify if the user has logged in, if the session is open.

14. in src/controllers/ create a new file calles users. In there create a controller to get all the users.

15. Go back to src/router and create a new file called "users.ts". Fill this router. Then import it in src/router/index.ts

16. We'll remove the cookie isAuthenticated. in src/router/users, import isAuthenticated and add the line of code below

17. Now we're gonna create the DELETE and UPDATE users. Go back to src/controllers/users and add the functions to delete and update. DELETE -->>> write the respective function, then go to src/router/users.ts and write the router for delete & import it as well. Try with Nodemon, and it works!!

18. However, we shouldn't be able to delete other users that are not ours. We should delete only our account, no other people-s accounts. So, we're going to create more middlewares. go to src/middleware/index.ts and create another function called isOwner. Now go to src/router/user.ts and implement it there. don-t forget to add first isAuthorized

19. Now let,s create the last controller, the update user info controller. go to src/controllers/users.ts and create the function updateUser. Once that done, go to src/router/users.ts to implement it, dont forget to import it.

20. Try with Nodemon. It's done.

### Credits:

Code With Antonio
[Code With Antonio](https://youtu.be/b8ZUb_Okxro)
