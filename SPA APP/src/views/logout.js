import {logout} from "../api/crud.js";
import { page }from "../imported/importedLibraries.js";
import { showNotification } from './notification/notification.js';

export function logoutFunc(){
    document.querySelector(".user")
        .addEventListener("click", async (e) => {
            if(e.target.textContent == 'Logout'){
                e.preventDefault();
                showNotification(`Goodbye`, "infoBox");
                await logout();
                sessionStorage.clear();
                page.redirect("/");
            }
        })
}