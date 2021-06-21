import * as api from "./api.js"
import { updateUserNav } from "../app.js"

import { settings } from "../settings/appSetings.js"
const { host } = settings();


export async function createHack(name, imageUrl, description) {
    return await api.post(host + "/hack/create", { name, imageUrl, description });
}

export async function createCommnet(value, hackId) {
    return await api.post(host + "/comment/create", { value, hack: hackId })
}


export async function deleteComment(commentId) {
    return await api.del(host + `/comment/delete/${commentId}`);
}

export async function getAllHacks() {
    return await api.get(host + "/hack");
}

export async function getHackDetails(id) {
    return await api.get(host + `/hack/details/${id}`);
}

export async function updateHack(id, data) {
    return await api.put(host + `/hack/update/${id}`, data);
}

export async function deleteHack(id) {
    return await api.del(host + `/hack/delete/${id}`);
}

export async function getHacksByProfileId() {
    let userId = sessionStorage.getItem("personId");
    return await api.get(host + `/hack/profile/${userId}`);
}

export async function login(username, password) {
    const result = await api.post(host + "/auth/login", { username, password });
    sessionStorage.setItem("token", result.sessionToken);
    sessionStorage.setItem("personId", result.objectId);
    sessionStorage.setItem("username", username);
    updateUserNav();
}

export async function register(email, username, password) {
    const result = await api.post(host + "/auth/register", { email, username, password });
    sessionStorage.setItem("token", result.sessionToken);
    sessionStorage.setItem("personId", result.objectId);
    sessionStorage.setItem("username", username);
    updateUserNav()
}

export async function logout() {
    await api.get(host + "/auth/logout");
    sessionStorage.clear();
    updateUserNav();
}
