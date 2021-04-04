const BASE_URL = 'https://restcountries.eu/rest/v2';

export default class CountriesServiceAPI {

  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    if (!this.searchQuery.trim().length) {
      return Promise.reject('Query string cannot be empty');
    }

    return fetch(`${BASE_URL}/name/${this.searchQuery}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.status + ': ' + response.statusText);
        }
        return response.json()
      });
  }
}
