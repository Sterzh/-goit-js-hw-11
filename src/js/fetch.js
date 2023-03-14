const BASE_URL = 'https://pixabay.com/api/';
const MY_API_PIXABAY_KEY = '?key=34337026-7de7d7fed724711432526467d';

let page = 1;

function fetchValue(requestValue) {
  return fetch(
    `${BASE_URL}${MY_API_PIXABAY_KEY}&q=${requestValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  ).then(r => {
    return r.json().then(data => {
      incrementPage();
      return data;
    });
  });
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
}

export default { fetchValue, resetPage };
