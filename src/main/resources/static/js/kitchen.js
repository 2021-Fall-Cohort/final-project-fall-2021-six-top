
const mainKitchenPage = document.querySelector(".mainKitchenPage")

const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
let currentTaxRate;

fetch("/Tickets/retireveAllKitchenTickets")
  .then((res) => res.json())
  .then((openTicketJson) => {
    showKitchen(openTicketJson);
});

function showKitchen(openTicketJson) {

fetch("/Tickets/retireveAllKitchenTickets")
  .then((res) => res.json())
  .then((openTicketJson) => {
  openTicketJson.forEach((CurrentOpenTicket) => {

    console.log("ti: " + CurrentOpenTicket.ticketItems)
    
    if(CurrentOpenTicket.ticketItems.length > 0 && !CurrentOpenTicket.isFinished) {

      let currentTicketid = CurrentOpenTicket.id;
      
      const orderCard = document.createElement("div");
      orderCard.className = "cards";
      
      var totalPrice = 0;
      var alltax = 0;

      console.log("isFinished: " + CurrentOpenTicket.isFinished)
      
      CurrentOpenTicket.ticketItems.forEach((item) => {
      
        const itemLabel = document.createElement("h3");
        itemLabel.innerText = item.name;
        orderCard.appendChild(itemLabel);
        console.log("items in order...");
      });
  
      // const priceLable = document.createElement("h2");
      // priceLable.innerText = "Price: " + totalPrice.toFixed(2);
      // orderCard.appendChild(priceLable); // appending totals
      // const taxLable = document.createElement("h2"); // total tax
      // taxLable.innerText = "Tax: ";
      // orderCard.appendChild(taxLable);
      // const totalPriceLable = document.createElement("h2"); // total price + tax
      // totalPriceLable.innerText = "Total: " + totalPrice.toFixed(2);
      // orderCard.appendChild(totalPriceLable);
  
  
      mainDiv.appendChild(orderCard);
      const cardLabel1 = document.createElement("h1");
      cardLabel1.className = "cardLabels";
      cardLabel1.innerText = "Order # " + CurrentOpenTicket.id;
      orderCard.appendChild(cardLabel1);
      mainKitchenPage.appendChild(mainDiv)

      const finishButton = document.createElement("button");
      finishButton.innerText = "Finished";
      finishButton.className = "finishButton";
      finishButton.addEventListener("click", () => {
        fetch(`/Tickets/${currentTicketid}/finishTicket`, {
          method: "DELETE"
        })
        .then((res) => res.json())
        .then((tickets) => {
          clearChildren(mainDiv);
          showKitchen(openTicketJson);
        })
        .catch(err => console.log(err));
      })
      orderCard.appendChild(finishButton);       
    }
  });
});
}

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

// showKitchen(tickets);