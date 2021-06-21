import { getAllHacks } from "../api/crud.js";
import { html } from "../imported/importedLibraries.js"
import { loadingTemplate } from "../animations/loadingGif.js"


const allHacks = (data, findHack) => html`
<section id="meme-feed">
    <h1>All Hacks</h1>
    <form @submit=${findHack} id="search-form">
    <input id="search" placeholder="Find your Hack" name="search" type="text">
    <input type="submit" class="registerbtn button" value="Search">
    </form>
    <div id="memes">
        ${data.length > 0 ? data.map(curHack) : html`
        <p class="no-memes">No hacks in database.</p>
        `}
    </div>
</section>
`

const curHack = (e) => html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${e.name}</p>
                    <img class="meme-image" alt="hack-img" src="${e.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${e._id}">Details</a>
                </div>
            </div>
        </div>`


export async function showAllHacks(context) {
    context.render(loadingTemplate);
    let results = await getAllHacks();
    context.render(allHacks(results, findHack));

    async function findHack(e){
        e.preventDefault(e);
        let searchValue = document.getElementById("search").value;
        
        let filtered = results.filter(x => x.name.toLowerCase().includes(searchValue.toLowerCase()));
        context.render(allHacks(filtered, findHack));

        document.getElementById("search").value = "";
    }
}

