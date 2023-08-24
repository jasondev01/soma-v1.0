import { useContext, createContext} from "react"
import axios from "axios"
import { removeHtmlTags } from '../utilities/utility';
import { animeUrl, consUrl, corsUrl, baseUrl } from "../utilities/service";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    const fetchHero = async () => {
        try {
            const response = await axios.get(`${baseUrl}/hero`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response?.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            // console.log("Hero Context", cleanData);
            return cleanData;
        } catch(error) {
            console.log("Hero Context", error.message);
            return false;
        }
    }

    const fetchLatest = async () => {
        try {
            const response = await axios.get(`${baseUrl}/latest`,  {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response?.data;
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
            const response = await axios.get(`${baseUrl}/popular`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response?.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            // console.log("Popular Context", cleanData)
            return cleanData;
        } catch(error) {
            console.log("Popular Context", error.message);
            return false;
        }
    }

    const fetchInfo = async (id) => {
        try {
            const response = await axios.get(`${corsUrl}/${animeUrl}/anime/${id}`, {
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
            const response = await axios.get(`${corsUrl}/${animeUrl}/view/${id}/${episode}`, {
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
            const response = await axios.get(`${corsUrl}/${consUrl}/anime/enime/watch?episodeId=${episodeId}`, {
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
            const response = await axios.get(`${corsUrl}/${animeUrl}/recent?page=${pageNumber}&perPage=30&provider=gogoanime`, {
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
            const response = await axios.get(`${corsUrl}/${animeUrl}/popular?page=${pageNumber}&perPage=20`, {
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
            const response = await axios.get(`${corsUrl}/${animeUrl}/search/${query}?page=1&perPage=100`, {
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

    const fetchNewSeason = async () => {
        try {
            const response = await axios.get(`${baseUrl}/new-season`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response?.data;
            const cleanData = responseData.map(item => ({
                ...item,
                description: removeHtmlTags(item.description)
            }))
            // console.log("Latest Ongoing Context", cleanData);
            return cleanData;
        } catch(error) {
            console.log("Latest Ongoing", error.message);
            return false;
        }
    }


    const getSource = async (episode) => {
        try {
            const response= await axios.get(`${corsUrl}/${animeUrl}/source/${episode}`)
            return response;
        } catch(error) {
            console.log("Source", error.message)
            return false;
        }
    }

    const getNews = async () => {
        try {
            const response = await axios.get(`${corsUrl}/${consUrl}/news/ann/recent-feeds`)
            return response.data
        } catch(error) {
            console.log("News", error.message);
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
            fetchNewSeason,
            getNews,
            getSource,
        }}>
            {children}
        </ApiContext.Provider>);
};

export default function useApiContext() {
    return useContext(ApiContext)
}


