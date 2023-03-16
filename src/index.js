import './css/styles.css';
import API from './js/fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import lazy from 'lazysizes';
import axios from 'axios';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  const resetGallery = await (refs.gallery.innerHTML = ' ');
  const requestValue = await refs.input.value;
  const resetPage = await API.resetPage();

  try {
    const fetchPictures = await API.fetchPictures(requestValue);

    if (fetchPictures.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.info(
        `Hooray! We found ${fetchPictures.totalHits} images.`
      );
      render(fetchPictures);
    }
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

async function onLoadMore(e) {
  const requestValue = await refs.input.value;

  try {
    const fetchPictures = await API.fetchPictures(requestValue);
    render(fetchPictures);

    const { height: cardHeight } = await document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
}

async function render(value) {
  if (refs.gallery.children.length < value.totalHits) {
    refs.loadMore.classList.add('opacity');

    const markup = await value.hits
      .map(
        ({
          tags,
          webformatURL,
          largeImageURL,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `<div class="gallery__card"><a class="gallery__link" href="${largeImageURL}"><img class="gallery__image lazyload" data-src="${webformatURL}" alt="${tags}"/></a><div class="card-info"><p class="info-item"><b>Likes<br>${likes}</b></p><p class="info-item"><b>Views<br>${views}</b></p><p class="info-item"><b>Comments<br>${comments}</b></p><p class="info-item"><b>Downloads<br>${downloads}</b></p></div></div>`;
        }
      )
      .join('');

    renderGallery = await refs.gallery.insertAdjacentHTML('beforeend', markup);

    const litebox = await new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });

    if (refs.gallery.children.length === value.totalHits) {
      refs.loadMore.classList.remove('opacity');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }
}
