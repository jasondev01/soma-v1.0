import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Pageloader from './Pageloader';

const PassingData = () => {
    const { id, epNum } = useParams();
    const navigate = useNavigate();
    const [ pageLoad, setPageLoad ] = useState(false)

    const passUrl = `https://api.consumet.org/meta/anilist/info/${id}?provider=gogoanime`

    console.log(epNum)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(passUrl);
                const responseData = response.data;
                const matchingEpisode = responseData.episodes.find(
                    (item) => item.number === Number(epNum)
                );
                console.log(matchingEpisode)
                if (matchingEpisode) {
                    const episodeID = matchingEpisode.id;
                    navigate(`/watch/${id}/${episodeID}`);
                }
            } catch(error) {
                console.log(error.message);
                setTimeout(() => {
                    fetchData();
                }, 6000);
            }
        }
        fetchData();
    }, [])

    // Pageload
    if(!pageLoad) {
        return <Pageloader />
    }
}

export default PassingData