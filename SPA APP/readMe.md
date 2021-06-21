# Life Hacks - Single Page Application
Idea, creation and editing system.

## Functionality
* Implemented authentication and authorization.
* Ability to freely view the ideas of other users.
* Ability to freely share your own ideas.
* Ability to edit and delete personal posts.
* Interactive UX.

## Technologies
* HTML, CSS, JavaScript
* lit-html, page
* GitHub Pages, Back4App

## Application Pages
* **Home** - landing page.
* **Login/Regsiter** - registration with email, username and password.
* **All Hacks** - view all available life hacks in the database.
* **Share your hack** - create an idea and save it in the database.
* **My Profile** - view information about the user and their shared posts.

### Data structure
#### Colections
* Sessions (official)
* Users 
```javascript
{   
    email: String,
    username: String,
    password: String
}
```
* Hack 
```javascript
{   
    name: String,
    imageUrl: String,
    description: String,
    owner: Pointer<User>
}
```
* Comment 
```javascript
{   
    value: String,
    hack: Pointer<Hack>,
    owner: Pointer<User>
}
```

#### Access control
* All users can view the posts.
* Only authorized users can create a post or comments.
* Only authenticated users (creators) can edit or delete a post.
* Only authorized users (creators) can delete a comments.
