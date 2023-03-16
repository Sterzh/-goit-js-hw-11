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

  const resetGallery = (refs.gallery.innerHTML = ' ');
  const requestValue = await refs.input.value;
  const resetPage = await API.resetPage();

  try {
    const fetchPictures = await API.fetchPictures(requestValue);

    if (value.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.info(`Hooray! We found ${value.totalHits} images.`);
      render(value);
    }
  } catch (error) {
    console.log(error);
  }
}

// function onSearch(e) {
//   e.preventDefault();

//   refs.gallery.innerHTML = ' ';

//   const requestValue = refs.input.value;

//   API.resetPage();

//   API.fetchPictures(requestValue)
//     .then(value => {
//       console.log();
//       if (value.hits.length === 0) {
//         Notiflix.Notify.info(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       } else {
//         Notiflix.Notify.info(`Hooray! We found ${value.totalHits} images.`);
//         render(value);
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

function onLoadMore(e) {
  const requestValue = refs.input.value;

  API.fetchPictures(requestValue)
    .then(value => {
      render(value);
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1.2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function render(value) {
  if (refs.gallery.children.length < value.totalHits) {
    refs.loadMore.classList.add('opacity');

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

    const litebox = new SimpleLightbox('.gallery a', {
      captionDelay: 250,
      captionsData: 'alt',
    });

    console.dir(refs.gallery.children.length);
    if (refs.gallery.children.length === value.totalHits) {
      refs.loadMore.classList.remove('opacity');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  }
}
