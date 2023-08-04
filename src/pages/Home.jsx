import { Helmet } from 'react-helmet'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import Popular from '../components/Popular'
import LastWatched from '../components/LastWatched'

const Home = () => {
    return (
        <>
            <Helmet>
                <title>soma - Home</title>
                <meta 
                    name='description' 
                    content="Explore Anime Series and Movies"
                />
            </Helmet>
            <Hero />
            <LastWatched />
            <Latest />
            <Popular />
        </>
    )
}

export default Home
