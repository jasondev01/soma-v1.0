import { useEffect } from 'react';

export default function useLocalStorage() {
    function getSomaWatched() {
        if (typeof window !== 'undefined') {
            const watched = localStorage.getItem('watched');
            if (watched !== null) {
                const result = JSON.parse(watched);
                return result.watched;
            }
            return null;
            }
        return null;
    }

    function getSomaWatchedId(id) {
        if (typeof window !== 'undefined') {
            const watched = localStorage.getItem('watched');
            if (watched !== null) {
                const result = JSON.parse(watched);
                return result.watched[id];
            }
            return null;
            }
        return null;
    }

    function setSomaWatched({ id, title, image, ep }) {
        if (typeof window !== "undefined") {
            let watched = localStorage.getItem("watched");
            let result = watched ? JSON.parse(watched) : { watched: {} };
            if (result.watched[id]) {
                let toSave = result.watched[id];
                if (!toSave.ep.some((anime) => anime.id === ep.id)) {
                    toSave.ep.push(ep);
                    result.watched[id] = toSave;
                    localStorage.setItem("watched", JSON.stringify(result));
                }
            } else {
                let toSave = {
                    id,
                    title,
                    image,
                    ep: [
                        {
                            id: ep.id,
                            number: ep.number,
                        },
                    ],
                };
                result.watched[id] = toSave;
                localStorage.setItem("watched", JSON.stringify(result));
            }
        }
    }

    function delSomaWatched(id) {
        let watched = getSomaWatched();
        delete watched[id];
        localStorage.setItem('watched', JSON.stringify({ watched }));
    }

    // Add an event listener to the "beforeunload" event to save the local storage
    useEffect(() => {
        let timeoutId;
    
        const handleBeforeUnload = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                localStorage.setItem('watched', JSON.stringify(getSomaWatched()));
            }, 200); // Adjust the debounce delay as needed
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);

    return {
        getSomaWatched,
        setSomaWatched,
        getSomaWatchedId,
        delSomaWatched,
    };
}
