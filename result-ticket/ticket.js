const $= document

const container = $.querySelector('.container')
const editeModalBox = $.querySelector('.edit_modal')

///modol Box element////
const name = $.querySelector('#name')
const family = $.querySelector('#family')
const email = $.querySelector('#email')
const phone = $.querySelector('#phone')
const setBtn = $.querySelector('#set_btn')

let userID = null

window.addEventListener('load', event => {
    getAllData()
})

function getAllData(){

    fetch('https://usersticketinfo-default-rtdb.firebaseio.com/userData.json')
    .then(res => res.json())
    .then(data => {

        let dataObj = Object.entries(data)
        // container.innerHTML =''

        dataObj.forEach(userInfo => {
                // console.log(userInfo);
                container.insertAdjacentHTML('beforeend',
                ` <div class="user_ticket ">
            
                <div class="user_info">
                    <div class="personal_data">
                        <p>${userInfo[1].firstName}</p>
                        <p>${userInfo[1].lastName}</p>
                        <p>${userInfo[1].phoneNumber}</p>
                        <p>${userInfo[1].Email}</p>
                    </div>
            
                    <div class="flight_data">
                        <p>${userInfo[1].countries}</p>
                        <p>${userInfo[1].cities}</p>
                        <p>${userInfo[1].FlightCode}</p>
                        <p>${userInfo[0]}</p>
                    </div>
            
                </div>
            
                <div class="btns">
                   <button onclick ="deleteData('${userInfo[0]}')">Delete</button>
                   <button  onclick ="editData('${userInfo[0]}')" >Edite</button>
                </div>
            </div>`
            )
            })
        
    })

}

////DELETE data of DataBase////

function deleteData(ID){
    userID = ID
    fetch(`https://usersticketinfo-default-rtdb.firebaseio.com/userData/${userID}.json`,{
        method : 'DELETE'
    })
    .then(res => {
        console.log(res);
        getAllData()
    })
    .catch(err => console.log(err))
    
}

/////PUT data in DataBase/////

function editData(id){
    editeModalBox.classList.remove('not_active')
    // fetch(`https://usersticketinfo-default-rtdb.firebaseio.com/userData/${userID}.json`,{
    //     method : 'PUT',
    //     headers : {'Content-type': 'application/json'},
    //     body : JSON.stringify()
    // })
  
    setBtn.addEventListener('click', userid =>{
        
        userID = id

        let newData = {
        firstName : name.value,
        lastName : family.value,
        phoneNumber : email.value,
        Email : phone.value           
        }

    fetch(`https://usersticketinfo-default-rtdb.firebaseio.com/userData/${userID}.json`,{
        method : 'PUT',
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify(newData)
    })
    .then(res => {
        console.log(res);
        editeModalBox.classList.add('not_active')
        getAllData()

    })
    .catch(err => console.log(err))

    })
}




















// dataObj.forEach(userInfo => {
//     console.log(userInfo);
//     container.insertAdjacentHTML('beforeend',
//     ` <div class="user_ticket ">

//     <div class="user_info">
//         <div class="personal_data">
//             <p>${userInfo[1].firstName}</p>
//             <p>${userInfo[1].lastName}</p>
//             <p>${userInfo[1].phoneNumber}</p>
//             <p>${userInfo[1].Email}</p>
//         </div>

//         <div class="flight_data">
//             <p>${userInfo[1].countries}</p>
//             <p>${userInfo[1].cities}</p>
//             <p>${userInfo[1].FlightCode}</p>
//             <p>${userInfo[0]}</p>
//         </div>

//     </div>

//     <div class="btns">
//        <button onclick ="deleteData('${userInfo[0]}')">Delete</button>
//        <button  onclick ="editData()" >Edite</button>
//     </div>
// </div>`
// )
// })