import "izitoast/dist/css/iziToast.min.css";
import iziToast from "izitoast";

import "simplelightbox/dist/simple-lightbox.min.css";
import SimpleLightbox from "simplelightbox";

import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const form = document.querySelector('#search-form');
const input = form.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'title',
    captionType: 'attr', 
    captionSelector: 'self',
    captionDelay: 250, 
});

function toggleLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const query = input.value.trim();
    gallery.innerHTML = '';

    if (!query) return;

    toggleLoader(true);

    fetchImages(query)
        .then(data => {
            toggleLoader(false);

            if (!data.hits || data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }

            const markup = renderImages(data.hits);
            gallery.insertAdjacentHTML('beforeend', markup);

            lightbox.refresh();
        })
        .catch(error => {
            toggleLoader(false);
            console.error(error);
        });
});
