const BASE_URL = 'https://pixabay.com/api/';
const MY_API_PIXABAY_KEY = '?key=34337026-7de7d7fed724711432526467d';

function fetchValue(requestValue) {
  return fetch(
    `${BASE_URL}${MY_API_PIXABAY_KEY}&q=${requestValue}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(r => {
    return r.json().then(data => {
      return data.hits;
    });
  });
}

export default { fetchValue };

// resetPage() {
//   page = 1
// }
