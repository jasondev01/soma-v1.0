import { useEffect, useRef, useState } from "react";
import { AiFillSetting } from 'react-icons/ai'

const QualityButton = ({ options, onChange, currentQuality, fetchEnimeEpisode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const qualityButtonRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleQualityChange = (option) => {
        setIsOpen(false);
        onChange(option);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                qualityButtonRef.current &&
                !qualityButtonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        
          const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        
          document.addEventListener('mousedown', handleClickOutside);
          document.addEventListener('keydown', handleKeyDown);
        
          return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // console.log('options: ', options)
    // console.log("currentQuality", currentQuality)

    return (
        <div ref={qualityButtonRef}
            className={`quality ${fetchEnimeEpisode ? 'd-none' : ''}`} 
            tabIndex={0}
        >
            <button onClick={handleToggle} className="quality__button">
                <AiFillSetting className="quality__button__icon"/>
                <span></span>
            </button>
            {
                isOpen && (
                <ul className="quality__options">
                    {
                        options.map((option, index) => (
                            <li key={index} 
                                onClick={() => handleQualityChange(option)}
                                className={currentQuality === option.quality ? 'current' : ''}
                            >
                                {option.quality}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
  );
};

export default QualityButton;