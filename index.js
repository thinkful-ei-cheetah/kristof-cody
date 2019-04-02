'use strict';

/*global $*/
$(handleSearchClick());

const STORE = (function(){
  const results= [];
  let searchValue = '';
  let maxResults = 10;
  const apiKey = 'ehbmagD9RS6YJFYM6Wdo4jmpdJMdXKCVnHcA17qj';

  return {
    results,
    searchValue,
    maxResults,
    apiKey,
  };
}() );

function handleSearchClick(){
  $('form').on('submit', e =>{
    e.preventDefault();
    try{
      const searchEntry = $('#search-field').val().trim();
      const maxResults = $('#max-results').val();
      validateEntry(searchEntry);
      STORE.searchValue = searchEntry;
      STORE.maxResults = maxResults;
      getParkInfo(STORE.searchValue, STORE.maxResults);
    } catch (e){
      console.log(e);
      renderError(e.message);
    }
  });
}

function renderError(error = 'No User Found'){
  $('section').html(error);
}

function validateEntry(entry){
  if (entry === '' || entry=== null) throw new Error('Please enter a valid state. For eg. Use Texas, instead of Tx.');
}

//function handleQuery

function handleQueryParams(paramsObj){
  const keys = Object.keys(paramsObj);
  const queryItems = keys.map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`);
  console.log(queryItems);
  return queryItems.join('&');

}

function handleErrors(res){
  if (!res.ok) throw new Error('Problem Getting Data');
  return res.Json();
}

function getParkInfo(stateCodes, maxValue){
  console.log(maxValue);
  const params = {
    stateCode: stateCodes,
    limit: maxValue,
  };

  const queryString = handleQueryParams(params);
  const searchURL = 'https://developer.nps.gov/api/v1/parks';
  const URL = searchURL + '?' + queryString;
  console.log(URL);
 
  fetch(URL, {
    headers: {
      'Cache-Control': 'no-cache',
      'X-Api-Key': 'ehbmagD9RS6YJFYM6Wdo4jmpdJMdXKCVnHcA17qj',
      'Access-Control-Allow-Origin': '*',
    }
  });
}

