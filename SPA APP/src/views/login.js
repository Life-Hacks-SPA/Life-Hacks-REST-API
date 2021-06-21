import { login } from "../api/crud.js";
import { html } from "../imported/importedLibraries.js";
import { showNotification } from './notification/notification.js';

const loginTemplate = (loginFunction) => html`
<section id="login">
    <form @submit=${loginFunction} id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="username">Username</label>
            <input id="username" placeholder="Enter Username" name="username" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`

export async function showLogin(context) {
    context.render(loginTemplate(loginFunction));

    async function loginFunction(e){
        e.preventDefault();
        
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        if(username == "" || password == ""){
            showNotification("Username or Password must be filled!", "errorBox");
            return;
        }

        await login(username, password);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        context.page.redirect("/all-hacks");
    }
}