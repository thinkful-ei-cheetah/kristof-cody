'use strict';

/*global $*/
$(handleSearchClick());

const STORE = (function(){
  const results= [
  ];
  let searchValue = '';
  let maxResults = 10;
  const apiKey = 'ehbmagD9RS6YJFYM6Wdo4jmpdJMdXKCVnHcA17qj';
  const states = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AS': 'American Samoa',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'DC': 'District Of Columbia',
    'FM': 'Federated States Of Micronesia',
    'FL': 'Florida',
    'GA': 'Georgia',
    'GU': 'Guam',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MH': 'Marshall Islands',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'MP': 'Northern Mariana Islands',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PW': 'Palau',
    'PA': 'Pennsylvania',
    'PR': 'Puerto Rico',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VI': 'Virgin Islands',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming'
  };

  

  return {
    results,
    searchValue,
    maxResults,
    apiKey,
    states
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
      checksKeywithObj(searchEntry);
      getParkInfo(STORE.searchValue);
      
    } catch (e){
      console.log(e);
      renderError(e.message);
    }
  });
}
function checksKeywithObj(key){
  let stateObject = STORE.states;
  let searcher = key.toLowerCase()
    .split(',')
    .forEach(entry => {
      if(entry.length !== 2){
        let newEntry = entry[0].toUpperCase()+entry.slice(1);
        for(let key in stateObject ){
          if(stateObject[key] === newEntry) return key;
        }
          
      }
      else if(Object.keys(stateObject).includes(entry)){
        return entry;
      }else{
        throw new Error('Please enter a valid state. For eg. Texas');
      }

    });
  
  
  console.log( searcher);
}


function renderError(error = 'No User Found'){
  $('section').html(error);
}

function validateEntry(entry){
  if (entry === '' || entry=== null) throw new Error('Please enter a valid state. For eg. Use Texas, instead of Tx.');
}

// function handleQuery(){

// }
function generateHtml(){
  return `<article role="listitem" class="search-result">
  <div class="info-section">
    <div class="image-name-container">
      <div class="img-box">
        <div class="holder"></div>
      </div>
      <div class="park-name-and-adr">
        <h2 class="park-name">Zion National park</h2>
        <div class="park-address">
          <span class= "address-text address-line-1">2 Officers Row</span>
          <br>
          <span class= "address-text address-line-2">Yellowstone National Park Headquarters</span>
          <br>
          <span class= "address-text address-line-3">Yellowstone National Park, WY 82190</span>
        </div>
      </div>
    </div>
    <h4 class="park-descripion">Visit Yellowstone and experience the world's first national park. Marvel at a volcano's hidden power rising up in colorful hot springs, mudpots, and geysers. Explore mountains, forests, and lakes to watch wildlife and witness the drama of the natural world unfold. Discover the history that led to the conservation of our national treasures 'for the benefit and enjoyment of the people.
    </h4>
  </div>
  <div class="website-link">
    <a href="" class="visit-page"><span >Visit Now ></span></a>
  </div>
</article>`;
}


function getParkInfo(query, maxValue){


  const URL = `https://developer.nps.gov/api/v1/parks?limit=${maxValue}&q=${query}&fields=addresses&api_key=ehbmagD9RS6YJFYM6Wdo4jmpdJMdXKCVnHcA17qj" -H "accept: application/json"`;
  return URL;
}
function render(){
  return $('.list').html(generateHtml());
}

