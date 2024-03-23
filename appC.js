    form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    post = document.getElementById("post"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("datac"),
    userInfo1 = document.getElementById("data1"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let userc = localStorage.getItem('userc') ? JSON.parse(localStorage.getItem('userc')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=>{
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    userc.forEach((element, index) => {
        let createElement = `
        <td>
          <div class="d-a">
            <img
              src="${element.picture}"
              alt=""
              class="team-flag"
            />
            <span>${element.employeeName}</span>
          </div>
        </td>
        <td>${element.employeeAge}</td>
        <td>${element.employeeCity}</td>
        <td>${element.employeeEmail}</td>
        <td>${element.employeePhone}</td>
        <td>${element.employeePost}</td>


            <td>
                <button class="oo" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="oo" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        `

        userInfo.innerHTML += createElement
    })
    
}
showInfo()



function readInfo(pic, name, age, city, email, phone, post, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showPost").value = post,
    document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    age.value = Age
    city.value =City
    email.value = Email,
    phone.value = Phone,
    post.value = Post,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        userc.splice(index, 1)
        localStorage.setItem("userc", JSON.stringify(userc))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
    }

    if(!isEdit){
        userc.push(information)
    }
    else{
        isEdit = false
        userc[editId] = information
    }

    localStorage.setItem('userc', JSON.stringify(userc))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})