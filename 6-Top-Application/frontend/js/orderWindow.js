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

    const kitchenButtonContainer = document.createElement("div")
    kitchenButtonContainer.className = "kitchenButtonHolder"

    const sendToKitchenButon = document.createElement("button");
    sendToKitchenButon.className = "sendToKitchenButton";
    sendToKitchenButon.innerText = "Send";
    orderDiv.appendChild(kitchenButtonContainer);
    kitchenButtonContainer.appendChild(sendToKitchenButon);

    const splitTabButtonContainer = document.createElement("div");
    splitTabButtonContainer.className = "splitTabButtonHolder"

    const splitTabButton = document.createElement("button");
    splitTabButton.className = "splitTabButton";
    splitTabButton.innerText = "Split Tab";
    orderDiv.appendChild(splitTabButtonContainer);
    splitTabButtonContainer.appendChild(splitTabButton);

}

export {openOrderWindow}