import './css/styles.css';
import API from './js/fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import lazy from 'lazysizes';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  refs.gallery.innerHTML = ' ';

  const requestValue = refs.input.value;

  API.resetPage();

  API.fetchValue(requestValue)
    .then(value => {
      Notiflix.Notify.info(`Hooray! We found ${value.totalHits} images.`);
      render(value);
    })
    .catch(error => {
      console.log(error);
    });
}

function onLoadMore(e) {
  const requestValue = refs.input.value;

  API.fetchValue(requestValue)
    .then(value => {
      render(value);
    })
    .catch(error => {
      console.log(error);
    });
}

function render(value) {
  if (value === []) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (
    refs.gallery.children.length >=
    value.totalHits - API.quantityObjects
  ) {
    refs.loadMore.classList.remove('opacity');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    refs.loadMore.classList.add('opacity');

    console.log(value);

    const markup = value.hits
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

    refs.gallery.insertAdjacentHTML('beforeend', markup);

    console.log(refs.gallery.children.length);

    const litebox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });
  }
}
