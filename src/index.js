import './css/styles.css';
import API from './js/fetch';
import Notiflix from 'notiflix';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
};

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const event = refs.input.value;

  API.fetch(e)
    .then(countries => {
      // renderCountries(countries);
    })
    .catch(error => {
      //   onFetchError(error);
    });
}

// function renderCountries(countries) {
//   if (countries.length <= 10 && countries.length > 1) {
//     const markup = countries
//       .map(({ name, flags }) => {
//         return `<li><img class="img-flags" src="${flags.svg}" alt="${name}" height="50"><h2>${name}</h2></li>`;
//       })
//       .join('');
//     countriesList.innerHTML = markup;
//     countriesInfo.innerHTML = ' ';
//   } else if (countries.length === 1) {
//     const markup = countries
//       .map(({ name, flags }) => {
//         return `<li><img class="img-flags" src="${flags.svg}" alt="${name}" height="50"><h2 class="bigNameCard">${name}</h2></li>`;
//       })
//       .join('');
//     const markupInfo = countries
//       .map(({ capital, population, languages }) => {
//         return `<p><span class="country-category">Capital: </span>${capital}</p><p><span class="country-category">Population: </span>${population}</p><p><span class="country-category">Languages: </span>${languages
//           .map(e => {
//             return e.name;
//           })
//           .join(', ')}</p>`;
//       })
//       .join('');
//     countriesList.innerHTML = markup;
//     countriesInfo.innerHTML = markupInfo;
//   } else if (countries.length > 10) {
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     countriesList.innerHTML = ' ';
//     countriesInfo.innerHTML = ' ';
//   }
// }

// function onFetchError(error) {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
// }
