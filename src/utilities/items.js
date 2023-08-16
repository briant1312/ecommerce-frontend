const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "items/"

export async function indexCategory(category) {
    try {
        const items = await fetch(BASE_URL + `category/${category}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await items.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
