import { writable } from "svelte/store";

const emptyUser = {
    name: '',
    email: '',
    loggedIn: false,
}
export const user = writable(emptyUser);
