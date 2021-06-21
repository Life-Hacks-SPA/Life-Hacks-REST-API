export function showNotification(message, typeId){
    let notofication = document.getElementById("notifications");
    let messageElement = document.getElementById("message");
    let box = messageElement.parentElement;

    messageElement.textContent = message;
    box.setAttribute("id", typeId);
    notofication.style.display = "block";

    setTimeout(() => {
        notofication.style.display = "none";
        messageElement.textContent = "";
        box.removeAttribute("id");
    }, 3000)
}
