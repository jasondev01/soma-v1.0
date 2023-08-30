import { useState } from "react";
import useApiContext from "../context/ApiContext"

const Updater = (session) => {
    const { getUpdate } = useApiContext();
    const [ updating, setUpdating ] = useState(null);
    const [ response, setResponse ] = useState('')
    const [ activeButton, setActiveButton ] = useState('')

    const admin = session?.session?.email;

    const handleUpdate = async ( endpoint ) => {
        setActiveButton(endpoint)
        console.log('email', admin)
        try {
            setUpdating(true)
            setResponse('Updating..')
            const response = await getUpdate(endpoint)
            if (!response) alert(`Error fetching ${endpoint} endpoint`)
            setResponse('Updated!')
            setTimeout(() => {
                setUpdating(false)
                setActiveButton('')
            }, 2000)
            console.log(response)
        } catch(error) {
            console.log(`${endpoint} error`, error)
        }
    }
 
    return (
        <div 
            className="container"
            style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0.5rem auto',
                gap: '0.8rem',
                flexWrap: 'wrap',
            }}
        >
            <button className={`btn btn-primary ${activeButton === 'hero' ? 'active' : ''}`}
                onClick={() => handleUpdate('hero')}
                disabled={!session.session || updating}
            >
                { activeButton === 'hero' && updating ? response : 'Hero' }
            </button>
            <button className={`btn btn-primary ${activeButton === 'latest' ? 'active' : ''}`}
                onClick={() => handleUpdate('latest')}
                disabled={!session.session || updating}
            >
                { activeButton === 'latest' && updating ? response : 'Latest' }
            </button>
            <button className={`btn btn-primary ${activeButton === 'popular' ? 'active' : ''}`}
                onClick={() => handleUpdate('popular')}
                disabled={!session.session || updating}
            >
                { activeButton === 'popular' && updating ? response : 'Popular' }
            </button>
            <button className={`btn btn-primary ${activeButton === 'newseason' ? 'active' : ''}`}
                onClick={() => handleUpdate('newseason')}
                disabled={!session.session || updating}
            >
                { activeButton === 'newseason' && updating ? response : 'New Season' }
            </button>
        </div>
    )
}

export default Updater
