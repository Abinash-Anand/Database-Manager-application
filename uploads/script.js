//start button
let btnStart = document.querySelector(".start-btn");
btnStart.addEventListener("click", () => {
  window.new();
});
//update form button
let btnUpdate = document.querySelector(".update-btn");
btnUpdate.addEventListener("click", () => {
  window.open("updateForm.html");
});
//close button
let btnClose = document.querySelector(".exit-window");
btnClose.addEventListener("click", () => {
  window.close(alert("Are you sure you want to close the window"));
});

//update form js
let btnBack = document.querySelector(".back-btn");
btnBack.addEventListener("click", () => {
  window.close("updateForm.html");
});
