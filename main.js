// Gallery Navigation, Lightbox, and Filtering
const gallery = document.querySelector('.gallery');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-content');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxClose = document.querySelector('.lightbox .close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentIndex = 0;
let filteredItems = [...galleryItems];

function showGalleryItems(items) {
  gallery.innerHTML = '';
  items.forEach(item => gallery.appendChild(item));
}

function updateActiveFilter(btn) {
  filterBtns.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    updateActiveFilter(btn);
    if (filter === 'all') {
      filteredItems = [...galleryItems];
    } else {
      filteredItems = galleryItems.filter(item => item.getAttribute('data-category') === filter);
    }
    showGalleryItems(filteredItems);
    currentIndex = 0;
  });
});

function showLightbox(index) {
  const item = filteredItems[index];
  const img = item.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = img.alt;
  lightbox.classList.add('active');
  currentIndex = index;
}

gallery.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;
  const index = filteredItems.indexOf(item);
  if (index !== -1) {
    showLightbox(index);
  }
});

function closeLightbox() {
  lightbox.classList.remove('active');
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') lightboxPrev.click();
  if (e.key === 'ArrowRight') lightboxNext.click();
});

function showLightboxImage(index) {
  if (index < 0) index = filteredItems.length - 1;
  if (index >= filteredItems.length) index = 0;
  showLightbox(index);
}

lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  showLightboxImage(currentIndex - 1);
});
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  showLightboxImage(currentIndex + 1);
});

// Gallery navigation (outside lightbox)
function scrollToGalleryItem(index) {
  if (filteredItems.length === 0) return;
  if (index < 0) index = filteredItems.length - 1;
  if (index >= filteredItems.length) index = 0;
  filteredItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  filteredItems.forEach(item => item.classList.remove('highlight'));
  filteredItems[index].classList.add('highlight');
  setTimeout(() => filteredItems[index].classList.remove('highlight'), 700);
  currentIndex = index;
}
prevBtn.addEventListener('click', () => scrollToGalleryItem(currentIndex - 1));
nextBtn.addEventListener('click', () => scrollToGalleryItem(currentIndex + 1));

// Initial render
showGalleryItems(filteredItems);
