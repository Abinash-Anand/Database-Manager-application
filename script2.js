// fetch("http://localhost:3000")
//     .then(res => res.json())
//     .then(json => {
//         console.log(json)
//         // you need to get mountains from json
//         // if json is in the shape that is needed then leave as it is
//         const mountains = json
//         let table = document.querySelector("#demoTable");
//         let data = Object.keys(mountains[0]);
//         generateTable(table, mountains); // generate the table first
//         generateTableHead(table, data); // then the head
//     })
//
// function generateTableHead(table, data) {
//         let thead = table.createHead();
//         let row = thead.insertRow();
//         for (let key of data) {
//                 let th = document.createElement("th");
//                 let text = document.createTextNode(key);
//                 th.appendChild(text);
//                 row.appendChild(th);
//
//         }
// }
//
// function generateTable(table, data) {
//         for (let element of data) {
//                 let row = table.insertRow();
//                 for (key in element) {
//                         let cell = row.insertCell();
//                         let text = document.createTextNode(element[key]);
//                         cell.appendChild(text);
//                 }
//         }
// }
//
const { ipcRenderer } = require("electron");
fetch("http://localhost:3000")
  .then(function (response) {
    return response.json();
  })
  .then(function (result) {
    console.log(result);
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for (let res of result) {
      out += `
         <tr style="${
           res.isUpdated
             ? "background: green; color: black;"
             : "background: white; color: black;"
         }">
            <td scope="row">${res.company_name}</td>
            <td scope="row">${res.connectedAt}</td>
            <td scope="row">${res.dropcontactEmail}</td>
            <td scope="row">${res.emailReplied}</td>
            <td scope="row">${res.emailSent}</td>
            <td scope="row">${res.firstMessageAt}</td>
            <td scope="row">${res.firstName}</td>
            <td scope="row">${res.jobSeeker}</td>
            <td scope="row">${res.lastName}</td>
            <td scope="row">${res.linkedinUrl}</td>
            <td scope="row">${res.location}</td>
            <td scope="row">${res.messageReplied}</td>
            <td scope="row">${res.messageSent}</td>
            <td scope="row">${res.occupation}</td>
            <td scope="row">${res.phoneNumbers}</td>
            <td scope="row">${res.premium}</td>
            <td scope="row">${res.profileStatus}</td>
            <td scope="row">${res.prospectList}</td>
            <td scope="row">${res.salesNavigatorUrl}</td>
            <td scope="row">${res.tags}</td>
         </tr>
      `;
    }

    placeholder.innerHTML = out;
  });

let btnBack = document.querySelector(".back-btn");
btnBack.addEventListener("click", () => {
  ipcRenderer.send("back");
});
