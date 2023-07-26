import '../styles/skeleton.css'
import LoaderBox from './LoaderBox'

const LoadingSkeleton = () => {
    return (
        <div className='container loading__skeleton'>
            <div className='skeleton__box'>
                <LoaderBox />
            </div>
            <div className='skeleton__box'>
                <LoaderBox />
            </div>
            <div className='skeleton__box'>
                <LoaderBox />
            </div>
            <div className='skeleton__box'>
                <LoaderBox />
            </div>
            <div className='skeleton__box'>
                <LoaderBox />
            </div>
        </div>
    )
}

export default LoadingSkeleton
