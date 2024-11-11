export function createImageCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="image-info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </a>
    </li>
  `;
}

export function renderGallery(images, container, append = false) {
  const markup = images.map(createImageCard).join('');
  if (append) {
    container.insertAdjacentHTML('beforeend', markup);
  } else {
    container.innerHTML = markup;
  }
}

export function toggleLoadMoreButton(show, totalHits, currentImages) {
  const loadMoreBtn = document.querySelector('.load-more');
  if (!loadMoreBtn) return;

  if (show && currentImages < totalHits) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

export function showLoader(show) {
  const loader = document.querySelector('.loader');
  loader.style.display = show ? 'block' : 'none';
}

export function showEndMessage(show) {
  const message = document.querySelector('.end-message');
  if (message) {
    message.style.display = show ? 'block' : 'none';
  }
}
