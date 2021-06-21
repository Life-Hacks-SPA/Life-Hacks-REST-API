import { getHacksByProfileId } from "../api/crud.js";
import { html } from "../imported/importedLibraries.js";
import { loadingTemplate } from "../animations/loadingGif.js";


const profileTemplate = (data) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/profile-page.jpg">
        <div class="user-content">
            <p>Username: ${sessionStorage.getItem("username")}</p>
            <p>My posts count: ${data.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Life Hacks</h1>
    <div class="user-meme-listings">
        ${data.length > 0 ? data.map(curHack) : html`
        <p class="no-memes">This user has no posts yet!</p>
        `}
    </div>
</section>`

const curHack = (e) => html`
<div class="user-meme">
    <p class="user-meme-title">${e.name}</p>
    <img class="userProfileImage" alt="hack-img" src="${e.imageUrl}">
    <a class="button" href="/details/${e._id}">Details</a>
</div>`

export async function showProfile(context) {
    context.render(loadingTemplate);
    const result = await getHacksByProfileId(sessionStorage.getItem("personId"));
    context.render(profileTemplate(result))
}