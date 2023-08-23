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
