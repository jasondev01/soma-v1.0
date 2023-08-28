import { useContext, createContext} from "react"
import axios from "axios"
import { removeHtmlTags } from '../utilities/utility';
import { animeUrl, consUrl, corsUrl, baseUrl, restSecret } from "../utilities/service";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {

    const fetchHero = async () => {
        try {
            const response = await axios.post(`${baseUrl}/hero`, JSON.stringify({ restSecret }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
            const responseData = response.data.data;
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
            const response = await axios.post(`${baseUrl}/latest`, JSON.stringify({ restSecret }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
            const responseData = response.data.data;
            // console.log("Latest Context", responseData)
            return responseData;
        } catch(error) {
            console.log("Latest Context", error.message);
            return false;
        }
    }

    const fetchPopular = async () => {
        try {
            const response = await axios.post(`${baseUrl}/popular`, JSON.stringify({ restSecret }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const responseData = response.data;
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

    const fetchInfo = async (slug) => {
        try {
            const response = await axios.post(`${baseUrl}/info`, JSON.stringify({ slug }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            // const response = await axios.get(`${corsUrl}/${animeUrl}/anime/${slug}`)
            const responseData = response.data.data;
            const cleanedDescription = removeHtmlTags(responseData?.description);
            const cleanData = { ...responseData, description: cleanedDescription };
            // console.log("Info Context", cleanData);
            return cleanData;
        } catch(error) {
            console.log("Info Context", error.message);
            return true;
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
            const response = await axios.post(`${baseUrl}/new-season`, JSON.stringify({ restSecret }), {
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
            // console.log("New Season Context", cleanData);
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


