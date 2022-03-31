const planTripBtn = document.getElementById('planTrip')
const addTripForm = document.getElementById('addTrip')
const flightBtn = document.getElementById('flightBtn')
const flightSearchForm = document.getElementById('flightSearch')
const closePopUp = document.getElementById('close')
const closePopUp2 = document.getElementById('close2')
planTripBtn.addEventListener('click', () => {
    addTripForm.style.display = "flex"
    planTripBtn.style.display = "none"
})

closePopUp.addEventListener('click', () => {
    addTripForm.style.display = "none"
    planTripBtn.style.display = "flex"
})
// flightBtn.addEventListener('click', () => {
//     flightSearchForm.style.display = "flex"
//     flightBtn.style.display = "none"
// })
// closePopUp2.addEventListener('click', () => {
//     flightSearchForm.style.display = "none"
//     flightBtn.style.display = "flex"
//  })
