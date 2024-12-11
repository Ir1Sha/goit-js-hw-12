export function fetchImages(query) {
  const API_KEY = '47416183-73bb296483032a9a16a802376';
  const BASE_URL = 'https://pixabay.com/api/';

  return fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
      .then(response => {
          if (!response.ok) {
              throw new Error("Sorry, there are no images matching your search query. Please try again!");
          }
          return response.json();
      });
}
