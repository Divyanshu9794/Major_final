let ticketHolder = document.querySelector("#data-output");
let msg = document.getElementById("msg");
let tickets = [];

getFromServer();

function renderTickets(tickets) {
  ticketHolder.innerHTML = "";
  if (tickets.length === 0) {
    out = `<h2 style= "color:red; text-align:center;">No data to display</h2>`;
    msg.innerHTML = out;
  } else {
    let index = 1;
    tickets.forEach((ticket) => {
      const tr = document.createElement("tr");
      tr.setAttribute("data-key", ticket._id);
      tr.innerHTML = `
			<tr>
				<td>${index}</td>
				<td>${ticket.predictedCrop}</td>
				<td>${ticket.season}</td>
				<td>${ticket.assignedExpert}</td>
				<td>${ticket.createdAt.substring(0, 10)}</td>
        <td>${ticket.status}</td>
        <td style="padding:0px"><button onclick="location.href = 'http://localhost:3000/';" class="chat-btn">Chat</button></td>
        <td style="padding:0px"><button class="show-btn">Show Details</button></td>
        <td style="padding:0px"><button class="close-btn">Close</button></td>
			</tr>
		`;
      index++;
      ticketHolder.append(tr);
    });
  }
}
function getFromServer() {
  fetch("/users/getallTickets")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      tickets = data;
      renderTickets(tickets);
    });
}

function closeTicket(id) {
  fetch("/users/closeTicket/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.status === 201) {
      getFromServer();
    } else {
      alert("Something went Wrong!!!");
    }
  });
}
ticketHolder.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-btn")) {
    closeTicket(
      event.target.parentElement.parentElement.getAttribute("data-key")
    );
  }
});

const showBtn = document.querySelector(".show-btn");
const info = document.querySelector(".info");
const back = document.querySelector(".back");
const showDetails = document.querySelector(".show-details");

const uname = document.querySelector("#uname");
const email = document.querySelector("#email");
const crop = document.querySelector("#crop");
const expert = document.querySelector("#expert");
const date = document.querySelector("#date");
const season = document.querySelector("#season");
const area = document.querySelector("#area");
const region = document.querySelector("#region");
const n = document.querySelector("#n");
const p = document.querySelector("#p");
const k = document.querySelector("#k");
const pH = document.querySelector("#pH");
const humidity = document.querySelector("#humidity");
const rainfall = document.querySelector("#rainfall");
const temp = document.querySelector("#temp");
const status = document.querySelector("#status");

function setDetail(id) {
  tkt = tickets.filter((ticket) => {
    return ticket._id == id;
  });
  uname.innerHTML = tkt[0].username;
  email.innerHTML = tkt[0].useremail;
  crop.innerHTML = tkt[0].predictedCrop;
  expert.innerHTML = tkt[0].assignedExpert;
  date.innerHTML = tkt[0].createdAt.substring(0, 10);
  season.innerHTML = tkt[0].season;
  area.innerHTML = tkt[0].area;
  region.innerHTML = tkt[0].region;
  n.innerHTML = tkt[0].nitrogen;
  p.innerHTML = tkt[0].phosphorous;
  k.innerHTML = tkt[0].potassium;
  pH.innerHTML = tkt[0].pH;
  humidity.innerHTML = tkt[0].humidity;
  rainfall.innerHTML = tkt[0].rainfall;
  temp.innerHTML = tkt[0].temperature;
  status.innerHTML = tkt[0].status;
}

addEventListener("click", (event) => {
  if (event.target.classList.contains("show-btn")) {
    setDetail(
      event.target.parentElement.parentElement.getAttribute("data-key")
    );
    showDetails.style.display = "contents";
    info.style.display = "none";
  }
});
back.onclick = () => {
  showDetails.style.display = "none";
  info.style.display = "contents";
};
