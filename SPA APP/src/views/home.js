import { html } from "../imported/importedLibraries.js"

const home = html`
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Life Hacks World</h1>
        <p>Share your Hacks, make your life fun, easier...and more!</p>
        <img src="/images/hack2.jpg" alt="life-hack-image">
        <h2>Login to see our hacks right away!</h2>
        <div id="button-div">
            <a href="/login" class="button">Login</a>
            <a href="/register" class="button">Register</a>
        </div>
    </div>
</section>`

export function showHome(context) {
    context.render(home);
}