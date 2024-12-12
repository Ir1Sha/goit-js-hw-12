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
    if (show) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

form.addEventListener('submit', event => {
  event.preventDefault();

  query = input.value.trim();
  page = 1;
  gallery.innerHTML = '';
  
  if (!query) return;

  toggleLoader(true);

  fetchImages(query, page, perPage)
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

          if (data.totalHits > page * perPage) {
              loadBtn.classList.remove('hidden');
          } else {
              loadBtn.classList.add('hidden');
          }
      })
      .catch(error => {
          toggleLoader(false);
          console.error(error);
      });
});

loadBtn.addEventListener('click', async () => {
  toggleLoader(true);
  try {
    page += 1;
    const data = await fetchImages(query, page, perPage);

    const html = renderImages(data.hits);
    gallery.insertAdjacentHTML('beforeend', html);

    lightbox.refresh();
    console.log("Lightbox refreshed after loading more images.");

    scrollToNewImages();

    if (page * perPage >= data.totalHits) {
      loadBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  } finally {
    toggleLoader(false);
  }
});


function scrollToNewImages() {
  const gallery = document.querySelector(".gallery");
  if (!gallery || !gallery.firstElementChild) {
    console.warn("No elements in gallery to scroll to.");
    return;
  }

  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  console.log("Scrolling by height:", cardHeight * 2);

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}


