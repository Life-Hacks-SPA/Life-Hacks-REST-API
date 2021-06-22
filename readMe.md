# RЕST API - Life Hacks 
RЕST API for Life Hacks - Single Page Application

## Functionality
* Records, reads, changes and deletes information from the database.
* Server Authentication and Authorization. 
* Password hashing for users, before saving in the database. 
* Ability to review sent requests, urls and console data.
* Protection from incorrect data entering the database (validation).
* Automatic removal of nonexistent data. (When a post is deleted, the comments under it are deleted as well, when a comment is deleted, its reference in the corresponding post is removed)


## Technologies
* Express JS.
* bcrypt,  jsonwebtoken.
* Mongoose, validator.
* cors, nodemon.


#### Access control
* All users can view the posts.
* Only authorized users can create a post or comments.
* Only authenticated users (creators) can edit or delete a post.
* Only authorized users (creators) can delete a comments.
