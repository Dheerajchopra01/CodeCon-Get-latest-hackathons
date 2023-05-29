const cardContainer = document.getElementById('cardContainer');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const searchClearIcon = document.getElementById('searchClearIcon');
const btnSearch = document.getElementById('btnSearch');

const imagesArr = [
  './images/coding event 1.jpeg',
  './images/coding event 2.jpg',
  './images/coding event 3.png',
  './images/coding event 4.webp',
  './images/coding event 5.jpg',
  './images/coding event 6.png',
  './images/coding event 7.webp',
  './images/coding event 8.jpg',
  './images/coding event 9.webp',
  './images/coding event 10.jpg',
  './images/coding event 11.webp',
  './images/coding event 12.webp',
  './images/coding event 13.webp',
];

/**
 * function generates random number
 * @returns Number
 */
const generateRandomNo = () => {
  try {
    return Math.floor(Math.random() * 13);
  } catch (error) {
    console.log(error);
  }
};

/**
 * function is used to generate Cards
 * @param {Array} value
 */
const generateContestCards = (value) => {
  try {
    let ihtml = '';
    value.forEach((item, index) => {
      let startTime = new Date(item['start_time']);
      let endTime = new Date(item['end_time']);

      let createCard = `<div class="card mx-2 my-2 border border-warning" style="width: 18rem;">

                <img src="${
                  imagesArr[generateRandomNo()]
                }" wdith = "260px" height ="170px" class="card-img-top p-2 my-2" alt="...">
                <div class="card-body">
                    <h5 class="card-title"><b>${item['name']}</b></h5>
                    <p class="card-text">Start Time : ${startTime.toDateString()}</p>
                    <p class="card-text">End Time : ${endTime.toDateString()}</p>
                    <p class="card-text">${item['site']}</p>
                    <a href="${
                      item['url']
                    }" class="btn btn-primary justify-content-center d-block">Visit Contest Page</a>
                </div>
            </div>`;
      ihtml += createCard;
    });
    cardContainer.innerHTML = ihtml;
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function executes on submit button click.
 */
searchForm.addEventListener('submit', (event) => {
  try {
    event.preventDefault();

    if (searchInput.value !== '') {
      showSearchResults(searchInput.value.toLowerCase());
    } else {
      console.log('enter some input');
      return;
    }
  } catch (error) {
    console.log(error);
  }
});

searchInput.addEventListener('focus', () => {
  searchClearIcon.classList.remove('hide');
});

searchInput.addEventListener('focusout', () => {
  if (searchInput.value === '') {
    searchClearIcon.classList.add('hide');
    showAllCards();
  }
});

searchClearIcon.addEventListener('click', () => {
  try {
    searchInput.value = '';
    showAllCards();
    searchClearIcon.classList.add('hide');
  } catch (error) {
    console.log(error);
  }
});

/**
 * Function show hackathons based on search input
 * @param {string} searchInputValue
 */
const showSearchResults = (searchInputValue) => {
  try {
    let allCards = document.querySelectorAll('.card');
    allCards.forEach((card) => {
      if (card.textContent.toLowerCase().includes(searchInputValue)) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * This function shows all cards when search input is cleared.
 */
const showAllCards = () => {
  let allCards = document.querySelectorAll('.card');
  allCards.forEach((card) => {
    card.classList.remove('hide');
  });
};

/**
 * This function shows loader till hackathon data is fetched from kontests API.
 */
const showLoader = () => {
  cardContainer.innerHTML = `
                           <div class="loader text-center">
                              <div class="spinner" id="spinner">
                                  <i class="fa fa-spinner fa-5x"></i>
                              </div>
                              <p>Relax. Fetching your hackathons.</p>
                          </div> `;
};

/**
 * This function fetches hackathons data from kontests API
 */
const getData = () => {
  //get data from API
  let url = 'https://kontests.net/api/v1/all';
  let res = fetch(url);

  res
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        return new Error('Error occured');
      }
    })
    .then((value) => {
      generateContestCards(value);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * This is driver function which loads hackathon data.
 */
const loadData = () => {
  showLoader();
  getData();
};

/**
 * Calling driver function loadData()
 */
loadData();
