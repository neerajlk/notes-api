# To-do Notes - API
REST API using NodeJs, Express , MongoDB (CRUD operations)

# Setup Guide
Clone and take a pull from master branch and install node modules using `npm install`.
create a collection named `Notes` in the mongodb server that is connected(default localhost).
start the server with command `npm start` from root project directory.

# Login and Register
 Register - POST : `/user` , payload : { "name" : 'your-name' "email" :'your-email' , "password": 'your-password'}

 Login - POST : `/login` , payload : { "email" :'your-email' , "password": 'your-password'}

# To-Do-Notes
 Create Note - POST : `/note` , payload : { "title" :'your-title' , "description": 'your-description'} ,  Headers : {Authorization : 'Token-generated-from-login'}

 Edit Note - PUT : `/note/:id` , payload : { "title" :'your-title' , "description": 'your-description'} , (`:id`- Note ID), Headers : {Authorization : 'Token-generated-from-login'}

 Delete Note - DELETE : `/note/:id` , (`:id`- Note ID) , Headers : {Authorization : 'Token-generated-from-login'}
 
 Get Note - GET : `/note/:id` , (`:id`- Note ID) , Headers : {Authorization : 'Token-generated-from-login'}
 
 Get All Notes - GET : `/notes` , (`:id`- Note ID) , params : { "page" :'page-no' , "limit": 'limit'} , Headers : {Authorization : 'Token-generated-from-login'}