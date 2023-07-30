import { useContext, createContext, useEffect, useState } from "react"
import axios from "axios"
import { removeHtmlTags } from '../utilities/utility';
import { baseUrl } from "../utilities/service";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    const fetchHero = async () => {
        try {
            const response = await axios.get(`${baseUrl}/random-anime?provider=gogoanime`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data;
            const cleanedDescription = removeHtmlTags(responseData.description);
            const cleanData = {...responseData, description: cleanedDescription };
            return cleanData;
        } catch(error) {
            console.log("Hero Context", error.message);
            return false;
        }
    }

    const fetchLatest = async () => {
        try {
            const response = await axios.get(`${baseUrl}/recent-episodes?page=1&perPage=10`,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response?.data?.results;
            console.log("Latest Context", responseData)
            return responseData;
        } catch(error) {
            console.log("Latest Context", error.message);
            return false;
        }
    }

    const fetchTrending = async () => {
        try {
            const response = await axios.get(`${baseUrl}/trending?page=1&perPage=12`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data.results;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData;
        } catch(error) {
            console.log("Trending Context", error.message);
            return false;
        }
    }

    const fetchPopular = async () => {
        try {
            const response = await axios.get(`${baseUrl}/popular?page=1&perPage=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data.results;
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
            const response = await axios.get(`${baseUrl}/info/${id}`, {
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

    const fetchWatch = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/info/${id}?provider=gogoanime`, {
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
            const response = await axios.get(`${baseUrl}/watch/${episodeId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data;
            return responseData;
        } catch {error} {
            console.log("Episode Watch Context", error.message);
            return false;
        }
    }

    const fetchLatestPage = async (pageNumber) => {
        try {
            const response = await axios.get(`${baseUrl}/recent-episodes?page=${pageNumber}&perPage=20&provider=gogoanime`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data.results;
            return responseData;
        } catch(error) {
            console.log("Latest Page Context", error.message);
            return false;
        }
    }

    const fetchTrendingPage = async (pageNumber) => {
        try {
            const response = await axios.get(`${baseUrl}/trending?page=${pageNumber}&perPage=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data.results;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            return cleanData; 
        } catch(error) {
            console.log("Trending Page Context", error.message);
            return false;
        }
    }

    const fetchPopularPage = async (pageNumber) => {
        try {
            const response = await axios.get(`${baseUrl}/popular?page=${pageNumber}&perPage=20`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data.results;
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

    const fetchSearch = async (query, pageNumber) => {
        try {
            const response = await axios.get(`${baseUrl}/${query}?page=${pageNumber}&perPage=100`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data.results;
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

    const fetchLatestOngoing = async () => {
        try {
            const response = await axios.get(`${baseUrl}/recent-episodes?page=1&perPage=100`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data.results;
            return responseData;
        } catch(error) {
            console.log("Latest Ongoing", error.message);
            return false;
        }
    }

    const fetchInfoOngoing = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/info/${id}?provider=gogoanime`, {
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
            fetchTrending,
            fetchPopular,
            fetchInfo,
            fetchWatch,
            fetchEpisodeWatch,
            fetchLatestPage,
            fetchTrendingPage,
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


