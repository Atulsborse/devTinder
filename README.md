DevTinder is a web application designed for developers to connect with each other, similar to the concept of a dating app, 
but for professional networking. Users can register, log in, send connection requests, and accept, reject, or ignore connection requests.
Admins have additional privileges to delete or suspend user accounts.

Table of Contents
1 .app.js

Initialization of the Express app
Database connection setup
Routes setup (authrouter, profilerouter, requestRouts, userRouter, admin)
Middleware setup (passport, session, cookie parser)


2. config/database.js
MongoDB database connection setup using Mongoose


3. middlewares/auth.js
Authentication middleware for user authentication (userAuth)
Authorization middleware for admin role (isAdmin)



4. middlewares/passport.js
Passport.js setup for local strategy (email and password authentication)
Serialization and deserialization of user session



5. models/connectionRequest.js
Mongoose schema for connection requests between users
Pre-save validation for ensuring users cannot send requests to themselves


6. models/user.js
Mongoose schema for user data
Custom methods for JWT generation (getJWt) and password validation (validatePassword)



7. routes/auth.js
Route for user signup (/singup)
Route for user login (/login)
Route for user logout (/logout)



8. routes/profile.js
Route for viewing user profile (/profile/view)
Route for editing user profile (/profile/edit)


9. routes/request.js
Routes for sending and reviewing connection requests
Send connection request (/request/send/:status/:toUserId)
Review connection request (/request/reviw/:status/:requestId)



10. routes/user.js
Routes for fetching user connection requests and connections
Fetch received connection requests (/user/requests/receive)
Fetch user connections (/user/connections)
Fetch feed of connections (/feed)


 Install Dependencies:-
 npm install

 Run the Application in Development Mode:-
 npm run dev

 Access the Application:-
 http://localhost:3000

 postman routes for api checks:-
 
 

