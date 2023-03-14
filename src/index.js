import './css/styles.css';
import API from './js/fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

console.log(refs.loadMore);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  const requestValue = refs.input.value;

  API.resetPage();

  API.fetchValue(requestValue)
    .then(value => {
      // console.log(value);
      render(value.hits);
    })
    .catch(error => {
      console.log(error);
    });
}

function onLoadMore(e) {
  const requestValue = refs.input.value;
  API.fetchValue(requestValue)
    .then(value => {
      // console.log(value);
      render(value.hits);
    })
    .catch(error => {
      console.log(error);
    });
}

function render(value) {
  console.log(value);
  if (value === []) {
    Notiflix.Notify.info(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    const markup = value
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
          return `<div class="gallery__card"><a class="gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="card-info"><p class="info-item"><b>Likes<br>${likes}</b></p><p class="info-item"><b>Views<br>${views}</b></p><p class="info-item"><b>Comments<br>${comments}</b></p><p class="info-item"><b>Downloads<br>${downloads}</b></p></div></div>`;
        }
      )
      .join('');

    refs.gallery.innerHTML = markup;

    const litebox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });
  }
}
