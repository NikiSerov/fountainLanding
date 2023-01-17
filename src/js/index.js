const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 4,
  spaceBetween: 32,
  grabCursor: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiper2 = new Swiper(".swiper2", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1.5,
  spaceBetween: 32,
  grabCursor: true,

  navigation: {
    nextEl: ".swiper2-button-next",
    prevEl: ".swiper2-button-prev",
  },
});

const sortParams = {
  priceDesc: 'Price &#8595;',
  priceAsc: 'Price &#8593;',
  nameDesc: 'Name (Z &#8594; A)',
  nameAsc: 'Name (A &#8594; Z)',
}
const searchForm = document.querySelector(".search-form");
const searchBtn = document.querySelector(".search-button");
const loginBtn = document.querySelector(".login-button");
const registerBtn = document.querySelector(".register-button");
const searchFormCloseBtn = document.querySelector(".search-form__close-btn");
const sortingMenu = document.querySelector(".sorting-selection");
const sortByBtn = document.querySelector(".sort-container__btn");
const sortingTypeButtons = document.querySelectorAll(".sorting-selection__button");
let cardsArray = null;

function numberFormat(number) {
  if (number < 1000) {
    return number;
  }

  return `${number / 1000}k`;
};

function getCardHTML(card) {
  return `
  <a href="#" class="course-card">
    <div class="course-card__image-container">
      <img class="course-card__image" src="${card.image}">
    </div>
    <div class="course-card-content">
      <div class="course-card-content-main">
        <p class="course-card-content-main__title">${card.title}</p>
        <div class="score">
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.9623 5.20694L10.4992 4.55831L8.50411 0.513581C8.44962 0.402839 8.35997 0.31319 8.24923 0.258698C7.9715 0.121589 7.634 0.235846 7.49513 0.513581L5.50001 4.55831L1.03693 5.20694C0.913879 5.22452 0.801379 5.28253 0.715246 5.37042C0.611116 5.47744 0.553736 5.62143 0.555714 5.77074C0.557691 5.92006 0.618865 6.06247 0.725793 6.16671L3.95489 9.31495L3.192 13.7605C3.17411 13.8639 3.18556 13.9702 3.22504 14.0675C3.26452 14.1647 3.33045 14.2489 3.41537 14.3106C3.50028 14.3723 3.60078 14.4089 3.70546 14.4164C3.81014 14.4239 3.91482 14.4018 4.00763 14.3528L7.99962 12.254L11.9916 14.3528C12.1006 14.4108 12.2272 14.4302 12.3484 14.4091C12.6543 14.3564 12.86 14.0663 12.8072 13.7605L12.0443 9.31495L15.2734 6.16671C15.3613 6.08057 15.4193 5.96807 15.4369 5.84503C15.4844 5.53741 15.2699 5.25264 14.9623 5.20694ZM10.6856 8.87198L11.3201 12.5687L7.99962 10.8249L4.67911 12.5704L5.31368 8.87374L2.62775 6.2546L6.34025 5.71495L7.99962 2.35225L9.659 5.71495L13.3715 6.2546L10.6856 8.87198Z" fill="#F77E23"/>
          </svg>
          <span class="score__number">${card.score}</span>
        </div>
      </div>
      <div class="course-card-content-stats-wrapper">
        <div class="card-content-stats">
          <span class="card-content-stats__duration">${card.duration} weeks</span>
          <div class="card-content-stats__students-count-wrapper">
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.99967 0C4.11562 0 3.26777 0.351189 2.64265 0.976311C2.01753 1.60143 1.66634 2.44928 1.66634 3.33333C1.66634 4.21739 2.01753 5.06523 2.64265 5.69036C3.26777 6.31548 4.11562 6.66667 4.99967 6.66667C5.88373 6.66667 6.73158 6.31548 7.3567 5.69036C7.98182 5.06523 8.33301 4.21739 8.33301 3.33333C8.33301 2.44928 7.98182 1.60143 7.3567 0.976311C6.73158 0.351189 5.88373 0 4.99967 0ZM2.99967 3.33333C2.99967 2.8029 3.21039 2.29419 3.58546 1.91912C3.96053 1.54405 4.46924 1.33333 4.99967 1.33333C5.53011 1.33333 6.03882 1.54405 6.41389 1.91912C6.78896 2.29419 6.99967 2.8029 6.99967 3.33333C6.99967 3.86377 6.78896 4.37247 6.41389 4.74755C6.03882 5.12262 5.53011 5.33333 4.99967 5.33333C4.46924 5.33333 3.96053 5.12262 3.58546 4.74755C3.21039 4.37247 2.99967 3.86377 2.99967 3.33333ZM10.2717 3.47867C10.0842 3.38314 9.87676 3.33333 9.66634 3.33333V2C10.0874 2.00003 10.5024 2.09974 10.8775 2.29098C11.2525 2.48222 11.577 2.75955 11.8243 3.10028C12.0716 3.44101 12.2347 3.83545 12.3003 4.25133C12.3659 4.6672 12.332 5.0927 12.2016 5.49299C12.0711 5.89328 11.8477 6.25699 11.5497 6.55437C11.2517 6.85174 10.8875 7.07432 10.4869 7.2039C10.0863 7.33347 9.66073 7.36636 9.245 7.29987C8.82927 7.23337 8.43519 7.06939 8.09501 6.82133L8.88034 5.744C9.02902 5.85221 9.19848 5.92849 9.37806 5.96806C9.55765 6.00762 9.74347 6.00961 9.92386 5.9739C10.1043 5.93819 10.2753 5.86555 10.4263 5.76055C10.5772 5.65555 10.7048 5.52046 10.8011 5.36376C10.8973 5.20707 10.9601 5.03216 10.9855 4.85003C11.0109 4.6679 10.9983 4.48248 10.9486 4.30544C10.8989 4.1284 10.8131 3.96356 10.6966 3.82128C10.5801 3.67899 10.4354 3.56235 10.2717 3.47867ZM12.3317 12C12.3315 11.2932 12.0506 10.6153 11.5508 10.1155C11.051 9.61571 10.3732 9.33484 9.66634 9.33467V8C10.7272 8.00018 11.7445 8.42166 12.4946 9.17177C13.2447 9.92188 13.6662 10.9392 13.6663 12H12.3317ZM9.66634 12H8.33301C8.33301 11.1159 7.98182 10.2681 7.3567 9.64298C6.73158 9.01786 5.88373 8.66667 4.99967 8.66667C4.11562 8.66667 3.26777 9.01786 2.64265 9.64298C2.01753 10.2681 1.66634 11.1159 1.66634 12H0.333008C0.333008 10.7623 0.824673 9.57534 1.69984 8.70017C2.57501 7.825 3.762 7.33333 4.99967 7.33333C6.23735 7.33333 7.42434 7.825 8.29951 8.70017C9.17467 9.57534 9.66634 10.7623 9.66634 12Z" fill="#F77E23"/>
            </svg>
            <span class="card-content-stats__students-count">${numberFormat(card.studentsCount)} students</span>
          </div>
        </div>
        <span class="card-content-stats__price">${card.price}$</span>
      </div>
    </div>
  </a>
  `
};

