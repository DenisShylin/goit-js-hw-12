import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './js/pixabay-api.js';
import {
  renderGallery,
  toggleLoadMoreButton,
  showLoader,
  showEndMessage,
} from './js/render-functions.js';

let currentPage = 1;
let currentQuery = '';
let lightbox = null;
let totalHits = 0;
let currentImages = 0;

document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.querySelector('.search-form');
  const gallery = document.querySelector('.gallery');

  // Add load more button and end message to HTML
  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <button type="button" class="load-more" style="display: none;">Load more</button>
    <p class="end-message" style="display: none; text-align: center;">
      We're sorry, but you've reached the end of search results.
    </p>
    `
  );

  const loadMoreBtn = document.querySelector('.load-more');

  // Initialize SimpleLightbox
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  searchForm.addEventListener('submit', async e => {
    e.preventDefault();
    const searchQuery = e.target.elements.searchQuery.value.trim();

    if (!searchQuery) return;

    currentQuery = searchQuery;
    currentPage = 1;
    currentImages = 0;

    try {
      showLoader(true);
      toggleLoadMoreButton(false);
      showEndMessage(false);

      const data = await searchImages(searchQuery, currentPage);
      totalHits = data.totalHits;
      currentImages = data.hits.length;

      if (data.hits.length === 0) {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      renderGallery(data.hits, gallery);
      lightbox.refresh();

      toggleLoadMoreButton(true, totalHits, currentImages);

      if (currentImages >= totalHits) {
        showEndMessage(true);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      alert('An error occurred while fetching images. Please try again.');
    } finally {
      showLoader(false);
    }
  });

  loadMoreBtn.addEventListener('click', async () => {
    currentPage += 1;

    try {
      showLoader(true);
      toggleLoadMoreButton(false);

      const data = await searchImages(currentQuery, currentPage);
      currentImages += data.hits.length;

      renderGallery(data.hits, gallery, true);
      lightbox.refresh();

      // Smooth scrolling
      const { height: cardHeight } =
        gallery.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      toggleLoadMoreButton(true, totalHits, currentImages);

      if (currentImages >= totalHits) {
        showEndMessage(true);
      }
    } catch (error) {
      console.error('Error fetching more images:', error);
      alert('An error occurred while fetching more images. Please try again.');
    } finally {
      showLoader(false);
    }
  });
});
