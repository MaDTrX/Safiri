const planTripBtn = document.getElementById('planTrip')
const addTripForm = document.getElementById('addTrip')
const flightBtn = document.getElementById('flightBtn')
const flightSearchForm = document.getElementById('flightSearch')
const closePopUp = document.getElementById('close')
const closePopUp2 = document.getElementById('close2')
const displayUD = document.querySelectorAll('.displayUD')
const hoverOver = document.querySelector('.hover')
planTripBtn.addEventListener('click', () => {
    addTripForm.style.display = "flex"
    planTripBtn.style.display = "none"
})

closePopUp.addEventListener('click', () => {
    addTripForm.style.display = "none"
    planTripBtn.style.display = "flex"
})
function tripInfo() {
    for (let i = 0; i < displayUD.length; i++) {
        displayUD[i].addEventListener("click", function() {
            displayUD[i].style.visibility = "visible"
            displayUD[i].style.width = "100%"
            displayUD[i].style.height = "100%"
            displayUD[i].style.backgroundSize = "cover"
        })
        }
    }

    
