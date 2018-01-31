var makeRequest = function(url, callback){
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();

}

// var populateList = function(countries){
//   var ul = document.querySelector('#country-list');
//
//   countries.forEach(function(country){
//     var li = document.createElement('li');
//     li.innerText = country.name;
//     ul.appendChild(li);
//   });
// }

var populateDropdown = function(countries){
  var contents = document.querySelector('#dropdown');
  countries.forEach(function(country, index){
    var option = document.createElement('option');
    option.text = country.name;
    option.value = index;
    contents.appendChild(option);
  })
}

var clearScreen = function () {
    document.getElementById('select-result').innerHTML = "";
}

var displayDetails = function(country){
    console.log(country);

  var ul = document.querySelector('#select-result');
  var li1 = document.createElement('li');
  var li2 = document.createElement('li');
  var li3 = document.createElement('li');
  var flagImage = document.createElement('img');
  li1.innerText = country.name;
  li2.innerText = country.population;
  li3.innerText = country.capital;
  flagImage.src = country.flag;
  flagImage.width = '500';
  flagImage.height = '230';

  ul.appendChild(li1);
  ul.appendChild(li2);
  ul.appendChild(li3);
  ul.appendChild(flagImage);

  var savedCountry = JSON.stringify(country)
    localStorage.setItem('lastCountry', savedCountry);

}


var requestComplete = function(){
  if(this.status !== 200)return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateDropdown(countries);
  save(countries);
}

var save = function(countries) {
    // save to localStorage;
    var storedCountries = JSON.stringify(countries)
    localStorage.setItem('countries', storedCountries);
}

var app = function(){
    var url = "https://restcountries.eu/rest/v2";
    makeRequest(url, requestComplete);

    var lastCountry = JSON.parse(localStorage.getItem('lastCountry'));
    displayDetails(lastCountry);

    //get last country from local storage
    //use last country in displayDetails function

    var select = document.getElementById('dropdown');
    //get countries from localStorage or set as empty array
    var countries = JSON.parse(localStorage.getItem('countries')) || [];
    select.addEventListener('change', function(event){

        var country = countries[event.target.value];
        clearScreen();
      displayDetails(country);
    });

}


window.addEventListener('load', app);
