import React from 'react'
import '../styles/pageload.css'

const Pageloader = () => {
    return (
        <div className='pageload'>
            <div className='effect'></div>
            <div className='effect'></div>
            <div className='effect'></div>
            <div className='loading'>Loading...</div>
        </div>
    )
}

export default Pageloader
