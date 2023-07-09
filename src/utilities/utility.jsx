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
  