// Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click', search)
// Grabbing the input field
let seachInputField = document.querySelector("#citySearchh")
// Parent Element  for <li's>
let appenedEl = document.querySelector("#appendEl")
// An array that holds all of the search history from the user
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

let keyCount = 0;

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
    let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + temp + " MPH"
    let humidityTemp = document.querySelector("#humidity").textContent = "humidity: " + humidity + temp + " %"
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
    let currentTemp = document.querySelector("#currentTemp").textContent = "Current Tempature: " + temp + " °F"
    let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + temp + " MPH"
    let humidityTemp = document.querySelector("#humidity").textContent = "humidity: " + humidity + temp + " %"
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
        })
    }
    )

};





// function that displays city name when user clicks on history city 
function historyApiRequest(cityName) {
    let firstCall = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=da99fee272bedf1c0e9e3e6d64481c78"
 console.log("Its working") 
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




function fiveDayDisplay(){
    let dailyDisplay ="http://api.openweathermap.org/data/2.5/forecast?q=" + seachInputField.value + "&appid=da99fee272bedf1c0e9e3e6d64481c78"

    
    fetch(dailyDisplay).then(function (response){
        if (response.ok) {
            return response.json()
        } else {
            alert(" Error Try Again")
        }

    }.then(function (data) {



   
    })
    .catch (error => alert ("Somthing went wrong"))

    
    )
search()
}

   
// for (let index = 0; index < 4; index++) {
//     const element = array[index];
    
// }

    // let cityInput = document.querySelector("#city").textContent = "City: " + seachInputField.value;
//     let currentTemp = document.querySelector("#currentTemp").textContent = "Current Tempature: " + temp + " °F"
//     let windSpeed = document.querySelector("#windSpeed").textContent = "Wind Speed: " + wind_speed + temp + " MPH"