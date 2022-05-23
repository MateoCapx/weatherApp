// Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click', search)

let seachInputField = document.querySelector("#citySearchh")

// Parent Element  
let appenedEl = document.querySelector("#appendEl")

function search() {
    event.preventDefault();
    console.log(seachInputField.value);

    // Appeneding input from form field to Document
    let listItemEl = document.createElement("li");
    listItemEl.textContent = seachInputField.value
    appenedEl.append(listItemEl)


    settingItemLS()

}

// Setting values into local storage
function settingItemLS() {
    localStorage.setItem('City', seachInputField.value)
}


