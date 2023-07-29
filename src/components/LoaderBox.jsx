import React from 'react'
import '../styles/loaderbox.css'
import Rin from '../assets/logo.webp'

const LoaderBox = () => {
    return (
        <div className='cube__container'>
            <div className="cube-loader">
                <div className="cube-top">
                </div>
                    <div className="cube-wrapper">
                        <span style={{ '--i': 0 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src={Rin} alt="This is one of the artwork of https://www.instagram.com/animeglowart/" />
                        </span>
                        <span style={{ '--i': 1 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src={Rin} alt="This is one of the artwork of https://www.instagram.com/animeglowart/" />
                        </span>
                        <span style={{ '--i': 2 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src={Rin} alt="This is one of the artwork of https://www.instagram.com/animeglowart/" />
                        </span>
                        <span style={{ '--i': 3 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src={Rin} alt="This is one of the artwork of https://www.instagram.com/animeglowart/" />
                        </span>
                    </div>
                </div>
        </div>
    
       
    )
}

export default LoaderBox
