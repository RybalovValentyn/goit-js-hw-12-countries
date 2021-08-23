import './sass/main.scss';
const debounce = require('lodash.debounce');
import countryNameHbs from './templates/coutryname.hbs';
import countrycard from './templates/countryscard.hbs';
import API from './js/servisApi'

import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';
// PNotify.defaultModules.set(PNotifyMobile, {});

// PNotify.prototype.options.styling = "bootstrap4";


const inputSearch = document.querySelector('.js-input');
const countriesContainer = document.querySelector('.previous-countries');
const exampleArtikle = document.querySelector('.example');
const searchForm = document.querySelector('.js-search-form');
const countriesCards = document.querySelector('.countries');


// let countries = [];

inputSearch.addEventListener('input', debounce((onSearch),500));

function onSearch(e) {
  e.preventDefault();
  let country = ' '; 
  ClearCountriesName();
  country = inputSearch.value;
if (country != ' ') {
  API.fetchCountries(country)
  .then( countries =>{
    renderCoutriesName(countries)})
    .catch(onFetchError)
    } 
} 
function renderCoutriesName(countries) {
    if(countries.length > 0  && countries.length < 10){
      if (countries.length > 1) {    
    countriesContainer.insertAdjacentHTML('beforeend', countryNameHbs(countries));
    onInputError()
  } else
    renderCoutriesCard(countries);
  return
} 

onFetchError();
}
function ClearCountriesName() {
  countriesContainer.innerHTML = '';
  countriesCards.innerHTML = '';
};
function renderCoutriesCard(countries) {
  countriesCards.insertAdjacentHTML('beforeend', countrycard(countries));
};

function onFetchError(r) {
  ClearCountriesName();
  
error({
  title: false,
  text: 'enter a more specific query!',
  type: 'notice',
  icons: 'material',
  maxTextHeight: null,
  delay: '2000',
  closer: false,
  sticker: false,
  textTrusted: true,
});

}


function onInputError() {
  error({
    title: false,
    text: 'Too many matches found. Please <br>enter a more specific query!',
    type: 'error',
    icons: 'material',
    maxTextHeight: null,
    delay: '2000',
    closer: false,
    sticker: false,
    textTrusted: true,
  });
}


