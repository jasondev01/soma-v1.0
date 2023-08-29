export const consUrl = import.meta.env.VITE_API_NEWS_URL
export const animeUrl = import.meta.env.VITE_API_ANIME_URL
export const corsUrl = import.meta.env.VITE_API_CORS_URL
export const baseUrl = import.meta.env.VITE_API_SOMA_USERS
export const secretKey = import.meta.env.VITE_API_SECRET_KEY
export const restSecret = import.meta.env.VITE_API_REST_SECRET
export const admin = import.meta.env.VITE_API_ADMIN_EMAIL
export const sub_admin = import.meta.env.VITE_API_SUB_EMAIL

// login and register user service
export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json();

    if (!response.ok) {
        let message;
        if(data?.message) {
            message = data.message
        } else {
            message = data;
        }
        return { error: true, message }
    }

    return data;
}

export const getRequest = async (url) => {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        let message = "An error occured..."

        if (data.message) {
            message = data.message;
        }
        return {error: true, message}
    }
    return data;
}
