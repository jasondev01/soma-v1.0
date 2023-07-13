import { useContext, createContext, useEffect, useState } from "react"
import axios from "axios"
import { removeHtmlTags } from '../utilities/utility';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    const baseUrl = `https://api.consumet.org/meta/anilist`;

    const fetchHero = async () => {
        try {
            const response = await axios.get(`${baseUrl}/random-anime?provider=gogoanime`)
            const responseData = response.data;
            const cleanedDescription = removeHtmlTags(responseData.description);
            const cleanData = {...responseData, description: cleanedDescription };
            return cleanData;
        } catch(error) {
            console.log("Hero Context", error.message);
            setTimeout(() => {
                return fetchHero();
            }, 6000)
        }
    }

    const fetchLatest = async () => {
        try {
            const response = await axios.get(`${baseUrl}/recent-episodes?page=1&perPage=10&provider=gogoanime`)
            const responseData = response?.data?.results;
            return responseData;
        } catch(error) {
            console.log("Latest Context", error.message);
        }
    }

    const fetchTrending = async () => {
        try {
            const response = await axios.get(`${baseUrl}/trending?page=1&perPage=12`)
            const responseData = response.data.results;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData;
        } catch(error) {
            console.log("Trending Context", error.message);
        }
    }

    const fetchPopular = async () => {
        try {
            const response = await axios.get(`${baseUrl}/popular?page=1&perPage=20`);
            const responseData = response.data.results;
            return responseData;
        } catch(error) {
            console.log("Popular Context", error.message);
        }
    }

    const fetchInfo = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/info/${id}?provider=gogoanime`)
            const responseData = response.data;
            const cleanedDescription = removeHtmlTags(responseData.description);
            const cleanData = { ...responseData, description: cleanedDescription };
            return cleanData;
        } catch(error) {
            console.log("Info Context", error.message);
        }
    }

    const fetchWatch = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/info/${id}?provider=gogoanime`);
            const responseData = response.data;
            return responseData;
        } catch(error) {
            console.log("Watch Context", error.message);
        }
    }

    const fetchEpisodeWatch = async (episodeId) => {
        try {
            const response = await axios.get(`${baseUrl}/watch/${episodeId}`)
            const responseData = response.data.headers;
            return responseData;
        } catch {error} {
            console.log("Episode Watch Context", error.message);
        }
    }

    return (
        <ApiContext.Provider value={{ 
            fetchHero,
            fetchLatest,
            fetchTrending,
            fetchPopular,
            fetchInfo,
            fetchWatch,
            fetchEpisodeWatch,
        }}>
            {children}
        </ApiContext.Provider>);
};

export default function useApiContext() {
    return useContext(ApiContext)
}


