import { openOrderWindow } from "./orderWindow.js"
import { openTabsWindow } from "./openTickets.js"

const mainFloorPage = document.querySelector(".mainFloorPage")

const newTicketButton = document.querySelector(".newTicketButton")
newTicketButton.addEventListener("click", () => {
    startNewTicket()
    openOrderWindow()
})

const existingTicketButton = document.querySelector(".openTicketButton")
existingTicketButton.addEventListener("click", () => {
    
    fetch("http://localhost:8080/Tickets/OpenTickets")
    .then((res) => res.json())
    .then((openTicketJson) => {

        console.log(openTicketJson);
        // clearChildren(mainFloorPage);
        openTicketJson.forEach(CurrentOpenTicket => {

            const orderCard = document.createElement("div")
            orderCard.className = "cards";
            
            orderCard.addEventListener("click", () => {            //// functionality for expanding a single ticket
              
            })                                                

            mainFloorPage.appendChild(orderCard);
            const cardLabel1 = document.createElement("h1")
            cardLabel1.className = "cardLabels";
            cardLabel1.innerText = CurrentOpenTicket.id; 
            orderCard.appendChild(cardLabel1);
            
        });
    })
})

function startNewTicket() {
    
    const newTicketJson = {

    /// empty, pojo has ID only..        

    }
    fetch(`http://localhost:8080/Tickets/newTicket`,{
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTicketJson)
    })
    .then((res) => res.json())
    .then((newTicketJson) => {
        console.log("ID: " + newTicketJson.id);
    })


    
    const courseDiv = document.createElement("div")
    courseDiv.className = "courseDiv";
    mainFloorPage.appendChild(courseDiv);
    
    /// Entree Card
    const entreeCard = document.createElement("div")
    entreeCard.className = "cards";
    courseDiv.appendChild(entreeCard);

    const cardLabel1 = document.createElement("h1")
    cardLabel1.className = "cardLabels";
    cardLabel1.innerText = "Entrees";
    entreeCard.appendChild(cardLabel1);

    entreeCard.addEventListener("click", () => {

        fetch("http://localhost:8080/Floor/Entrees")
        .then((res) => res.json())
        .then((entreeJson) => {

            clearChildren(mainFloorPage);
            entreeJson.forEach(entree => {

                const entreeCard = document.createElement("div")
                entreeCard.className = "cards";
                
                entreeCard.addEventListener("click", () => {            //// functionality for adding entree to ticket here
                    fetch
                })                                                

                mainFloorPage.appendChild(entreeCard);

                const cardLabel1 = document.createElement("h1")
                cardLabel1.className = "cardLabels";
                cardLabel1.innerText = entree.name; 
                entreeCard.appendChild(cardLabel1);
                
            });

        })
    })

    /// Sides Card
    const sidesCard = document.createElement("div");
    sidesCard.className = "cards";
    courseDiv.appendChild(sidesCard);

    const cardLabel2 = document.createElement("h1")
    cardLabel2.className = "cardLabels";
    cardLabel2.innerText = "Sides";
    sidesCard.appendChild(cardLabel2);

    /// Appetizers Card
    const appetizersCard = document.createElement("div");
    appetizersCard.className = "cards";
    courseDiv.appendChild(appetizersCard);

    const cardLabel3 = document.createElement("h1")
    cardLabel3.className = "cardLabels";
    cardLabel3.innerText = "Appetizers";
    appetizersCard.appendChild(cardLabel3);

    /// Non Alcoholic Drinks Card
    const nonAlcoholicDrinksCard = document.createElement("div");
    nonAlcoholicDrinksCard.className = "cards";
    courseDiv.appendChild(nonAlcoholicDrinksCard);

    const cardLabel4 = document.createElement("h1")
    cardLabel4.className = "cardLabels";
    cardLabel4.innerText = "Non-Alcoholic";
    nonAlcoholicDrinksCard.appendChild(cardLabel4);

    /// Alcoholic Drinks Card
    const AlcoholicDrinksCard = document.createElement("div");
    AlcoholicDrinksCard.className = "cards";
    courseDiv.appendChild(AlcoholicDrinksCard);
 
    const cardLabel5 = document.createElement("h1")
    cardLabel5.className = "cardLabels";
    cardLabel5.innerText = "Appetizers";
    AlcoholicDrinksCard.appendChild(cardLabel5);


    console.log("started a new ticket...");
}

function clearChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
}