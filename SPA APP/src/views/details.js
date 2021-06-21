import {
    getHackDetails,
    deleteHack,
    deleteComment,
    createCommnet
} from "../api/crud.js";
import { html } from "../imported/importedLibraries.js";
import { loadingTemplate } from "../animations/loadingGif.js";
import { showNotification } from './notification/notification.js';


const detailsTemplate = (data, deleteFunction) => html`
<section id="meme-details">
    <h1>${data.name}</h1>

    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${data.imageUrl}">
        </div>
        <div class="meme-description">

            <p>${data.description}</p>

            ${data.ownerId._id == sessionStorage.getItem("personId") ? html`
            <a class="button warning" href="/edit/${data._id}">Edit</a>
            <button @click="${deleteFunction}" class="button danger">Delete</button>
            ` : html`<h4>Autor: <span id="autor">${data.ownerId.username}</span></h4>`}
        </div>

    </div>
    <div id="hack-comments">
        <h2>Comments</h2>
        ${data.comments.length > 0 ? data.comments.map(curComment) : html`<p class="no-comments">There are no comments yet, be the first!</p><br>`}
        ${sessionStorage.getItem("personId") !== null ? html`
        <input id="send-comment" placeholder="Add comment" name="send" type="text">
        <button id="add-comment" class="registerbtn button">Add</button>
        ` : ""}
    </div>
</section>
`

const curComment = (e) => html`
<div class="comment-wrapper">
    <h3>${e.username}</h3>
    <p>${e.value}</p>
    ${e.owner == sessionStorage.getItem("personId") ? html`
    <button class="delete-comment" value=${e._id}>Delete</button>
    ` : ""}
</div>`

export async function showDetails(context) {
    context.render(loadingTemplate)

    let data = await getHackDetails(context.params.id);

    context.render(detailsTemplate(data, deleteFunction));

    async function deleteFunction(e) {
        e.preventDefault();

        let conf = confirm("Are you sure to delete this post?");

        if (conf) {
            await deleteHack(data._id);
            context.page.redirect("/all-hacks");
            return;
        }
    }
    
    document.getElementById("add-comment")
        .addEventListener("click", async () => {
            let comment = document.getElementById("send-comment").value;
            if (comment == "") {
                showNotification("Comment cannot be empty!", "errorBox");
                return;
            }

            await createCommnet(comment, context.params.id);
            document.getElementById("send-comment").value = "";
            context.page.redirect(`/details/${context.params.id}`);
        })

    Array.from(document.getElementsByClassName('delete-comment'))
        .forEach(e => {
            e.addEventListener("click", async (e) => {
                let conf = confirm("Are you sure to delete this comment?");

                if (conf) {
                    await deleteComment(e.target.value);
                    e.stopPropagation();
                    context.page.redirect(`/details/${context.params.id}`);
                    return;
                }
            })
        })

}

