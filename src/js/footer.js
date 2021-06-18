const openModalRef = document.querySelector('.footer__link');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxRef = document.querySelector('.lightbox');
const body = document.querySelector('body');
const closeIcon = document.querySelector('[data-modal-close]');

openModalRef.addEventListener('click', onOpenModal);
lightboxOverlayRef.addEventListener('click', onCloseModal);
closeIcon.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  event.preventDefault();
  lightboxRef.classList.add('is-open');
  body.classList.add('content-hidden');

  window.addEventListener('keydown', onCloseModalESC);
}

function onCloseModal() {
  lightboxRef.classList.remove('is-open');

  body.classList.remove('content-hidden');

  window.removeEventListener('keydown', onCloseModalESC);
}

function onCloseModalESC(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
