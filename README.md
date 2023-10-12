#Assignment2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.
Software Frameworks Documentation
## Git 

The approach that I took is to create a remote repo in GitHub. After creating the angular project I created a local repo using “git init”, I added all this files using “git add”, using “git remote add origin https://github.com/Johnnn214/Assignment_1.git” to add my remote repo, using “git commit –m “initial commit” and pushing this using “git push -u origin main”. From then on after every milestone I commit using the source control in git hub by adding files to commit as well as adding a message for that commit. I did not use branching and mainly stick to the main branch when developing my code. I push my local repo after I finished on that day using “git push”. For the git layout both front end and server are both in the same repo.

## Data structure 
### Entities:
####  User:
id: ObjectId
username: string
email: string 
password: string
roles (Array of roles: ["Super Admin", "Group Admin", "User"]: array<string>
groups (Array of group id the user is a member of): array<string>
avatar: string
valid: bool
#### Group:
Id: ObjectId
name: string
admins (Array of user id who are group admins): array<string>
#### Channel:
id : ObjectId
name: string
groupId(id where the channel belongs to): ObjectId
#### Message:
id: ObjectId
channelId: ObjectId
text: string
sender (username who sent the message): string
senderavatar(avatar who sent the message):string
channel (id where the message belongs to): string
message:string
image(image that was sent by the user): string

 
## REST- API
#### Add user to group
Method: POST  
Route: /api/groups/:id/users
Parameters: 
groupid from route parameters
username from the request body.
Return Value: 
Bad request error if user is already in the group/success message/ unexpected error.
What it does: handles the addition of a user to a group. Checks if user is already associated with the group, if not, adds the group's ID to the user's groups array.
###  Chat history
Method: GET
Route: /api/chat-history/:channel
Parameters: channel from route parameters.
Return Value: messages of the channel.
Unexpected errors during the database query or data retrieval. Sends error message.
What it does: looks for the channel, retrieves the chat history for that channel from the database, sorting the messages in chronological order.
####Create Chat Channel
Method: GET
Route: /api/groups/:id/channel
Parameters: channel's name from the request body, id of the group is extracted route parameters.
Return Value: 
Success message if channel created successfully. Any error returns error message.
What it does: creates a new chat channel associated with a group uses the channel name and group ID to create the channel in the database.
####Create Group
Route: /api/groups
Parameters: new group from request body.
Return Value: If the group is successfully created, it success message. In case of an error, it returns error message.
What it does: creates a new group. It extracts the group's details from the request body and inserts them into the database.
####Create User
Route: /api/createuser
Parameters: The user's details are extracted from the request body.
Return Value: If the user is successfully created, it returns a success message. In case of an error, it returns an error.
What it does: creates a new user. It extracts the user's details from the request body and inserts them into the database.
####Delete Channel
Route: /api/groups/:groupId/channel/:channelId
Parameters: The groupId and channelId are extracted from the route parameters.
Return Value:
If the channel is successfully deleted, it returns a success message.
If the channel is not found, it returns error message.
In case of an unexpected error, it returns Internal Server Error.
What it does: This route deletes a chat channel. It looks up the channel using the provided channelId and deletes it from the database.
####Delete Group and Associated Channels

Route: /api/groups/:groupId
Parameters: The groupId is extracted from the route parameters.
Return Value:
If the group is successfully deleted, it returns a success message.
If the group is not found, it returns error message.
In case of an unexpected error, it returns Internal Server Error response.
What it does: This route deletes a group and all associated channels. It looks up the group using the provided groupId, deletes the group from the groups collection, and then deletes all channels with the same groupId from the channels collection.
Delete User
Route: /api/users/:userId
Parameters: The userId is extracted from the route parameters.
Return Value:
If the user is successfully deleted, it returns a 
If the user is not found, it returns with an error message.
In case of an unexpected error, it returns Internal Server Error response.
What it does: This route deletes a user. It looks up the user using the provided userId and deletes the user from the users collection.
Remove User from Group
Route: /api/groups/:groupId/users/:userId
Parameters: The groupId and userId are extracted from the route parameters.
Return Value:
If the user is successfully removed from the group, it returns a success message.
If the user is not found in the group, it returns an error message.
In case of an unexpected error, it returns Internal Server Error response.
What it does: This route removes a user from a group. It validates and converts the group and user IDs to ObjectId, checks if the user is associated with the group, and removes them from the group if they are.
Get Admin Groups
Route: /api/groups/admin/:id
Parameters: The id is extracted from the route parameters.
Return Value:
If admin groups are successfully retrieved, it returns a JSON array of admin groups.
If there is an error, it returns Internal Server Error message.
What it does: This route retrieves groups that are administered by a user with the specified id.
Get Other Groups
Route: /api/groups/other-groups/:userId
Parameters: The userId is extracted from the route parameters.
Return Value:
If other groups are successfully retrieved, it returns array of groups not associated with the user.
If the user is not found, it returns an error message.
In case of an unexpected error, it returns Internal Server Error message.
What it does: This route fetches groups that the user is not a part of by comparing the user's group memberships with all available groups.
Get Channels for Group
Route: /api/groups/:id/channels
Parameters: The id is extracted from the route parameters.
Return Value:
If channels are successfully retrieved, it returns array of channels for the specified group.
If there is an error, it returns Internal Server Error response.
What it does: This route retrieves channels associated with the group specified by id. It queries the channels collection and returns the list of channels for that group.
Get Channel by ID
Route: /api/chat/:id
Parameters: The id is extracted from the route parameters.
Return Value:
If the channel is found, it returns a JSON array of the channel.
If there is an error, it returns Internal Server Error response.
What it does: This route fetches a chat channel based on the provided id.
Get All Groups
Route: /api/groups
Parameters: None.
Return Value:
If groups are successfully retrieved, it returns a JSON array of all groups.
If there is an error, it returns a 500 Internal Server Error response.
What it does: This route retrieves all groups from the groups collection.
Get User-Specific Groups
Route: /api/groups/users/:userId/
Parameters: The userId is extracted from the route parameters.
Return Value:
If user-specific groups are successfully retrieved, it returns a JSON array of groups associated with the user.
If the user is not found, it returns a 404 Not Found response with an error message.
In case of an unexpected error, it returns a 500 Internal Server Error response.
What it does: This route fetches groups associated with a specific user. It queries the groups collection based on the user's ID or another attribute, and returns the list of groups.
Get All Users
Route: /api/getusers
Parameters: None.
Return Value:
If users are successfully retrieved, it returns a JSON array of all users with the password field excluded.
If there is an error, it returns a 500 Internal Server Error response.
What it does: This route retrieves all users from the users collection, excluding the password field.
Get Users in Group
Route: /api/groups/:groupId/users
Parameters: The groupId is extracted from the route parameters.
Return Value:
If users in the group are successfully retrieved, it returns a JSON array of users in the specified group.
If there is an error, it returns a 500 Internal Server Error response.
What it does: This route fetches users who are members of the specified group from the users collection.
User Authentication
Route: /api/auth
Parameters: The user's email and password are extracted from the request body.
Return Value:
If the user is successfully authenticated, it returns user information (excluding the password field) as a JSON response.
If authentication fails, it returns an object with valid set to false.
In case of an error, it returns a 500 Internal Server Error response.
What it does: This route performs user authentication by comparing the provided email and password with those stored in the database. It returns user information upon successful authentication.
Promote User to Group Admin
Route: /api/promotetoadmin/:userId
Parameters: The userId is extracted from the route parameters.
Return Value:
If the user is successfully promoted to a group admin, it returns a 200 OK response with a success message.
If the user is already a group admin, it returns a 400 Bad Request response with an error message.
In case of an unexpected error, it returns a 500 Internal Server Error response.
What it does: This route promotes a user to the role of group admin if they are not already in that role.
Promote User to Super Admin
Route: /api/promotetosuper/:userId
Parameters: The userId is extracted from the route parameters.
Return Value:
If the user is successfully promoted to a super admin, it returns a 200 OK response with a success message.
If the user is already a super admin, it returns a 400 Bad Request response with an error message.
In case of an unexpected error, it returns a 500 Internal Server Error response.
What it does: This route promotes a user to the role of super admin, and, if they are not already a group admin, it also promotes them to that role.
Update User Avatar
Route: /api/updateuser
Parameters: The user's avatar is extracted from the request body.
Return Value: It returns a response indicating success ({ok:true}) upon updating the user's avatar.
What it does: This route updates a user's avatar in the database.
Name: Image File Upload Route
Method: POST
Route: /api/upload
Parameters: None (expects the file to be sent as part of the HTTP request).
Return Value: JSON response to the client, providing information about the uploaded file and the upload status.
What it does: This route is used to handle image file uploads. It uses the Formidable library to parse and handle form data, including file uploads. The uploaded image is temporarily stored in a designated folder, and then it is moved to a final storage location. The route sends a JSON response to the client with details about the uploaded file and a success message if the upload is successful. If any errors occur during parsing or renaming, it sends an error message to the client.
 
## Angular Architecture
#### Components:
appComponents is the container of all the pages/contents. The page is split up into 6 parts chat, group, login, profile and signup. The group component is split up into channel, grouplist, grouplistuserview, listof users, channels, available group and users in group. Depending on the role of the user the group component show different view for each role. The login component is where the user can login. The profile components is where the user and see their info (email, username) and logout and delete their account. 
#### Services
Uath service is responsible for authenticating users when they are login in.
 Group service is responsible any group related things like http request to the server to get data and for persisting data into storage.  
User service is responsible user related things like http request to the server to get data and for persisting data into storage. 
Imageupload service is responsible for uploading image via post method to the server.
Sockets service is responsible for realtime communication using socket.io. 
#### Models
Channel model is imported when model is needed.
Group model is imported when model is needed.
User model is imported when user model is needed.
Message model is imported when user model is needed.



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
