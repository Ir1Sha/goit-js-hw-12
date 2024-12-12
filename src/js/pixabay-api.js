import axios from 'axios';

const API_KEY = '47416183-73bb296483032a9a16a802376';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page = 1, perPage = 15) {
    return axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: perPage,
        },
    })
    .then(response => response.data)
    .catch(error => {
        console.error('Error fetching images:', error);
        throw new Error('Failed to fetch images.');
    });
}