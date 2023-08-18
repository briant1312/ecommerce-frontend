const BASE_URL = import.meta.env.VITE_APP_BASE_URL + "items/"

export async function indexCategory(category) {
    try {
        const products = await fetch(BASE_URL + `category/${category}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await products.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}

export async function show(id) {
    try {
        const product = await fetch(BASE_URL + `${id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await product.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
}
