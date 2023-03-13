import './css/styles.css';
import API from './js/fetch';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  gallery: document.querySelector('.gallery'),
};

console.log(refs.gallery);

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const requestValue = refs.input.value;

  API.fetchValue(requestValue)
    .then(value => {
      // console.log(value);
      render(value);
    })
    .catch(error => {
      console.log(error);
      //   onFetchError(error);
    });
}

function render(value) {
  console.log(value);

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
        return `<div class="gallery__card"><a class="gallery__link" href="${largeImageURL}"><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a><div class="card-info"><p class="info-item"><b>Likes ${likes}</b></p><p class="info-item"><b>Views ${views}</b></p><p class="info-item"><b>Comments ${comments}</b></p><p class="info-item"><b>Downloads ${downloads}</b></p></div></div>`;
      }
    )
    .join('');

  refs.gallery.innerHTML = markup;

  const litebox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: 'alt',
  });
}

// function onFetchError(error) {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// }