function renderCardsHTML(cardsArray) {
  const renderedCardsHTML = cardsArray.reduce(function(accumulator, currentValue) {
    return accumulator + getCardHTML(currentValue);
  }, '');
  return document.querySelector('.courses-container').innerHTML = renderedCardsHTML;
}

fetch('../cards.json')
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    cardsArray = json;
    renderCardsHTML(cardsArray);
  });
  

function toggleSearchForm(e) {
  e.preventDefault();

  searchForm.classList.toggle("visible");
  searchForm.classList.toggle("animate");
  searchBtn.classList.toggle("hidden");
  loginBtn.classList.toggle("hidden");
  registerBtn.classList.toggle("hidden");
};

function loginBtnsAnimation() {
  registerBtn.classList.add("animate");
  loginBtn.classList.add("animate");
  searchBtn.classList.add("animate");
  registerBtn.classList.add("flip");
};

function toggleSortingMenu() {
  if (sortingMenu.classList.contains("opened")) {
    sortingMenu.style.height = '';
    sortingMenu.classList.remove("opened");
  } else {
    sortingMenu.classList.add("opened");
    const sortingTypeButtonsHeight = Array.from(sortingTypeButtons).reduce((accumulator, currentValue) => accumulator + currentValue.offsetHeight, 0);
    sortingMenu.style.height = `${sortingTypeButtonsHeight}px`;
  }
};

const setSortBtnText = (sortName) => {
  sortByBtn.querySelector(".sort-container__selected-sort").innerHTML = sortName;
}

const selectSortingType = (e) => {
  const element = e.target;
  if (!element.classList.contains("selected")) {
    e.currentTarget.querySelector(".selected")?.classList.remove("selected");
    element.classList.add("selected");
    setSortBtnText(sortParams[element.dataset.sort]);
    toggleSortingMenu();
    getSortedCoursesCardsHTML(cardsArray, element.dataset.sort);
  }
};

const getSortedCoursesCardsHTML = (cardsArray, sortParam) => {
  switch(sortParam) {
    case 'priceAsc': 
      setLocation({sort: 'priceAsc'});
      return renderCardsHTML(cardsArray.sort((a, b) => a.price - b.price));
    case 'priceDesc':
      setLocation({sort: 'priceDesc'});
      return renderCardsHTML(cardsArray.sort((a, b) => b.price - a.price));
    case 'nameAsc':
      setLocation({sort: 'nameAsc'});
      return renderCardsHTML(cardsArray.sort((a, b) => a.title.localeCompare(b.title)));
    case 'nameDesc':
      setLocation({sort: 'nameDesc'});
      return renderCardsHTML(cardsArray.sort((a, b) => b.title.localeCompare(a.title)));
  }  
};

const setLocation = (paramObj) => {
  let queryString = '?';
  for (let key in paramObj) {
    queryString += `${key}=${paramObj[key]}&`;
  };
  const {protocol, host, pathname} = window.location;
  const newurl = `${protocol}//${host}${pathname}${queryString.slice(0, -1)}`;
    window.history.pushState({path:newurl},'',newurl);
};

const parseUrl = () => {
  const url = new URL(window.location.href);
  const sortParam = url.searchParams.get('sort');
  if (sortParam) {
    const element = document.querySelector(`[data-sort=${sortParam}]`)
    element.classList.add("selected");
    getSortedCoursesCardsHTML(cardsArray, sortParam);
    setSortBtnText(sortParams[sortParam]);
  }
};

parseUrl();

searchBtn.addEventListener("click", toggleSearchForm);
searchFormCloseBtn.addEventListener("click", toggleSearchForm);
searchFormCloseBtn.addEventListener("click", loginBtnsAnimation);
sortByBtn.addEventListener("click", toggleSortingMenu);
sortingMenu.addEventListener("click", selectSortingType);