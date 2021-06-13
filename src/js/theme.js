const chekBox = document.querySelector('#theme-switch-toggle');
chekBox.addEventListener('change', changeTheme);
chekBox.addEventListener('change', setLocalStorage);
console.log(chekBox);
const body = document.querySelector('.card__section');

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

function changeTheme() {
  const check = chekBox.checked;
  if (check) {
    body.classList.add(Theme.DARK);
  } else {
    body.classList.replace(Theme.DARK, Theme.LIGHT);
  }
}

function setLocalStorage(e) {
  const check = chekBox.checked;
  if (check) {
    localStorage.setItem('theme', Theme.DARK);
  } else {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

const themeInLocal = localStorage.getItem('theme');

if (themeInLocal === Theme.DARK) {
  body.classList.add(Theme.DARK);
  chekBox.checked = true;
}