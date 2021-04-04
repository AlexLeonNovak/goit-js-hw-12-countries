import './styles.css';
import debounce from 'lodash.debounce';
import toastr from 'toastr';
import 'toastr/toastr.scss';

import CountriesServiceAPI from './components/countries-service';
import listTpl from './templates/list.hbs';
import cardTpl from './templates/card.hbs';

console.log(listTpl);
const countriesServiceAPI = new CountriesServiceAPI();
const refs = {
  searchInput: document.querySelector('[data-search-input]'),
  result: document.querySelector('[data-search-result]'),
}

refs.searchInput.addEventListener('input', debounce(processSearch, 500));
refs.result.addEventListener('click', onListItemClick);


function processSearch(e)
{
  countriesServiceAPI.searchQuery = e.target.value;
  fetchCountries();
}

function onListItemClick(e) {
  if (!e.target.classList.contains('country-list__link')) {
    return;
  }
  e.preventDefault();
  countriesServiceAPI.searchQuery = refs.searchInput.value = e.target.textContent;
  fetchCountries();
}


function fetchCountries() {
  countriesServiceAPI.fetchCountries()
    .then(data => {
      if (data.length > 10) {
        toastr.warning('Too many matches found. Please enter a more specific query.');
      } else if (data.length > 1) {
        console.log(data);
        refs.result.innerHTML = listTpl(data);
      } else {
        console.log(data[0]);
        refs.result.innerHTML = cardTpl(data[0]);
      }
    })
    .catch(error => {
      toastr.error(error);
      clearSearchResults();
    })
}

function clearSearchResults() {
  refs.result.textContent = '';
}
