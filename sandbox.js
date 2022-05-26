// Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click', search)
// Grabbing the input field
let seachInputField = document.querySelector("#citySearchh")
// Parent Element  
let appenedEl = document.querySelector("#appendEl")

let arry= []

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
    
    arrySet()
    settingItemLS()
    apiRequest() 
}

let keyCount =  0;
// Setting values into local storage
function settingItemLS() {
    
    let search = seachInputField.value
    arry.push(search);
    localStorage.setItem(keyCount,arry);
    keyCount = keyCount + 1;
    console.log(arry)

  arrySet()

}







function arrySet(){
   
    for (let i = 0; i < arry.length; i++) {
        console.log("heyyyyyy")
        

    }

 
}

//Function for the appened items from local storage 
function listItemAppened(event){
    event.preventDefault();
    apiRequest() 

}


// function getItemEl()
    let storedInput = localStorage.getItem(keyCount);

    arry =JSON.parse(localStorage.getItem('keyCount')) || [];
     if (storedInput) {
    seachInputField.value = storedInput;
   
    arrySet()
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

// getItemEl()


















// function settingItemLS() {
//    let storedInput = localStorage.getItem('keyCount');
// if (storedInput === null) {
//    let city = JSON.stringify([{city: seachInputField.value}])
//    let storedInput = localStorage.setItem('keyCount', city)
// } else {
//    storedInput = JSON.parse(storedInput);
//    storedInput.push({ city: seachInputField.value});
//    localStorage.setItem('keyCount', JSON.stringify(storedInput))
// }
// }
//    // Getting items from local storage
//    let storedInput = localStorage.getItem('keyCount');
//    let locationParse = JSON.parse(storedInput);
//    for (let i = 0; i < locationParse.length; i++) {
//        let loadButton = locationParse[i].city;
//        console.log(locationParse[i].city)
//        const savedCity = document.createElement('button');
//        savedCity.textContent = loadButton;
//        savedCity.setAttribute('id', 'saveBtn')
//        historyEl.append(savedCity);
//    }
//    if (storedInput) {
//        seachInputField.value = storedInput;
//        let listItemEl = document.createElement("li");
//        listItemEl.textContent = seachInputField.value
//        appenedEl.append(listItemEl)
//        listItemEl.addEventListener("click", listItemAppened)
//    }