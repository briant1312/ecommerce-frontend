const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "users/"

export async function login(user) {
    const res = await fetch(BASE_URL + "log-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    if (!res.ok) {
        const message = await res.json();
        throw new Error(message);
    }

    const token = await res.json();
    localStorage.setItem("token", token);
    return getUser();
}

export async function signup(user) {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    if (!res.ok) {
        const message = await res.json();
        throw new Error(message);
    }

    const token = await res.json();
    localStorage.setItem("token", token);
    return getUser();
}

export function getUser() {
    const token = localStorage.getItem('token') ;

    if (!token) return null;

    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const parsedPayload = JSON.parse(decodedPayload);

    if(parsedPayload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return null;
    } else {
        return parsedPayload.user;
    }
}
