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

export const createBlobURL = (blobData) => {
    return URL.createObjectURL(blobData);
};
  
export const revokeBlobURL = (blobURL) => {
    URL.revokeObjectURL(blobURL);
};