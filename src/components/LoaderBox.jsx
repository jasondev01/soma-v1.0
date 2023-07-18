import React from 'react'
import '../styles/loaderbox.css'

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
                            <img src="https://i.pinimg.com/originals/0e/50/39/0e503918829c61bd24803ce064546cee.jpg" alt="ren" />
                        </span>
                        <span style={{ '--i': 1 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src="https://i.pinimg.com/originals/0e/50/39/0e503918829c61bd24803ce064546cee.jpg" alt="ren" />
                        </span>
                        <span style={{ '--i': 2 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src="https://i.pinimg.com/originals/0e/50/39/0e503918829c61bd24803ce064546cee.jpg" alt="ren" />
                        </span>
                        <span style={{ '--i': 3 }} className="cube-span">
                            <span className='loading'>
                                Loading
                            </span>
                            <img src="https://i.pinimg.com/originals/0e/50/39/0e503918829c61bd24803ce064546cee.jpg" alt="ren" />
                        </span>
                    </div>
                </div>
        </div>
    
       
    )
}

export default LoaderBox
