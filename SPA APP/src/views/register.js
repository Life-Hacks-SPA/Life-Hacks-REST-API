import { register } from "../api/crud.js";
import { html } from "../imported/importedLibraries.js";
import { showNotification } from './notification/notification.js';

const registerTemplate = (registerFunction) => html`
<section id="register">
    <form @submit=${registerFunction} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`

export async function showRegister(context) {
    context.render(registerTemplate(registerFunction))

    async function registerFunction(e){
        e.preventDefault();
        
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let rePass = document.getElementById("repeatPass").value;

        if(username == "" || email == "" || password == ""){
            showNotification("All fields are required!", "errorBox");
            return;
        }

        if(!email.includes("@")){
            showNotification("Invalid email!", "errorBox");
            return;
        }

        if(password.length < 6){
            showNotification("Password must be at least 6 characters long", "errorBox");
            return;
        }

        if(password !== rePass){
            showNotification("Passwords must be idenecal", "errorBox");
            return;
        }

        await register(email, username, password);
        context.page.redirect("/all-hacks");
        document.getElementById("username").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("repeatPass").value = "";
    }
}