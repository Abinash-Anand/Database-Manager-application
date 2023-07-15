//start button
const { ipcRenderer } = require("electron");
let btnStart = document.querySelector(".start-btn");
btnStart.addEventListener("click", () => {
  const data = document.getElementById("customFile");
  if (data && data?.files.length > 0) {
    document.getElementsByClassName("start-btn").disabled = true;
    document.querySelector(
      ".load"
    ).innerHTML = `<div class="spinner-border text-primary" role="status">
</div>`;
    const formData = new FormData();
    // console.log(data.files[0])
    formData.append("customFile", data.files[0]);

    fetch("http://localhost:3000/", {
      method: "POST", // or 'PUT'
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setTimeout(() => {
          document.getElementsByClassName("start-btn").disabled = false;
          const spinner = document.querySelector(".load");
          spinner.style.display = "none";
        }, 3000);
      })
      .catch((error) => {
        document.getElementsByClassName("start-btn").disabled = false;
        const spinner = document.querySelector(".load");
        spinner.style.display = "none";
        console.error("Error:", error);
      });
    // window.new();
  } else {
    alert("Please upload CSV file");
  }
});
//update form button
let btnUpdate = document.querySelector(".update-btn");
btnUpdate.addEventListener("click", () => {
  ipcRenderer.send("updateForm");
  // window.open("updateForm.html");
});
//close button
let btnClose = document.querySelector(".exit-window");
btnClose.addEventListener("click", () => {
  window.close(alert("Are you sure you want to close the window"));
});

// //register
// var emailArray = [];
// var passwordArray = [];

// var loginBox = document.getElementById("login");
// var regBox = document.getElementById("register");
// var forgetBox = document.getElementById("forgot");

// var loginTab = document.getElementById("lt");
// var regTab = document.getElementById("rt");

// function regTabFun() {
//   event.preventDefault();

//   regBox.style.visibility = "visible";
//   loginBox.style.visibility = "hidden";
//   forgetBox.style.visibility = "hidden";

//   regTab.style.backgroundColor = "rgb(12, 132, 189)";
//   loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
// }
// function loginTabFun() {
//   event.preventDefault();

//   regBox.style.visibility = "hidden";
//   loginBox.style.visibility = "visible";
//   forgetBox.style.visibility = "hidden";

//   loginTab.style.backgroundColor = "rgb(12, 132, 189)";
//   regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
// }
// function forTabFun() {
//   event.preventDefault();

//   regBox.style.visibility = "hidden";
//   loginBox.style.visibility = "hidden";
//   forgetBox.style.visibility = "visible";

//   regTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
//   loginTab.style.backgroundColor = "rgba(11, 177, 224, 0.82)";
// }

// function register() {
//   event.preventDefault();

//   var email = document.getElementById("re").value;
//   var password = document.getElementById("rp").value;
//   var passwordRetype = document.getElementById("rrp").value;

//   if (email == "") {
//     alert("Email required.");
//     return;
//   } else if (password == "") {
//     alert("Password required.");
//     return;
//   } else if (passwordRetype == "") {
//     alert("Password required.");
//     return;
//   } else if (password != passwordRetype) {
//     alert("Password don't match retype your Password.");
//     return;
//   } else if (emailArray.indexOf(email) == -1) {
//     emailArray.push(email);
//     passwordArray.push(password);

//     alert(email + "  Thanks for registration. \nTry to login Now");

//     document.getElementById("re").value = "";
//     document.getElementById("rp").value = "";
//     document.getElementById("rrp").value = "";
//   } else {
//     alert(email + " is already register.");
//     return;
//   }
// }
// function login() {
//   event.preventDefault();

//   var email = document.getElementById("se").value;
//   var password = document.getElementById("sp").value;

//   var i = emailArray.indexOf(email);

//   if (emailArray.indexOf(email) == -1) {
//     if (email == "") {
//       alert("Email required.");
//       return;
//     }
//     alert("Email does not exist.");
//     return;
//   } else if (passwordArray[i] != password) {
//     if (password == "") {
//       alert("Password required.");
//       return;
//     }
//     alert("Password does not match.");
//     return;
//   } else {
//     alert(email + " yor are login Now \n welcome to our website.");

//     document.getElementById("se").value = "";
//     document.getElementById("sp").value = "";
//     return;
//   }
// }
// function forgot() {
//   event.preventDefault();

//   var email = document.getElementById("fe").value;

//   if (emailArray.indexOf(email) == -1) {
//     if (email == "") {
//       alert("Email required.");
//       return;
//     }
//     alert("Email does not exist.");
//     return;
//   }

//   alert("email is send to your email check it in 24hr. \n Thanks");
//   document.getElementById("fe").value = "";
// }
