import { page } from "./imported/importedLibraries.js";
import { render } from "./imported/importedLibraries.js"

import { showAllHacks } from "./views/allHacks.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showProfile } from "./views/profile.js";
import { showRegister } from "./views/register.js";
import { logoutFunc } from "./views/logout.js"


page('/all-hacks', renderMiddleware, showAllHacks);
page('/create', renderMiddleware, showCreate);
page('/details/:id', renderMiddleware, showDetails);
page('/edit/:id', renderMiddleware, showEdit);
page('/', renderMiddleware, showHome);
page('/login', renderMiddleware, showLogin);
page('/profile', renderMiddleware, showProfile);
page('/register', renderMiddleware, showRegister);


if (sessionStorage.getItem("token") == null) {
    page.start("/")
} else {
    page.start("/all-hacks");
}

updateUserNav();

function renderMiddleware(context, next) {
    context.render = (content) => render(content, document.querySelector("main"));
    next();
}

export function updateUserNav() {
    let userDiv = document.querySelector(".user");
    let guestDiv = document.querySelector(".guest");

    let token = sessionStorage.getItem("token");

    if (token == null) {
        userDiv.style.display = "none";
        guestDiv.style.display = "block";
    } else {
        userDiv.style.display = "block";
        guestDiv.style.display = "none";
        document.getElementById("greeting")
            .textContent = `Hi ${sessionStorage.getItem("username")}`;
    }
}

logoutFunc();