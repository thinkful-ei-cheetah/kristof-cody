'use strict';

/*global $, STORE*/
$(handleSearchClick());

function handleSearchClick(){
  $('form').on('submit', e =>{
    e.preventDefault();
    try{
      const searchEntry = $('#search-field').val().trim();
      const maxResults = $('#max-results').val();
      STORE.searchValue = validateEntry(searchEntry);
      STORE.maxResults = maxResults;
      getParkInfo(STORE.searchValue, STORE.maxResults);
      $('section').html('Please Wait a moment...');
      
    } catch (e){
      renderError(e.message);
    }

  });
}

function renderError(error = 'No User Found'){
  $('section').html(error);
}

function validateEntry(entry){
  if (entry === '' || entry=== null) throw new Error('Please enter a valid state or states. For eg: Texas, Florida or Tx, Fl.');

  let stateObject = STORE.states;
  let searchTerms = entry.toUpperCase()
    .split(/, |,/g )
    .map(entry=> {
      if(entry.length !== 2){
        let checkWords = entry.split(' ').map(word => word[0] + word.slice(1).toLowerCase());
        let newEntry = checkWords.join(' ');
        for(let key in stateObject ){
          if(stateObject[key] === newEntry) return key;
        }
        throw new Error(`'Please enter a valid state or states. For eg: Texas, Florida or Tx, Fl. ${entry} could not be found.`);
      } else if(Object.keys(stateObject).includes(entry)){
        return entry;
      }else{
        throw new Error(`'Please enter a valid state or states. For eg: Texas, Florida or Tx, Fl. ${entry} could not be found.`);
      }
    });
  console.log(searchTerms);
  return (searchTerms);
}

function generateHtml(parkObj){
  return `<article role="listitem"  id=${parkObj.id} class="search-result">
  <div class="info-section">
    <div class="image-name-container">
      <div class="img-box">
        <img src=${parkObj.image.src} alt=${parkObj.image.alt} caption=${parkObj.image.caption}>
      </div>
      <div class="park-name-and-adr">
        <h2 class="park-name">${parkObj.name}</h2>
        <div class="park-address">
          <span class= "address-text address-line-1">${parkObj.address.line1}</span>
          <br>
          <span class= "address-text address-line-2">${parkObj.address.line2}</span>
          <br>
          <span class= "address-text address-line-3">${parkObj.address.city} ${parkObj.address.state} ${parkObj.address.zip}</span>
        </div>
      </div>
    </div>
    <h4 class="park-descripion">${parkObj.description}</h4>
  </div>
  <div class="website-link">
    <a href="${parkObj.weblink}" class="visit-page"><span >Visit Now ></span></a>
  </div>
</article>`;
}

function fullHtmlString(){

  let articles = STORE.results.map(item => generateHtml(item));
  return articles.join('');
}

function handleQueryParams(paramsObj){
  const keys = Object.keys(paramsObj);
  const queryItems = keys.map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(paramsObj[key])}`);
  return queryItems.join('&');

}

function handleErrors(res){
  if (!res.ok) throw new Error('Problem Getting Data');
  return res.json();
}

function getParkInfo(stateCodes, maxValue, addFields = 'addresses,images,id'){
  const params = {
    stateCode: stateCodes,
    limit: maxValue,
    fields: addFields,
  };

  const queryString = handleQueryParams(params);
  const searchURL = 'https://developer.nps.gov/api/v1/parks';
  const URL = searchURL + '?' + queryString;
  const corsProxy = 'https://cors-anywhere.herokuapp.com/'
 
  fetch( corsProxy +URL, {
    headers: {
      'Cache-Control': 'no-cache',
      'X-Api-Key': 'ehbmagD9RS6YJFYM6Wdo4jmpdJMdXKCVnHcA17qj',
      'Access-Control-Allow-Origin': '*',
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(STORE.setStore)
    .then(render)
    .catch(e => renderError(e.message));
}

function render(){
  $('.search-results').html(fullHtmlString());
}
