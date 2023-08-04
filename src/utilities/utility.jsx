import DOMPurify from 'dompurify';

export const removeHtmlTags = (htmlString) => {
    const sanitizedString = DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] });
    return sanitizedString;
};

export const breakpoints = {
    1440: {
        slidesPerView: 5,
        spaceBetween: 25,
    },
    1200: {
        slidesPerView: 4,
        spaceBetween: 25,
    },
    600: {
        slidesPerView: 3,
        spaceBetween: 25,
    },
    0: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
}

export const lastWatchedBreakPoints = {
    1025: {
        slidesPerView: 5,
        spaceBetween: 25,
    },
    769: {
        slidesPerView: 4,
        spaceBetween: 25,
    },
    601: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    0: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
}

export const formatDate = (info) => {
    let formattedDate = '';
    if (info.airedAt) {
        const date = new Date(info.airedAt);
        formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
    }
    if (info.next) {
        const date = new Date(info.next);
        formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
    }
    return formattedDate;
}

// get the next and previous episodes
export const getNextEpisodeID = (currentEpisode, episodeRange) => {
    const nextEpisode = episodeRange.find((episode) => episode.number === currentEpisode + 1);
    if (nextEpisode) {
        return nextEpisode.number;
    }
    return null; // No next episode
};

export const getPreviousEpisodeID = (currentEpisode, episodeRange) => {
    const previousEpisode = episodeRange.find((episode) => episode.number === currentEpisode - 1);
    if (previousEpisode) {
      return previousEpisode.number;
    }
    return null; // No previous episode
};

// ongoing page utility
const getSeason = (month) => {
    if (month >= 2 && month <= 4) {
        return "SPRING";
    } else if (month >= 5 && month <= 7) {
        return "SUMMER";
    } else if (month >= 8 && month <= 10) {
        return "FALL";
    } else {
        return "WINTER";
    }
};

export const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth();
    return getSeason(currentMonth);
};



export const convertTime = (nextEpisodeSchedule) => {
    const currentTimestamp = new Date().getTime();
    const nextEpisodeTimestamp = new Date(nextEpisodeSchedule).getTime();
    const timeInSeconds = Math.floor((nextEpisodeTimestamp - currentTimestamp) / 1000);
  
    const days = Math.floor(timeInSeconds / (24 * 60 * 60));
    const hours = Math.floor((timeInSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
    const seconds = timeInSeconds % 60;
  
    let result = [];
    let unitsDisplayed = 0;
  
    if (days > 0 && unitsDisplayed < 2) {
        result.push(`${days} day${days > 1 ? 's' : ''}`);
        unitsDisplayed++;
    }
    if (hours > 0 && unitsDisplayed < 2) {
        result.push(`${hours} hour${hours > 1 ? 's' : ''}`);
        unitsDisplayed++;
    }
    if (minutes > 0 && unitsDisplayed < 2) {
        result.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
        unitsDisplayed++;
    }
    if (seconds > 0 && unitsDisplayed < 2) {
        result.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
        unitsDisplayed++;
    }
  
    return result.join(", ");
};

export const removeDuplicates = (items) => {
    const unique = items.filter(
        (item, index, self) => index === self.findIndex((i) => i.id === item.id)
    );
    return unique;
};