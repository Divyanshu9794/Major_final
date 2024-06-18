let ticketholder = document.querySelector("#data-output");
let filter_btn = document.querySelector(".filter-btn");
let search_btn = document.querySelector("#search_btn");
let msg = document.getElementById("msg");
let tickets = [];

getFromServer();

function renderTickets(tickets) {
  ticketholder.innerHTML = "";
  if (tickets.length === 0) {
    out = `<h2 style= "color:red; text-align:center;">No data to display</h2>`;
    msg.innerHTML = out;
  } else {
    let index = 1;
    for (let ticket of tickets) {
      const tr = document.createElement("tr");
      tr.setAttribute("data-key", ticket._id);
      tr.innerHTML = `
			<tr>
				<td>${index}</td>
				<td>${ticket.username}</td>
				<td>${ticket.useremail}</td>
				<td>${ticket.predictedCrop}</td>
				<td>${ticket.season}</td>
				<td>${ticket.assignedExpert}</td>
				<td>${ticket.status}</td>
				<td>${ticket.createdAt.substring(0, 10)}</td>
				<td style="padding:0px"><button onclick="location.href = 'http://localhost:3000/';" class="chat-btn">Chat</button></td>
				<td style="padding:0px"><button class="show-btn">Show Details</button></td>

			</tr>
		`;
      index++;
      ticketholder.append(tr);
    }
  }
}

function getFromServer() {
  fetch("/admin/getallTickets")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      tickets = data;
      renderTickets(tickets);
    });
}

filter_btn.addEventListener("click", (event) => {
  tkt = tickets;
  let season = event.target.value;
  console.log(season);
  tkt = tkt.filter((ticket) => {
    return ticket.season.toLowerCase() == season;
  });
  renderTickets(tkt);
});

search_btn.addEventListener("click", (event) => {
  tkt = tickets;
  console.log("hello");
  let search = document.querySelector("#search");
  search.innerHTML = "";
  input = search.value.toLowerCase();
  tkt = tkt.filter((ticket) => {
    if (
      ticket.username.toLowerCase().includes(input) ||
      ticket.useremail.toLowerCase().includes(input) ||
      ticket.predictedCrop.toLowerCase().includes(input) ||
      ticket.season.toLowerCase().includes(input) ||
      ticket.assignedExpert.toLowerCase().includes(input)
    )
      return ticket;
  });
  renderTickets(tkt);
});

const showBtn = document.querySelector(".show-btn");
const info = document.querySelector(".info");
const back = document.querySelector(".back");
const showDetails = document.querySelector(".show-details");

const uname = document.querySelector("#uname");
const email = document.querySelector("#email");
const crop = document.querySelector("#crop");
const date = document.querySelector("#date");
const expert = document.querySelector("#expert");
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
  console.log(tkt);
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
