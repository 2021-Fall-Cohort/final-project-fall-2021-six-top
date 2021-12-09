import { openOrderWindow } from "./orderWindow.js";
import { openTabsWindow } from "./openTickets.js";
let currentTicketId; //important for scope
let currentTaxRate; //important for tax rate
let currentTotal;


////  QUERY SELECTED BUTTONS   ////
const sendFeatureButton = document.querySelector(".sendFeatureButton");

const entreeButton = document.querySelector(".classicEntreesButton");
const starterButton = document.querySelector(".classicStartersButton");
const dessertButton = document.querySelector(".classicDessertButton");
const sideButton = document.querySelector(".classicSidesButton");
const nonAlcholicButton = document.querySelector(".classicNonAlcoholicButton");
const alcoholicButton = document.querySelector(".classicAlcoholicButton");

const individualItems = document.querySelector(".individualItems");
const terminal = document.querySelector(".terminal");

const ticketBox = document.querySelector("terminal");
const totalsBox = document.querySelector(".totalsBox");
// totalsBox.className = "totalsBox";
// terminal.appendChild(totalsBox);
buildMenuCards();
startServerProcess();
function startServerProcess() {
  ////  FETCH FOR COMPANY PROFILE, DONT REPEAT  ////

  fetch("/Management/retrieveCompanyProfile/1")
    .then((res) => res.json())
    .then((companyProfileJson) => {
      currentTaxRate = companyProfileJson.taxRate;
      console.log("Tax Multiplyer: " + currentTaxRate);
    });

  ////  NEW TICKET FOR SCOPE, DONT REPEAT   ////
  console.log("log: started new ticket");

  const newTicketJson = {};
  fetch(`/Tickets/newTicket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTicketJson),
  })
  .then((res) => res.json())
  .then((newTicketJson) => {
    console.log("ID: " + newTicketJson.id);
    currentTicketId = newTicketJson.id;
    currentTotal = newTicketJson.itemsTotal;
  });
}

  function buildMenuCards() {
    ////  ENTREES ////
    entreeButton.addEventListener("click", () => {

      clearChildren(individualItems);
      fetch("/Floor/Entrees")
        .then((res) => res.json())
        .then((entreeJson) => {
          entreeJson.forEach((entree) => {
            console.log(entree);

            const entreeCard = document.createElement("div");
            entreeCard.className = "cards";
            entreeCard.innerText = entree.name + " " + entree.price;
            individualItems.appendChild(entreeCard);

            entreeCard.addEventListener("click", () => {
              const entreeJson = {
                name: entree.name,
                price: entree.price,
                description: entree.description,
                available: entree.available,
                shownOnMenu: false,
              };
              console.log(entree.id);
              fetch(`/Tickets/${currentTicketId}/addItem/entree`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(entreeJson),

              })
                .then((res) => res.json())
                .then((returnedEntree) => {
                  const ticketEntreeCard = document.createElement("div");
                  ticketEntreeCard.className = "cards";
                  ticketEntreeCard.innerText = entree.name + " " + entree.price;
                  ///
                  const deleteButton = document.createElement("button");
                  deleteButton.innerText = "Remove";
                  deleteButton.addEventListener("click", () => {
                    fetch(`/Floor/deleteSingleEntree/${returnedEntree.id}`, {
                      method: "DELETE"
                    })
                    ticketEntreeCard.remove();
                    showTotal(currentTicketId);
                  });
                  ticketEntreeCard.appendChild(deleteButton);
                  ///
                  terminal.appendChild(ticketEntreeCard);
                  showTotal(currentTicketId);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
    });

    ////  STARTERS    ////

    starterButton.addEventListener("click", () => {

      clearChildren(individualItems);
      fetch("/Floor/Appetizers")
        .then((res) => res.json())
        .then((appetizersJson) => {
          appetizersJson.forEach((appetizer) => {
            console.log(appetizer);

            const appetizerCard = document.createElement("div");
            appetizerCard.className = "cards";
            appetizerCard.innerText = appetizer.name + " " + appetizer.price;
            individualItems.appendChild(appetizerCard);

            appetizerCard.addEventListener("click", () => {
              const appetizersJson = {
                name: appetizer.name,
                price: appetizer.price,
                description: appetizer.description,
                available: appetizer.available,
              };
              console.log(appetizer.id);
              fetch(`/Tickets/${currentTicketId}/addItem/appetizer`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(appetizersJson),
              })
                .then((res) => res.json())
                .then((returnedAppetizer) => {
                  const ticketAppetizerCard = document.createElement("div");
                  ticketAppetizerCard.className = "cards";
                  ticketAppetizerCard.innerText = appetizer.name + " " + appetizer.price;
                  ///
                  const deleteButton = document.createElement("button");
                  deleteButton.innerText = "Remove";
                  deleteButton.addEventListener("click", () => {
                    fetch(`/Floor/deleteSingleAppetizer/${returnedAppetizer.id}`, {
                      method: "DELETE"
                    })
                    ticketAppetizerCard.remove();
                    showTotal(currentTicketId);
                  });
                  ticketAppetizerCard.appendChild(deleteButton);
                  terminal.appendChild(ticketAppetizerCard);
                  showTotal(currentTicketId);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
    });

    ////  DESSERTS    ////

    dessertButton.addEventListener("click", () => {

      clearChildren(individualItems);
      fetch("/Floor/Desserts")
        .then((res) => res.json())
        .then((dessertJson) => {
          dessertJson.forEach((dessert) => {
            console.log(dessert);

            const dessertCard = document.createElement("div");
            dessertCard.className = "cards";
            dessertCard.innerText = dessert.name + " " + dessert.price;
            individualItems.appendChild(dessertCard);

            dessertCard.addEventListener("click", () => {
              const dessertJson = {
                name: dessert.name,
                price: dessert.price,
                showOnMenu: false,
                description: dessert.description,
                available: true,
              };
              console.log(dessert.id);
              fetch(`/Tickets/${currentTicketId}/addItem/dessert`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(dessertJson),

              })
                .then((res) => res.json())
                .then((returnedDessert) => {
                  const ticketDessertCard = document.createElement("div");
                  ticketDessertCard.className = "cards";
                  ticketDessertCard.innerText = dessert.name + " " + dessert.price;
                  ///
                  const deleteButton = document.createElement("button");
                  deleteButton.innerText = "Remove";
                  deleteButton.addEventListener("click", () => {
                    fetch(`/Floor/deleteSingleDessert/${returnedDessert.id}`, {
                      method: "DELETE"
                    })
                    ticketDessertCard.remove();
                    showTotal(currentTicketId);
                  });
                  ticketDessertCard.appendChild(deleteButton);                  
                  terminal.appendChild(ticketDessertCard);
                  showTotal(currentTicketId);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
    });


    ///   SIDES   ////
    sideButton.addEventListener("click", () => {
      clearChildren(individualItems);
      fetch("/Floor/Sides")
        .then((res) => res.json())
        .then((sideJson) => {
          sideJson.forEach((side) => {
            console.log(side);

            const sideCard = document.createElement("div");
            sideCard.className = "cards";
            sideCard.innerText = side.name + " " + side.price;
            individualItems.appendChild(sideCard);

            sideCard.addEventListener("click", () => {
              const sideJson = {
                name: side.name,
                price: side.price,
                description: side.description,
                available: side.available,
              };
              console.log(side.id);
              fetch(`/Tickets/${currentTicketId}/addItem/side`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(sideJson),

              })
                .then((res) => res.json())
                .then((returnedSide) => {
                  const ticketSideCard = document.createElement("div");
                  ticketSideCard.className = "cards";
                  ticketSideCard.innerText = side.name + " " + side.price;
                  ///
                  const deleteButton = document.createElement("button");
                  deleteButton.innerText = "Remove";
                  deleteButton.addEventListener("click", () => {
                    fetch(`/Floor/deleteSingleSide/${returnedSide.id}`, {
                      method: "DELETE"
                    })
                    ticketSideCard.remove();
                    showTotal(currentTicketId);
                  });
                  ticketSideCard.appendChild(deleteButton);                  
                  terminal.appendChild(ticketSideCard);
                  showTotal(currentTicketId);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
    });

    /// NONALCOHOLIC  ////

    nonAlcholicButton.addEventListener("click", () => {
      clearChildren(individualItems);
      fetch("/Floor/NonAlcoholicDrinks")
        .then((res) => res.json())
        .then((nonAlcholicJson) => {
          nonAlcholicJson.forEach((nonAlcholic) => {
            console.log(nonAlcholicJson);

            const nonAlcholicCard = document.createElement("div");
            nonAlcholicCard.className = "cards";
            nonAlcholicCard.innerText =
              nonAlcholic.name + " " + nonAlcholic.price;
            individualItems.appendChild(nonAlcholicCard);

            nonAlcholicCard.addEventListener("click", () => {
              const nonAlcholicJson = {
                name: nonAlcholic.name,
                price: nonAlcholic.price,
                isAlcoholic: nonAlcholic.isAlcoholic,
              };
              console.log(nonAlcholic.id);
              fetch(`/Tickets/${currentTicketId}/addItem/nonAlcoholicDrink`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(nonAlcholicJson),

              })
                .then((res) => res.json())
                .then((returnedNonAlcoholic) => {
                  const ticketNonAlcoholicCard = document.createElement("div");
                  ticketNonAlcoholicCard.className = "cards";
                  ticketNonAlcoholicCard.innerText = nonAlcholic.name + " " + nonAlcholic.price;
                  ///
                  const deleteButton = document.createElement("button");
                  deleteButton.innerText = "Remove";
                  deleteButton.addEventListener("click", () => {
                    fetch(`/Floor/deleteSingleNonAlcoholicDrink/${returnedNonAlcoholic.id}`, {
                      method: "DELETE"
                    })
                    ticketNonAlcoholicCard.remove();
                    showTotal(currentTicketId);
                  });
                  ticketNonAlcoholicCard.appendChild(deleteButton);
                  terminal.appendChild(ticketNonAlcoholicCard);
                  showTotal(currentTicketId);

                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
    });

    ////  ALCOHOLIC   ////
    alcoholicButton.addEventListener("click", () => {
      clearChildren(individualItems);
      fetch("/Floor/AlcoholicDrinks")
        .then((res) => res.json())
        .then((alcholicJson) => {
          alcholicJson.forEach((alcholic) => {
            const alcholicCard = document.createElement("div");
            alcholicCard.className = "cards";
            alcholicCard.innerText = alcholic.name + " " + alcholic.price;
            individualItems.appendChild(alcholicCard);

            alcholicCard.addEventListener("click", () => {
              const alcholicJson = {
                name: alcholic.name,
                price: alcholic.price,
                isAlcoholic: alcholic.isAlcoholic,
              };
              console.log(alcholic.id);
              fetch(`/Tickets/${currentTicketId}/addItem/alcoholicDrink`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(alcholicJson),

              })
                .then((res) => res.json())
                .then((RetunedAlcoholic) => {
                  const ticketAlcoholicCard = document.createElement("div");
                  ticketAlcoholicCard.className = "cards";
                  ticketAlcoholicCard.innerText = alcholic.name + " " + alcholic.price;
                  ///
                  const deleteButton = document.createElement("button");
                  deleteButton.innerText = "Remove";
                  deleteButton.addEventListener("click", () => {
                    fetch(`/Floor/deleteSingleAlcoholicDrink/${RetunedAlcoholic.id}`, {
                      method: "DELETE"
                    })
                    ticketAlcoholicCard.remove();
                    showTotal(currentTicketId);
                  });
                  ticketAlcoholicCard.appendChild(deleteButton);            
                  terminal.appendChild(ticketAlcoholicCard);
                  showTotal(currentTicketId);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        });
    });
  }

    

function clearChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
} 
 
/// SEND TICKET BUTTON
sendFeatureButton.addEventListener("click", () => {

  fetch(`/Tickets/${currentTicketId}/saveToKitchen`);
  
  clearChildren(terminal);
  startServerProcess();  
})

///// Tab Name Modifier ////
function tabNameMod() {

}

///// Print Total Function ////
function showTotal(currentTicketId) {
  console.log("updating totals")
  fetch(`/Tickets/${currentTicketId}`)
  .then((res) => res.json())
  .then((ticket) => { 
    console.log("ticket hold")
    clearChildren(totalsBox);

    var totalTax = 0;
    var ticketTotal = 0;
    var subTotal = 0;
  
    ticket.ticketItems.forEach((item) => {
      console.log("name: " + item.name + "price: " + item.price)
      
      subTotal += item.price;
      totalTax += subTotal  * currentTaxRate ;
    })
  
    ticketTotal += subTotal + totalTax;
  
    const subtotalText = document.createElement("h3");
    /// class name?
    subtotalText.innerText = "subTotal: " + subTotal.toFixed(2);
    totalsBox.appendChild(subtotalText);
  
    const totalTaxText = document.createElement("h3");
    /// class name?
    totalTaxText.innerText = "Tax: " + totalTax.toFixed(2);
    totalsBox.appendChild(totalTaxText);
  
    const ticketTotalText = document.createElement("h3");
    /// class name?
    ticketTotalText.innerText = "Total: " + ticketTotal.toFixed(2);
    totalsBox.appendChild(ticketTotalText);
  })
}



