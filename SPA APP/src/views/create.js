import { createHack } from "../api/crud.js";
import { html } from "../imported/importedLibraries.js";
import { showNotification } from './notification/notification.js'


const createTemplate = (createFunction) => html`
<section id="create-meme">
    <form @submit=${createFunction} id="create-form">
        <div class="container">
            <h1>Create Hack</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Photo</label>
            <input id="imageUrl" type="text" placeholder="Enter ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Hack">
        </div>
    </form>
</section>
`


export async function showCreate(context) {
    context.render(createTemplate(createFunction));

    async function createFunction(e){
        e.preventDefault();
        
        let name = document.getElementById("title").value;
        let imageUrl = document.getElementById("imageUrl").value;
        let description = document.getElementById("description").value;

        if(name == "" || imageUrl == "" || description == ""){
            showNotification("All fields are required!", "errorBox");
            return;
        }

        if(description < 6){
            showNotification("Description must be at least 6 characters long!", "errorBox");
            return;
        }

        if(!imageUrl.startsWith("http")){
            showNotification("Invalid URL!", "errorBox");
            return;
        }

    
        let result = await createHack(name, imageUrl, description);
        console.log(result)
        context.page.redirect(`/details/${result.objectId}`)

        document.getElementById("title").value = "";
        document.getElementById("imageUrl").value = "";
        document.getElementById("description").value = "";
    }
}