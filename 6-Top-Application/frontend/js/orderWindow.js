const mainFloorPage = document.querySelector(".mainFloorPage");

// Open orders neeed to go below new ticket 
// 

function openOrderWindow() {

    const orderDiv = document.createElement("div")
    orderDiv.className = "orderDiv";
    mainFloorPage.appendChild(orderDiv);

    const orderWindowCard = document.createElement("div")
    orderWindowCard.className = "orderWindow";
    orderDiv.appendChild(orderWindowCard);

    const orderWindowHeaderText = document.createElement("h1")
    orderWindowCard.innerText = "New Order Window, needs orders";
    // Generated ID in top left corner to specify order number

    const kitchenButtonContainer = document.createElement("div")
    kitchenButtonContainer.className = "kitchenButtonHolder"

    const sendToKitchenButon = document.createElement("button");
    sendToKitchenButon.className = "sendToKitchenButton";
    sendToKitchenButon.innerText = "Send";
    orderDiv.appendChild(kitchenButtonContainer);
    kitchenButtonContainer.appendChild(sendToKitchenButon);

    const splitTabButton = document.createElement("button");
    splitTabButton.className = "splitTabButton";
    splitTabButton.innerText = "Split Tab";
    // split tab should go per order card per table


    orderDiv.appendChild(kitchenButtonContainer);
    kitchenButtonContainer.appendChild(splitTabButton);

  

}

export {openOrderWindow}