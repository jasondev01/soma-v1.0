import DOMPurify from 'dompurify';

export const removeHtmlTags = (htmlString) => {
    const sanitizedString = DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] });
    return sanitizedString;
};

export const breakpoints = {
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

export const formatDate = (info) => {
    let formattedDate = '';
    if (info.airDate) {
      const date = new Date(info.airDate);
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

export const providers = [
    'gogoanime', 
    'bilibili', 
    'crunchyroll', 
    'zoro', 
    'marin', 
    'animepahe', 
    '9anime', 
    'enime', 
    'animefox'
];