// Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click', search)
// Grabbing the input field
let seachInputField = document.querySelector("#citySearchh")
// Parent Element  for <li's>
let appenedEl = document.querySelector("#appendEl")
// An array that holds all of the search history from the user/ Getting items from local storage 
let arry = JSON.parse(localStorage.getItem('searchHistory')) || []

arrySet() //this function is called right here to automatically get the saved searches.

// Main function for program
function search(event) {
    event.preventDefault();
    console.log(seachInputField.value);
    // validating to make sure an input was made.
    if (seachInputField.value === "") {
        window.alert("Enter City")
        return;
    }

   
    settingItemLS()
    apiRequest()
    
}

// Setting values into local storage
function settingItemLS() {

    let search = seachInputField.value
    arry.push(search);
    localStorage.setItem('searchHistory', JSON.stringify(arry));
    console.log(arry)

    arrySet()

}



// Looping over the array & appeneding li's to page. 
function arrySet() {
    appenedEl.innerHTML = "";  // Resetting The Parent Div that we append  search history too. Before creating the updated search history.
    for (let i = 0; i < arry.length; i++) {
        console.log("heyyyyyy")

        // Appeneding input from form field to Document
        let listItemEl = document.createElement("li");
        listItemEl.textContent = arry[i]
        listItemEl.addEventListener("click", listItemAppened)
        appenedEl.append(listItemEl)

    }


}

//Function for the appened items from local storage 
function listItemAppened(event) {
    event.preventDefault();
    historyApiRequest(event.target.textContent) // 
    console.log(event.target.textContent)
    
}


// Displaying key values from API
function displayWeather(data) {

    // Capturing the values from the API
    const { city } = seachInputField.value
    const { temp } = data.current;
    const { wind_speed } = data.current;
    const { humidity } = data.current;
    const { uvi } = data.current;
    console.log(temp, wind_speed, humidity, uvi)

    let cityInput = document.querySelector("#city").textContent = "City: " + seachInputField.value;
    let currentTemp = document.querySelector("#currentTemp").textContent = "Current Tempature: " + temp + " °F"
    let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + " MPH"
    let humidityTemp = document.querySelector("#humidity").textContent = "humidity: " + humidity + " %"
    let uvIndex = document.querySelector("#uvIndex").textContent = "UV Index: " + uvi;
}


// 2nd Display Weather function used to display city name once i click onto a searched city from the history tabs 
function historyDisplayWeather(data,cityName) {

    // Capturing the values from the API
    const { city } = seachInputField.value
    const { temp } = data.current;
    const { wind_speed } = data.current;
    const { humidity } = data.current;
    const { uvi } = data.current;
    console.log(temp, wind_speed, humidity, uvi)

    let cityInput = document.querySelector("#city").textContent = "City: " + cityName;
    let currentTemp = document.querySelector("#currentTemp").textContent = "Current Tempature: " +temp+ " °F"
    let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + " MPH"
    let humidityTemp = document.querySelector("#humidity").textContent = "humidity: " + humidity + " %"
    let uvIndex = document.querySelector("#uvIndex").textContent = "UV Index: " + uvi;
}



// Making the API request Also pulling the city data from API
function apiRequest(lat, lon) {
    let firstCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + seachInputField.value + "&appid=da99fee272bedf1c0e9e3e6d64481c78"

    fetch(firstCall).then(function (response) {
        if (response.ok) {
            return response.json()

        } else {
            alert(" Error Try Again")
        }

    }
    ).then(function (data) {
        let lat = data[0].lat// you need to get the lat and lon variables from the first response then pass them into the second link
        let lon = data[0].lon
        let secondCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=da99fee272bedf1c0e9e3e6d64481c78"
        fetch(secondCall).then(function (response) {
            if (response.ok) {
                return response.json()
            }
        }).then(function (data) {
            console.log(data)
            displayWeather(data)
            fiveDayDisplay(data.daily.slice(1,6))
        })
    }
    )

};





// function that displays city name when user clicks on history city 
function historyApiRequest(cityName) {
    let firstCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=da99fee272bedf1c0e9e3e6d64481c78"
 
    fetch(firstCall).then(function (response) {
        if (response.ok) {
            return response.json()

        } else {
            alert(" Error Try Again")
        }

    }
    ).then(function (data) {
        let lat = data[0].lat// you need to get the lat and lon variables from the first response then pass them into the second link
        let lon = data[0].lon
        let secondCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=da99fee272bedf1c0e9e3e6d64481c78"
        fetch(secondCall).then(function (response) {
            if (response.ok) {
                return response.json()
            }
        }).then(function (data) {
            console.log(data)
            historyDisplayWeather(data,cityName)
        })
    }
    )

 };




 //function that displays 5 day forcast 
function fiveDayDisplay(dataSet){
     
for (let i = 0; i < dataSet.length; i++) {
    console.log( dataSet[1].temp.day)

    //Day 0 forecast
    let tempature0 = document.querySelector("#currentTemp0").textContent = "Tempature:"+
        dataSet[0].temp.day + " °F"
    let windSpeed0 = document.querySelector("#windSpeed0").textContent = "Wind Speed:"+
    dataSet[0].wind_speed + " MPH"
    let humidity0 = document.querySelector("#humidity0").textContent = "Humidity:"+
    dataSet[0].humidity + " %"
 
    //Day 1 forecast
    let tempature1 = document.querySelector("#currentTemp1").textContent = "Tempature:"+
    dataSet[1].temp.day + " °F"
    let windSpeed1 = document.querySelector("#windSpeed1").textContent = "Wind Speed:"+
    dataSet[1].wind_speed + " MPH"
    let humidity1 = document.querySelector("#humidity1").textContent = "Humidity:"+
    dataSet[1].humidity + " %"



    //Day 2 forecast
    let tempature2 = document.querySelector("#currentTemp2").textContent = "Tempature:"+
    dataSet[2].temp.day + " °F"
    let windSpeed2 = document.querySelector("#windSpeed2").textContent = "Wind Speed:"+
    dataSet[2].wind_speed + " MPH"
    let humidity2 = document.querySelector("#humidity2").textContent = "Humidity:"+
    dataSet[2].humidity + " %"

    //Day 3 forecast
    let tempature3 = document.querySelector("#currentTemp3").textContent = "Tempature:"+
    dataSet[3].temp.day + " °F"
    let windSpeed3 = document.querySelector("#windSpeed3").textContent = "Wind Speed:"+
    dataSet[3].wind_speed + " MPH"
    let humidity3 = document.querySelector("#humidity3").textContent = "Humidity:"+
    dataSet[3].humidity + " %"


    //Day 4 forecast
    let tempature4 = document.querySelector("#currentTemp4").textContent = "Tempature:"+
    dataSet[4].temp.day + " °F"
    let windSpeed4 = document.querySelector("#windSpeed4").textContent = "Wind Speed:"+
    dataSet[4].wind_speed + " MPH"
    let humidity4 = document.querySelector("#humidity4").textContent = "Humidity:"+
    dataSet[4].humidity + " %"

    
}


  console.log({dataSet})
   

}


  