const API_KEY = "55488164-a39d12eb388c39119286251f6";
const BASE_URL = "https://pixabay.com/api/" //тіпо по крутому ну да я же крутий програміст профі так так і є 😎😎😎
let page = 1;
const perPage = 12;
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');

if (localStorage.getItem("page")) {
      page = parseInt(localStorage.getItem('page'));
}
function fetchImages() {
    return fetch(`${BASE_URL}?key=${API_KEY}&editors_choice=true&page=${page}&per_page=${perPage}`)
    .then(res => res.json())
    .then(data => data.hits)
}
function createMarkup(images) {
    return images.map(img => `
    <div class="card">
        <img src="${img.webformatURL}" alt="${img.tags}" class="images width="200"">
    </div>
    `).join('');
}
function renderImages(images) {
    const markup = createMarkup(images);
    gallery.insertAdjacentHTML('beforeend', markup);
}
function loadImages() {
    fetchImages().then(images => {
    if (!images.length) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    renderImages(images);
    });
}
loadMoreBtn.addEventListener('click', function() {
    page += 1;
    loadImages();
});
loadImages();