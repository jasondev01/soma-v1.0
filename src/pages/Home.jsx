import { Helmet } from 'react-helmet'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import Popular from '../components/Popular'
import Trending from '../components/Trending'

const Home = () => {
    return (
        <>
            <Helmet>
                <title>soma - Home</title>
                <meta 
                    name='description' 
                    content="Explore Anime Series and Movies"
                />
                <meta property="og:image" content="https://soma-chill.vercel.app/webshare.png" />
            </Helmet>
            <Hero />
            <Latest />
            <Trending />
            <Popular />
        </>
    )
}

export default Home
