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
const loadBtn = document.querySelector('#load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'title',
  captionType: 'attr',
  captionSelector: 'self',
  captionDelay: 250,
});

let query = '';
let page = 1;
const perPage = 15;

function toggleLoader(show) {
  loader.classList.toggle('hidden', !show);
}

function updateGallery(data) {
  const markup = renderImages(data.hits);
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  toggleLoadMoreButton(data.totalHits);
}

function toggleLoadMoreButton(totalHits) {
  if (page * perPage >= totalHits) {
    loadBtn.classList.add('hidden');
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    loadBtn.classList.remove('hidden');
  }
}

function scrollToNewImages() {
  if (!gallery.firstElementChild) return;

  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  query = input.value.trim();
  page = 1;
  gallery.innerHTML = '';

  if (!query) return;

  toggleLoader(true);

  try {
    const data = await fetchImages(query, page, perPage);
    toggleLoader(false);

    if (!data.hits || data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    updateGallery(data);
  } catch (error) {
    toggleLoader(false);
    console.error('Error fetching images:', error);
  }
});

loadBtn.addEventListener('click', async () => {
  toggleLoader(true);

  try {
    page += 1;
    const data = await fetchImages(query, page, perPage);

    updateGallery(data);
    scrollToNewImages();
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    toggleLoader(false);
  }
});
