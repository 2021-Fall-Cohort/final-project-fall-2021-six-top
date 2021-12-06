const mainKitchenPage = document.querySelector(".mainKitchenPage")

const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
let currentTaxRate;



fetch("/Tickets/retireveAllKitchenTickets")
.then((res) => res.json())
.then((openTicketJson) => {
  openTicketJson.forEach((CurrentOpenTicket) => {
    
    console.log("ti: " + CurrentOpenTicket.ticketItems)
    
    if(CurrentOpenTicket.ticketItems.length > 0) {

      let currentTicketid = CurrentOpenTicket.id;

      const orderCard = document.createElement("div");
      orderCard.className = "cards";
      
      var totalPrice = 0;
      var alltax = 0;
      
      CurrentOpenTicket.ticketItems.forEach((item) => {
      
        const itemLabel = document.createElement("h3");
        itemLabel.innerText = item.name + " " + item.price;
        totalPrice += item.price;
        alltax += item.price * currentTaxRate;
        orderCard.appendChild(itemLabel);
        console.log("log: total price: " + totalPrice.toFixed(2));
      });
  
      const priceLable = document.createElement("h2");
      priceLable.innerText = "Price: " + totalPrice.toFixed(2);
      orderCard.appendChild(priceLable); // appending totals
      const taxLable = document.createElement("h2"); // total tax
      taxLable.innerText = "Tax: ";
      orderCard.appendChild(taxLable);
      const totalPriceLable = document.createElement("h2"); // total price + tax
      totalPriceLable.innerText = "Total: " + totalPrice.toFixed(2);
      orderCard.appendChild(totalPriceLable);
  
  
      mainDiv.appendChild(orderCard);
      const cardLabel1 = document.createElement("h1");
      cardLabel1.className = "cardLabels";
      cardLabel1.innerText = CurrentOpenTicket.id;
      orderCard.appendChild(cardLabel1);
      mainKitchenPage.appendChild(mainDiv)

      const finishButton = document.createElement("button");
      finishButton.innerText = "Finished";
      finishButton.addEventListener("click", () => {
        fetch(`/Tickets/${currentTicketid}/finishTicket`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(albums => {                                          
            clearChildren(mainPage);
            displayAlbumsView(mainPage, albums);
        })
        .catch(err => console.log(err));
          

      })
      orderCard.appendChild(finishButton);
       
    }

  });
});