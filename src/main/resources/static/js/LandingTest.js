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

const ticketNameInput = document.querySelector(".ticketNameInput");
const nameTabButton = document.querySelector(".nameTabButton");
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
      setInterval(showTotal, 1500, currentTicketId);
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
          entreeCard.className = "itemCards";
          entreeCard.innerText = entree.name;
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
                const itemName = document.createElement("pName");
                const itemPrice = document.createElement("p");
                itemName.innerText = entree.name;
                itemPrice.innerText = " $ " + entree.price;
                // ticketAlcoholicCard.innerText = alcholic.name + " " + " " + " $" + alcholic.price;
                ticketEntreeCard.appendChild(itemName);
                ticketEntreeCard.appendChild(itemPrice);
                ///
                const deleteButton = document.createElement("button");
                deleteButton.className = "removeButton"
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click", () => {
                  fetch(`/Floor/deleteSingleEntree/${returnedEntree.id}`, {
                    method: "DELETE"
                  })
                  ticketEntreeCard.remove();
                  showTotal(currentTicketId);
                });
                ticketEntreeCard.prepend(deleteButton);
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
          appetizerCard.className = "itemCards";
          appetizerCard.innerText = appetizer.name;
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
                const itemName = document.createElement("pName");
                const itemPrice = document.createElement("p");
                itemName.innerText = appetizer.name;
                itemPrice.innerText = " $ " + appetizer.price;
                // ticketAlcoholicCard.innerText = alcholic.name + " " + " " + " $" + alcholic.price;
                ticketAppetizerCard.appendChild(itemName);
                ticketAppetizerCard.appendChild(itemPrice);
                ///
                const deleteButton = document.createElement("button");
                deleteButton.className = "removeButton"
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click", () => {
                  fetch(`/Floor/deleteSingleAppetizer/${returnedAppetizer.id}`, {
                    method: "DELETE"
                  })
                  ticketAppetizerCard.remove();
                  showTotal(currentTicketId);
                });
                ticketAppetizerCard.prepend(deleteButton);
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
          dessertCard.className = "itemCards";
          dessertCard.innerText = dessert.name;
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
                const itemName = document.createElement("pName");
                const itemPrice = document.createElement("p");
                itemName.innerText = dessert.name;
                itemPrice.innerText = " $ " + dessert.price;
                // ticketAlcoholicCard.innerText = alcholic.name + " " + " " + " $" + alcholic.price;
                ticketDessertCard.appendChild(itemName);
                ticketDessertCard.appendChild(itemPrice);
                ///
                const deleteButton = document.createElement("button");
                deleteButton.className = "removeButton"
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click", () => {
                  fetch(`/Floor/deleteSingleDessert/${returnedDessert.id}`, {
                    method: "DELETE"
                  })
                  ticketDessertCard.remove();
                  showTotal(currentTicketId);
                });
                ticketDessertCard.prepend(deleteButton);
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
          sideCard.className = "itemCards";
          sideCard.innerText = side.name;
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
                const itemName = document.createElement("pName");
                const itemPrice = document.createElement("p");
                itemName.innerText = side.name;
                itemPrice.innerText = " $ " + side.price;
                // ticketAlcoholicCard.innerText = alcholic.name + " " + " " + " $" + alcholic.price;
                ticketSideCard.appendChild(itemName);
                ticketSideCard.appendChild(itemPrice);
                ///
                const deleteButton = document.createElement("button");
                deleteButton.className = "removeButton"
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click", () => {
                  fetch(`/Floor/deleteSingleSide/${returnedSide.id}`, {
                    method: "DELETE"
                  })
                  ticketSideCard.remove();
                  showTotal(currentTicketId);
                });
                ticketSideCard.prepend(deleteButton);
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
          nonAlcholicCard.className = "itemCards";
          nonAlcholicCard.innerText =
            nonAlcholic.name;
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
                const itemName = document.createElement("pName");
                const itemPrice = document.createElement("p");
                itemName.innerText = nonAlcholic.name;
                itemPrice.innerText = " $ " + nonAlcholic.price;
                // ticketAlcoholicCard.innerText = alcholic.name + " " + " " + " $" + alcholic.price;
                ticketNonAlcoholicCard.appendChild(itemName);
                ticketNonAlcoholicCard.appendChild(itemPrice);
                ///
                const deleteButton = document.createElement("button");
                deleteButton.className = "removeButton"
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click", () => {
                  fetch(`/Floor/deleteSingleNonAlcoholicDrink/${returnedNonAlcoholic.id}`, {
                    method: "DELETE"
                  })
                  ticketNonAlcoholicCard.remove();
                  showTotal(currentTicketId);
                });
                ticketNonAlcoholicCard.prepend(deleteButton);
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
          alcholicCard.className = "itemCards";
          alcholicCard.innerText = alcholic.name;
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
                const itemName = document.createElement("pName");
                const itemPrice = document.createElement("p");
                itemName.innerText = alcholic.name;
                itemPrice.innerText = " $ " + alcholic.price;
                // ticketAlcoholicCard.innerText = alcholic.name + " " + " " + " $" + alcholic.price;
                ticketAlcoholicCard.appendChild(itemName);
                ticketAlcoholicCard.appendChild(itemPrice);
                ///
                const deleteButton = document.createElement("button");
                deleteButton.className = "removeButton"
                deleteButton.innerText = "X";
                deleteButton.addEventListener("click", () => {
                  fetch(`/Floor/deleteSingleAlcoholicDrink/${RetunedAlcoholic.id}`, {
                    method: "DELETE"
                  })
                  ticketAlcoholicCard.remove();
                  showTotal(currentTicketId);
                });
                ticketAlcoholicCard.prepend(deleteButton);
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

  nameTabButton.addEventListener("click", () => {
    fetch(`/Tickets/${currentTicketId}`)
      .then((res) => res.json())
      .then((currentTicket) => {
        fetch(`/Tickets/${currentTicketId}/changeTicketName/?name=${ticketNameInput.value}`, {
          method: "PATCH"
        })
      })
  })

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
        totalTax += subTotal * currentTaxRate;
      })

      ticketTotal += subTotal + totalTax;

      const subTotalText = document.createElement("h3");
      subTotalText.className = "subTotalText";
      subTotalText.innerText = "Sub Total: " + " $" + subTotal.toFixed(2);
      totalsBox.appendChild(subTotalText);

      const totalTaxText = document.createElement("h3");
      totalTaxText.className = "totalTaxText";
      totalTaxText.innerText = "Tax: " + " $" + totalTax.toFixed(2);
      totalsBox.appendChild(totalTaxText);

      const ticketTotalText = document.createElement("h3");
      ticketTotalText.className = "ticketTotalText";
      ticketTotalText.innerText = "Total: " + " $" + ticketTotal.toFixed(2);
      totalsBox.appendChild(ticketTotalText);

    })
}




