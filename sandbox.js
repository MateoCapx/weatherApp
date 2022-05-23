    // Grabbing the Search Button from HTML
let searBtn = document.querySelector("#searchBtn")
searBtn.addEventListener('click',search )

let seachInputField = document.querySelector("#citySearchh")

    // Parent Element
let appenedEl = document.querySelector("#appendEl")

function search(){
     event.preventDefault();
  console.log(seachInputField.value);

    let listItemEl = document.createElement("li");
    listItemEl=seachInputField.value

appenedEl.append(listItemEl)






  
//   listItemEl.textContent ='WORKS'

//   
}





// function grabInputVaulue (e){
//    
//     seachInputField = e.target.value
    
// }