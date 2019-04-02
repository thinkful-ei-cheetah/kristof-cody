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
      getParkInfo(STORE.searchValue);
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

function handleQuery


function getParkInfo(query, maxValue){


  const URL = `https://developer.nps.gov/api/v1/parks?limit=${maxValue}&q=${query}&fields=addresses&api_key=ehbmagD9RS6YJFYM6Wdo4jmpdJMdXKCVnHcA17qj" -H "accept: application/json"`;

}

