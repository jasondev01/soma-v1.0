import { useState, useEffect } from "react";

function formatTimeUnit(unit) {
    return unit < 10 ? `0${unit}` : unit;
}

function Countdown({ nextEpisode }) {
    const [ countdownValue, setCountdownValue ] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const target = new Date(nextEpisode);
            
            const timeDifference = Math.max(target - now, 0); // Ensure it's not negative
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        
            const formattedDays = formatTimeUnit(days);
            const formattedHours = formatTimeUnit(hours);
            const formattedMinutes = formatTimeUnit(minutes);
            const formattedSeconds = formatTimeUnit(seconds);
        
            const countdown = `
                ${formattedDays} ${formattedDays > 1 ? 'days' : 'day'} : 
                ${formattedHours} ${formattedHours > 1 ? 'hrs' : 'hr'} : 
                ${formattedMinutes} ${formattedMinutes > 1 ? 'mins' : 'min'} : 
                ${formattedSeconds} ${formattedSeconds > 1 ? 'secs' : 'sec'}
            `;

            setCountdownValue(countdown);
        }, 1000);

        return () => {
        clearInterval(interval);
        };
    }, [nextEpisode]);

    return (
        <>
        {
            nextEpisode &&
            <div className="container" 
                style={{
                    marginTop: '0.8rem',
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '0.8rem',
                    flexWrap: 'wrap'
                }}
            >
                <h3>Next Episode: </h3>
                <p>
                    {countdownValue}
                </p>
            </div>
        }
        </>
    )
}

export default Countdown;
