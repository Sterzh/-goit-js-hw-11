const BASE_URL = 'https://pixabay.com/api/';
const MY_API_PIXABAY_KEY = '?key=34337026-7de7d7fed724711432526467d';
const options = {};

// function fetch() {
//   return fetch(
//     //   `${BASE_URL}${MY_API_PIXABAY_KEY}&fields=name, name.official,capital,population,flags,languages`
//     `https://pixabay.com/api/?key=34337026-7de7d7fed724711432526467d&q=yellow+flowers&image_type=photo`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

function fetch() {
  return fetch(
    //   `${BASE_URL}${MY_API_PIXABAY_KEY}&fields=name, name.official,capital,population,flags,languages`
    `https://pixabay.com/api/?key=34337026-7de7d7fed724711432526467d&q=yellow+flowers&image_type=photo`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export default { fetch };
