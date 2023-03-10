const btn = document.querySelector(".btn");
const myForm = document.querySelector("#my-form");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");
const delButton = document.querySelector(".btn:hover");

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pnumber = document.getElementById("pnumber").value;

  //object
  let myObj = {
    name: name,
    email: email,
    pnumber: pnumber,
  };

  const parentEle = document.getElementById("lisOfItems");
  const childEle = document.createElement("li");
  const childButton = document.createElement("input");
  const editButton = document.createElement("input");
  childButton.type = "button";
  editButton.type = "button";
  childButton.value = "Delete";
  editButton.value = "edit";

  //API CALL TO POST DATA
  axios
    .post(
      "https://crudcrud.com/api/6b6e8ae3df314414b587d9cbf90b4b72/appointmentData",
      myObj
    )
    .then((res) => {
      showUserOnScreen(res);
    })
    .catch((err) => console.log(err));

  //serializing object
  //let myObjSerialized = JSON.stringify(myObj);

  //serializing the object so that it can be stored in localStorage
  //localStorage.setItem(email, myObjSerialized);

  // childButton.appendChild(document.createTextNode('Delete'))

  childButton.onclick = () => {
    // localStorage.removeItem(myObj.email);

    axios
      .delete(
        `https://crudcrud.com/api/6b6e8ae3df314414b587d9cbf90b4b72/appointmentData/${data._id}`
      )
      .then((res) => {
        parentEle.removeChild(childEle);
      })
      .catch((err) => console.log(err));
  };

  editButton.onclick = () => {
    document.getElementById("name").value = myObj.name;
    document.getElementById("email").value = myObj.email;
    document.getElementById("pnumber").value = myObj.pnumber;
    localStorage.removeItem(myObj.email);
    parentEle.removeChild(childEle);
  };

  //deserializing the object to make it usable
  //let myObjDeserialized = JSON.parse(localStorage.getItem('myObject'));

  //console.log(myObjDeserialized)

  // if(nameInput.value === formName && emailInput.value === formEmail) {
  //   console.log(nameInput.value);
  //   console.log(emailInput.value);
  // } else {
  //   msg.classList.add('error');
  //   msg.innerHTML = 'Please enter correct details';

  //   setTimeout(() => msg.remove(), 3000);
  // }
}
//Show user on screen function on submit
function showUserOnScreen(user) {
  const parentEle = document.getElementById("lisOfItems");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pnumber = document.getElementById("pnumber").value;
  const childEle = document.createElement("li");
  const childButton = document.createElement("input");
  const editButton = document.createElement("input");
  childButton.type = "button";
  editButton.type = "button";
  childButton.value = "Delete";
  editButton.value = "edit";

  childEle.textContent =
    user.data.name + " - " + user.data.email + " - " + user.data.pnumber;
  parentEle.appendChild(childEle);
  childEle.appendChild(childButton);
  childEle.appendChild(editButton);
}

//show user on screenOnLoad
function showUserOnLoad(user) {
  const parentEle = document.getElementById("lisOfItems");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const pnumber = document.getElementById("pnumber").value;
  const childEle = document.createElement("li");
  const childButton = document.createElement("input");
  const editButton = document.createElement("input");
  childButton.type = "button";
  editButton.type = "button";
  childButton.value = "Delete";
  editButton.value = "edit";

  childEle.textContent = user.name + " - " + user.email + " - " + user.pnumber;
  parentEle.appendChild(childEle);
  childEle.appendChild(childButton);
  childEle.appendChild(editButton);

  childButton.onclick = () => {
    // localStorage.removeItem(myObj.email);
    
    axios
      .delete(
        `https://crudcrud.com/api/6b6e8ae3df314414b587d9cbf90b4b72/appointmentData/${user._id}`
      )
      .then((res) => {
        parentEle.removeChild(childEle);
      })
      .catch((err) => console.log(err));
  };
}

window.addEventListener("DOMContentLoaded", (e) => {
  //API CALL TO GET DATA
  e.preventDefault();
  axios
    .get(
      "https://crudcrud.com/api/6b6e8ae3df314414b587d9cbf90b4b72/appointmentData"
    )
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        showUserOnLoad(res.data[i]);
      }
    })
    .catch((res) => {
      console.log(res);
    });
});


// function removeList(e){
//   if(e.target.classList.contains('btn:hover')){
//     var li = e.target.parentElement;
//     parentEle.removeChild(li);
//   }
// }
