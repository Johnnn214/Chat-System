# Assignment1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.
Software Frameworks Documentation
## Git 

The approach that I took is to create a remote repo in GitHub. After creating the angular project I created a local repo using “git init”, I added all this files using “git add”, using “git remote add origin https://github.com/Johnnn214/Assignment_1.git” to add my remote repo, using “git commit –m “initial commit” and pushing this using “git push -u origin main”. From then on after every milestone I commit using the source control in git hub by adding files to commit as well as adding a message for that commit. I did not use branching and mainly stick to the main branch when developing my code. I push my local repo after I finished on that day using “git push”. For the git layout both front end and server are both in the same repo.

## Data structure 
### Entities:
####  User:
id: string
username: string
email: string 
password: string
roles (Array of roles: ["Super Admin", "Group Admin", "User"]: array<string>
groups (Array of group the user is a member of): array<string>
#### Group:
Id: string
name: string
admins (Array of user who are group admins): array<string>
channels (Array of channel objects): array<channel>
#### Channel:
id (unique identifier) : string
name: string
groupId (ID of the parent group): string
users (Array of user who are members of the channel): array<string>
messages (Array of message objects)<array>
#### Message:
id: string
text: string
sender (user who sent the message): string
channel (channel where the message was sent): string
## REST- API
Route:
#### Login-
Method: POST 
Description: Handles user authentication by verifying credentials 
Parameters: JSON payload containing email, password in the request body.
Return Value: return the current user
#### Getuser
Method: POST
Description: gets all users based on what role they have
Parameters: JSON payload containing roles in the request body
Return Value:  array of user containing all user info except for password.
#### Getgroup
Method: POST
Description: retrieves all groups
Parameters:  None
Return Value: array of  groups
## Angular Architecture
#### Components:
appComponents is the container of all the pages/contents. The page is split up into 6 parts chat, group, login, profile, roles and signup. The group component is slip up into channel, grouplist, grouplistuserview, groupuser. The group component is responsible for showing the group list, the available group that can be applied and the user in one group. The role component is split up into groupadminlist, superlist and userlist and it is also responsible for promoting users to admin or super admin. The login component is where the user can login. The profile components is where the user and see their info (email, username) and logout and delete their account. 
#### Services
Uath service is responsible for authenticating users when they are login in. Group service is responsible any group related things like http request to the server to get data and for persisting data into storage.  User service is responsible user related things like http request to the server to get data and for persisting data into storage. 
#### Models
Channel model is imported when model is needed
Group model is imported when model is needed
User model is imported when user model is needed

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
