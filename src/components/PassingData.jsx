import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import Pageloader from './Pageloader';
import useApiContext from '../context/ApiContext';

const PassingData = () => {
    const { id, epNum } = useParams();
    const navigate = useNavigate();
    const [ pageLoad, setPageLoad ] = useState(false)
    const { fetchInfo } = useApiContext();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchInfo(id);
            console.log(response)
            if(!response) {
                setTimeout(() => {
                    setPageLoad(false)
                    fetchData();
                }, 6000);
            } else {
                setPageLoad(true)
            }
            const matchingEpisode = response.episodes.find(
                item => item.number === Number(epNum)
            );
            console.log(matchingEpisode)
            if (matchingEpisode) {
                const episodeID = matchingEpisode.id;
                navigate(`/watch/${id}/${episodeID}`);
            } else {
                navigate('/');
            }
        }
        fetchData();
        setPageLoad(false)
    }, [])

    // Pageload
    if(!pageLoad) {
        return <Pageloader />
    }
}

export default PassingData