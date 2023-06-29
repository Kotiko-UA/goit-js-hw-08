// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = { galleryEl: document.querySelector('.gallery') };

refs.galleryEl.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

function createMarkup(imgs) {
  return imgs
    .map(({ preview, original, description } = {}) => {
      return `  <li class="gallery__item">
        <a href="${original}" class="gallery__link">
          <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    </li>`;
    })
    .join('');
}

const option = {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
};

let gallery = new SimpleLightbox(
  '.gallery .gallery__item .gallery__link',
  option
);

refs.galleryEl.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();

  if (e.target.classList.contains('gallery__image')) {
    gallery.on('show.simplelightbox');
  }
}
