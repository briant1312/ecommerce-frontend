import { getToken } from "./user";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "orders/"

export async function getCart() {
    const token = getToken();
    if (!token) return;
    try {
        const res = await fetch(BASE_URL + "cart", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

export async function addItemToCart(orderId, itemId, qty) {
    const token = getToken();
    if (!token) return;
    try {
        const body = {
            orderId,
            itemId,
            qty
        }
        const res = await fetch(BASE_URL + "add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return res;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getOrderCount(orderId) {
    const token = getToken();
    if (!token) return;

    try {
        const res = await fetch(BASE_URL + `count/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const count = await res.json();
        return count;
    } catch (error) {
        console.error(error.message);
    }
}

export async function getItems(orderId) {
    const token = getToken();
    if (!token) return;
    
    try {
        const res = await fetch(BASE_URL + `items/${orderId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
