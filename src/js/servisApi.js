function fetchCountries(country) {
    const url = `https://restcountries.eu/rest/v2/name/${country}`;
    return fetch(url)
    .then(response => response.json())
    .then( countries  => {console.log(countries.length)
           
      return countries
    }).catch(error => console.log(error))
  
  }

  export default {fetchCountries};