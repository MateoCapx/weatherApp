// Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click', search)
// Grabbing the input field
let seachInputField = document.querySelector("#citySearchh")
// Parent Element  
let appenedEl = document.querySelector("#appendEl")



    // Main function for program
function search(event) {
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
    
    settingItemLS()
    apiRequest() 
}

let keyCount =  0;
// Setting values into local storage
function settingItemLS() {
    
  let local = localStorage.setItem(keyCount, seachInputField.value)
  keyCount = keyCount + 1;

}


// Getting items from local storage
let storedInput = localStorage.getItem(keyCount);

if (storedInput) {
    seachInputField.value = storedInput;
   
  

    for (let i = 0; i < storedInput.length; i++) {
        console.log(keyCount.length)
        
          let listItemEl = document.createElement("li");
    listItemEl.textContent = seachInputField.value
    appenedEl.append(listItemEl)

    listItemEl.addEventListener("click",listItemAppened)

    }

 
}

//Function for the appened items from local storage 
function listItemAppened(event){
    event.preventDefault();
    apiRequest() 

}











// Displaying key values from API
function displayWeather(data){

    // Capturing the values from the API
    const{city} = seachInputField.value 
    const {temp} =data.current;
    const {wind_speed} =data.current;
    const {humidity} =data.current;
    const {uvi} =data.current;
    console.log(temp,wind_speed,humidity,uvi)

    let cityInput = document.querySelector("#city").textContent = "City: " + seachInputField.value ;
   let currentTemp = document.querySelector("#currentTemp").textContent = "Current Tempature: " + temp + " °F"
   let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + temp + " MPH"
   let humidityTemp = document.querySelector("#humidity").textContent = "humidity: " + humidity  + temp + " %"
   let uvIndex = document.querySelector("#uvIndex").textContent = "UV Index: " + uvi;
}



// Making the API request Also pulling the city data from API
function apiRequest(lat,lon) {
    let firstCall = "http://api.openweathermap.org/geo/1.0/direct?q="+ seachInputField.value +"&appid=da99fee272bedf1c0e9e3e6d64481c78"
    
    fetch(firstCall).then(function (response) {
        if(response.ok){
      return response.json()

        }else {
            alert(" Error Try Again")
        }

    }
    ).then(function (data){
        let lat =  data[0].lat// you need to get the lat and lon variables from the first response then pass them into the second link
        let lon = data[0].lon
        let secondCall = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat +"&lon="+lon+"&units=imperial&appid=da99fee272bedf1c0e9e3e6d64481c78"
        fetch(secondCall).then(function (response) {
            if(response.ok){
                return response.json()
            }
        }).then(function (data){
            console.log(data)
            displayWeather(data)
        })
    }
    )
};


