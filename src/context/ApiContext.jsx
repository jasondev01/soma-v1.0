import { useContext, createContext, useEffect, useState } from "react"
import axios from "axios"
import { removeHtmlTags } from '../utilities/utility';
import { baseUrl, animeUrl } from "../utilities/service";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    const fetchHero = async () => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/popular?page=1&perPage=15`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response?.data?.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData;
        } catch(error) {
            console.log("Hero Context", error.message);
            return false;
        }
    }

    const fetchLatest = async () => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/recent?page=1&perPage=30`,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response?.data?.data;
            // console.log("Latest Context", responseData)
            const filteredData = responseData.filter(item => item?.anime?.countryOfOrigin !== 'CN')
            return filteredData;
        } catch(error) {
            console.log("Latest Context", error.message);
            return false;
        }
    }

    const fetchPopular = async () => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/popular?page=1&perPage=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData;
        } catch(error) {
            console.log("Popular Context", error.message);
            return false;
        }
    }

    const fetchInfo = async (id) => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/anime/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data;
            const cleanedDescription = removeHtmlTags(responseData.description);
            const cleanData = { ...responseData, description: cleanedDescription };
            return cleanData;
        } catch(error) {
            console.log("Info Context", error.message);
            return false;
        }
    }

    const fetchWatch = async (id, episode) => {
        try {
            const response = await axios.get(`${animeUrl}/view/${id}/${episode}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data;
            return responseData;
        } catch(error) {
            console.log("Watch Info Context", error.message);
            return false;
        }
    }

    const fetchEpisodeWatch = async (episodeId) => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/https://api.consumet.org/anime/enime/watch?episodeId=${episodeId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data;
            return responseData;
        } catch (error) {
            console.log("Episode Watch Context", error.message);
            return error;
        }
    }

    const fetchLatestPage = async (pageNumber) => {
        try {
            const response = await axios.get(`${animeUrl}/recent?page=${pageNumber}&perPage=20&provider=gogoanime`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response?.data?.data;
            return responseData;
        } catch(error) {
            console.log("Latest Page Context", error.message);
            return false;
        }
    }

    const fetchPopularPage = async (pageNumber) => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/popular?page=${pageNumber}&perPage=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response?.data?.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData;
        } catch(error) {
            console.log("Popular Context", error.message);
            return false;
        }
    }

    const fetchSearch = async (query) => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/search/${query}?page=1&perPage=100`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response?.data?.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData;
        } catch(error) {
            console.log("Search Context", error.message);
            return false;
        }
    }

    const fetchLatestOngoing = async () => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/recent?page=1&perPage=100`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response?.data?.data;
            return responseData;
        } catch(error) {
            console.log("Latest Ongoing", error.message);
            return false;
        }
    }

    const fetchInfoOngoing = async (id) => {
        try {
            const response = await axios.get(`https://cors.zimjs.com/${animeUrl}/anime/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data;
            const cleanedDescription = removeHtmlTags(responseData.description);
            const cleanData = { ...responseData, description: cleanedDescription };
            return cleanData;
        } catch(error) {
            console.log("Latest Info Ongoing", error.message);
            return false;
        }
    }

    return (
        <ApiContext.Provider value={{ 
            fetchHero,
            fetchLatest,
            fetchPopular,
            fetchInfo,
            fetchWatch,
            fetchEpisodeWatch,
            fetchLatestPage,
            fetchPopularPage,
            fetchSearch,
            fetchLatestOngoing,
            fetchInfoOngoing,
        }}>
            {children}
        </ApiContext.Provider>);
};

export default function useApiContext() {
    return useContext(ApiContext)
}


