import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { corsUrl } from '../utilities/service';
import useThemeContext from '../context/ThemeContext';

const News = ({news}) => {
    const { theme } = useThemeContext();

    return (
        <>
        {
            news &&
            <div className='display__news'>
                <div className="news__header">
                    <h4>
                        Latest News
                    </h4>
                </div>
                <div className="news__items">
                {
                    news?.slice(0, 5)?.map((item) => {
                        const inputTimeString = item.uploadedAt;
                        const currentYear = new Date().getFullYear();
                        const firstCommaIndex = inputTimeString.indexOf(",");
                        const formattedTimeString = inputTimeString.substring(0, firstCommaIndex) +
                        ", " + currentYear + " at" + inputTimeString.substring(firstCommaIndex + 1);
                        return (
                            <article 
                                className="news__item"
                                key={item.title}
                            >
                                <a 
                                    href={item.url} target='_blank' rel='noreferrer' 
                                    className='news__image'
                                >
                                    <LazyLoadImage 
                                        src={`${corsUrl}/${item.thumbnail}`} 
                                        alt={item.title} 
                                        height={100}
                                        width={100}
                                    />
                                </a>
                                <div className='news__title'>
                                    <h5 >
                                        <a href={item.url} target='_blank' rel='noreferrer'
                                            className={theme ? 'light' : 'dark'}>
                                            {item.title}
                                        </a>
                                    </h5>
                                    
                                </div>
                                <div className='news__desc'>
                                    <p >
                                        {item.preview.intro} {' '} 
                                    </p>
                                    <a href={item.url} target='_blank' rel='noreferrer'>Read More</a>
                                    
                                </div>
                                <span className='news__published'>
                                    {formattedTimeString}
                                </span>
                            </article>
                        )
                    })
                }
                </div>
            </div>
        }
        </>
    )
}

export default News
