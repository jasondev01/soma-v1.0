import React from 'react'
import '../styles/loaderbox.css'
import Rin from '../assets/logo.webp'
import { LazyLoadImage } from 'react-lazy-load-image-component'

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
                            <LazyLoadImage
                                effect='blur' 
                                src={Rin} 
                                alt="This is one of the artwork animeglowart" 
                            />
                        </span>
                        <span style={{ '--i': 1 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <LazyLoadImage
                                effect='blur' 
                                src={Rin} 
                                alt="This is one of the artwork animeglowart" 
                            />
                        </span>
                        <span style={{ '--i': 2 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <LazyLoadImage
                                effect='blur' 
                                src={Rin} 
                                alt="This is one of the artwork animeglowart" 
                            />
                        </span>
                        <span style={{ '--i': 3 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <LazyLoadImage
                                effect='blur' 
                                src={Rin} 
                                alt="This is one of the artwork animeglowart" 
                            />
                        </span>
                    </div>
                </div>
        </div>
    
       
    )
}

export default LoaderBox
