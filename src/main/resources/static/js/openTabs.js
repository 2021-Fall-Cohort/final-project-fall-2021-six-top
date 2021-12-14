const openTabsPage = document.querySelector(".openTabsPage")
const reopenTabsButton = document.querySelector(".reopenTabButton");
const mainTabsDiv = document.createElement("div");
mainTabsDiv.className = "mainTabsDiv";
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
        
        if(CurrentOpenTicket.ticketItems.length > 0) {
    
          let currentTicketid = CurrentOpenTicket.id;
    
          const orderCard = document.createElement("div");
          orderCard.className = "tabCards";
          
          var totalPrice = 0;
          var alltax = 0;
          
          CurrentOpenTicket.ticketItems.forEach((item) => {
          
            const itemLabel = document.createElement("h3");
        //    itemLabel.innerText = item.name + " " + item.price;
            totalPrice += item.price;
            alltax += item.price * currentTaxRate;
            orderCard.appendChild(itemLabel);
            console.log("log: total price: " + totalPrice.toFixed(2));
          });
      
        //   const priceLable = document.createElement("h2");
        //   priceLable.innerText = "Price: " + totalPrice.toFixed(2);
        //   orderCard.appendChild(priceLable); // appending totals
        //   const taxLable = document.createElement("h2"); // total tax
        //   taxLable.innerText = "Tax: ";
        //   orderCard.appendChild(taxLable);

          mainTabsDiv.appendChild(orderCard);

          const cardLabel1 = document.createElement("h1");
          cardLabel1.className = "cardTabLabel";
          cardLabel1.innerText = "Order # " + CurrentOpenTicket.id;

          const cardlabel2 = document.createElement("h2");
          cardlabel2.className = "cardLabels";
          cardlabel2.innerText = "Name: " + CurrentOpenTicket.name;

          orderCard.appendChild(cardLabel1);
          openTabsPage.appendChild(mainTabsDiv)


          const totalPriceLable = document.createElement("h2"); // total price + tax
          totalPriceLable.className = "tabPriceLabel";
          totalPriceLable.innerText = "Total: $" + totalPrice.toFixed(2);
          orderCard.appendChild(totalPriceLable);

        //   reopenTabButton.addEventListener("click", () => {
            
        //   }
      
    
        //   const finishButton = document.createElement("button");
        //   finishButton.innerText = "Finished";
        //   finishButton.addEventListener("click", () => {
        //     fetch(`/Tickets/${currentTicketid}/finishTicket`, {
        //       method: "DELETE"
        //     })
        //     .then((res) => res.json())
        //     .then((tickets) => {
        //       clearChildren(mainDiv);
        //       showKitchen(tickets);
        //     })
        //     .catch(err => console.log(err));
        //   })
        //   orderCard.appendChild(finishButton);
           
        }
    
      });
    
    });
    }
    
    function clearChildren(element) {
      while (element.firstChild) {
        element.removeChild(element.lastChild);
      }
    }