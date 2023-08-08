import React from 'react'

const News = ({news}) => {

    return (
        <aside className='display__news'>
            <div className='news__header'>
                <h4>
                    News
                </h4>
            </div>
            <article className='news__items'>
            {
                news?.slice(0, 2).map((item, index) => {
                    const inputTimeString = item.uploadedAt;
                    const currentYear = new Date().getFullYear();

                    // Find the index of the first comma
                    const firstCommaIndex = inputTimeString.indexOf(",");

                    // Replace the comma with a space and the current year
                    const formattedTimeString = inputTimeString.substring(0, firstCommaIndex) +
                    ", " + currentYear + " at" + inputTimeString.substring(firstCommaIndex + 1);
                    return (
                        <div 
                            className="news__item"
                            key={index}
                        >
                            <a 
                                href={item.url} target='_blank' rel='noreferrer' 
                                className='news__image'
                            >
                                <img 
                                    src={item.thumbnail} 
                                    alt="" 
                                    height={100}
                                    width={100}
                                />
                            </a>
                            <div className='news__title'>
                                <h5>
                                    <a href="#">
                                        {item.title}
                                    </a>
                                </h5>
                                
                            </div>
                            <div className='news__desc'>
                                <p>{item.preview.intro} {' '} </p>
                                
                                <a href={item.url} target='_blank' rel='noreferrer'>Read More</a>
                            </div>
                            <span className='news__published'>
                                {formattedTimeString}
                            </span>
                        </div>
                    )
                })
            }
            </article>
        </aside>
    )
}

export default News
