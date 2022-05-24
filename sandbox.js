// Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click', search)
// Grabbing the input field
let seachInputField = document.querySelector("#citySearchh")
// Parent Element  
let appenedEl = document.querySelector("#appendEl")

let keyCount = 0;
// const Latitude = place.geometry.location.lat()
// const Longitude = place.geometry.location.lng()



    // Main function for program
function search() {
    event.preventDefault();
    console.log(seachInputField.value);

    // Appeneding input from form field to Document
    let listItemEl = document.createElement("li");
    listItemEl.textContent = seachInputField.value
    appenedEl.append(listItemEl)

    // validating to make sure an input was made.
   if(seachInputField.value === ""){
        window.alert("Enter City")
        return;
    }

    if( seachInputField.value === 5){
        console.log("too many citys enter ")
    }
    
    settingItemLS()
    apiRequest() 
}


// Setting values into local storage
function settingItemLS() {
  let local = localStorage.setItem(keyCount, seachInputField.value)
  keyCount = keyCount + 1;

}


// Getting items from local storage
let storedInput = localStorage.getItem('keyCount');

if (storedInput) {
    seachInputField.value = storedInput;
}


// Displaying key values from API
function displayWeather(data){

    // Capturing the values from the API
    // const{city} = data.city
    const {temp} =data.current;
    const {wind_speed} =data.current;
    const {humidity} =data.current;
    const {uvi} =data.current;
    console.log(temp,wind_speed,humidity,uvi)

    let cityInput = document.querySelector("#city").textContent = "City: " + city;
   let currentTemp = document.querySelector("#currentTemp").textContent = "Current Tempature: " + temp + " °F"
   let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + temp + " MPH"
   let humidityTemp = document.querySelector("#humidity").textContent = "humidity: " + humidity  + temp + " %"
   let uvIndex = document.querySelector("#uvIndex").textContent = "UV Index: " + uvi;
}











// Making the API request
function apiRequest(lat,lon) {
let apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=27.999020&lon=-80.672661&units=imperial&appid=da99fee272bedf1c0e9e3e6d64481c78"

    fetch(apiCall).then(function (response) {
        if(response.ok){
            response.json().then(function (data) {
                this.displayWeather(data)
            });

        }else {
            alert(" Error Try Again")
        }

    }
    )

};