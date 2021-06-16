const refs = {
  checkbox: document.querySelector('#theme-switch-toggle'),
  body: document.querySelector('body'),
};
const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

currentCheckTheme();
checkboxPosition();

refs.checkbox.addEventListener('change', onBlackWhite);

function onBlackWhite(e) {
  if (e.target.checked) {
    localStorage.setItem('theme', Theme.DARK);
    refs.body.classList.add(Theme.DARK);
    refs.body.classList.remove(Theme.LIGHT);
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
    refs.body.classList.remove(Theme.DARK);
    refs.body.classList.add(Theme.LIGHT);
  }
};

function checkboxPosition() {
  const checkTheme = localStorage.getItem('theme');
  
  if (checkTheme === Theme.DARK) {
    refs.checkbox.checked = true;
  }
};

function currentCheckTheme() {
  const checkTheme = localStorage.getItem('theme');

  if (!checkTheme) {
    localStorage.setItem('theme', Theme.LIGHT);
    refs.body.classList.add(Theme.LIGHT);
  } else {
    refs.body.classList.add(checkTheme);
  }
};


// const chekBox = document.querySelector('#theme-switch-toggle');
// chekBox.addEventListener('change', changeTheme);
// chekBox.addEventListener('change', setLocalStorage);
// const body = document.querySelector('body');

// const Theme = {
//   LIGHT: 'light-theme',
//   DARK: 'dark-theme',
// };

// function changeTheme() {
//   const check = chekBox.checked;
//   if (check) {
//     body.classList.add(Theme.DARK);
//   } else {
//     body.classList.replace(Theme.DARK, Theme.LIGHT);
//   }
// }

// function setLocalStorage(e) {
//   const check = chekBox.checked;
//   if (check) {
//     localStorage.setItem('theme', Theme.DARK);
//   } else {
//     localStorage.removeItem('theme');
//     localStorage.setItem('theme', Theme.LIGHT);
//   }
// }

// const themeInLocal = localStorage.getItem('theme');

// if (themeInLocal === Theme.DARK) {
//   body.classList.add(Theme.DARK);
//   chekBox.checked = true;
// }
// if (themeInLocal === Theme.LIGHT) {
//   body.classList.add(Theme.LIGHT);
//   chekBox.checked = true;
// }

