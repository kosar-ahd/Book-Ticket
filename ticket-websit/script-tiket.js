const $ = document

///// Inputs////
const firstName = $.querySelector('#fName')
const lastName = $.querySelector('#lName')
const phoneNumber = $.querySelector('#phNumber')
const Email = $.querySelector('#email')
const FlightCode = $.querySelector('#Flight_Code')
FlightCode.value = Math.floor(Math.random()*10000)

const countries = $.querySelector('#selectCountries')
const cities = $.querySelector('#selectCities')

/////Buttons//////

const bookTicketBtn = $.querySelector('.book_ticket')
const seeTicketBTn = $.querySelector('#see_ticket')

/////select country and city/////
const citiesList = {
    Iran : ['krj', 'tehran', 'kerman', 'ghom', 'shiraz'],
    USA : ['vashangton', 'frankford', 'adline','micicipi'],
    Canada : ['otava', 'kebek', 'torento', 'lopine'],
    Turkey : ['antalia', 'ezmir','estanbol', 'van']
}
countries.addEventListener('change' , e =>{
    if (countries.value === "Please Select") {
        cities.innerHTML = "";
        cities.innerHTML += "<option>Select City</option>";
      } else {
        let mainCountryName = countries.value; // Us
        let mainCountryCities = citiesList[mainCountryName];
    
        cities.innerHTML = "";
    
        mainCountryCities.forEach(function (city) {
            cities.innerHTML += "<option>" + city + "</option>";
        });
      }
})

/////POST data in dataBase /////

bookTicketBtn.addEventListener('click', event => {
    event.preventDefault()

        let userData = {
            firstName : firstName.value,
            lastName : lastName.value,
            phoneNumber : phoneNumber.value,
            Email : Email.value,
            FlightCode : FlightCode.value,
            countries : countries.value,
            cities : cities.value
        }
        fetch('https://usersticketinfo-default-rtdb.firebaseio.com/userData.json',{
            method:'POST', 
            headers:{'Content-type' : 'application/json'},
            body:JSON.stringify(userData)
        })
        .then(res => {
            console.log(res)
        seeTicketBTn.classList.remove('see_ticket')
        emptyInput()
        })
        .catch(err => console.log(err))



})


function emptyInput(){
     firstName.value =''
     lastName.value =''
     phoneNumber.value =''
     Email.value =''
     FlightCode.value = Math.floor(Math.random()*10000)
     countries.value =''
     cities.value =''
}



