const myLibraryLink = document.querySelector('.link__library');
const homeLink = document.querySelector('.link__home');
const logoLink = document.querySelector('.logo');
const searchForm = document.querySelector('.search');
const libraryButtons = document.querySelector('.library__buttons');
const homePage = document.querySelector('.home__page');
const libraryPage = document.querySelector('.library__page');

myLibraryLink.addEventListener('click', libraryPageOpen);
homeLink.addEventListener('click', homePageOpen);
logoLink.addEventListener('click', homePageOpen);

function libraryPageOpen() {
    homeLink.classList.remove('current-page');
    myLibraryLink.classList.add('current-page');
    searchForm.classList.add('hidden');
    libraryButtons.classList.remove('hidden');
    homePage.classList.add('library__page');
    homePage.classList.remove('home__page');
}

function homePageOpen() {
    homeLink.classList.add('current-page');
    myLibraryLink.classList.remove('current-page');
    searchForm.classList.remove('hidden');
    libraryButtons.classList.add('hidden');
    homePage.classList.remove('library__page');
    homePage.classList.add('home__page');
}