const planTripBtn = document.getElementById('planTrip')
const addTripForm = document.getElementById('addTrip')
const closePopUp = document.getElementById('close')
planTripBtn.addEventListener('click', () => {
    addTripForm.style.display = "flex"
    planTripBtn.style.display = "none"
})
closePopUp.addEventListener('click', () => {
    addTripForm.style.display = "none"
    planTripBtn.style.display = "flex"
 })
