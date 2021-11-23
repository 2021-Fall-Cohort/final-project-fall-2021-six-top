const mainFloorPage = document.querySelector(".mainFloorPage");


function openOrderWindow() {

    const orderDiv = document.createElement("div")
    orderDiv.className = "orderDiv";
    mainFloorPage.appendChild(orderDiv);

    const orderWindowCard = document.createElement("div")
    orderWindowCard.className = "orderWindow";
    orderDiv.appendChild(orderWindowCard);

    const orderWindowHeaderText = document.createElement("h1")
    orderWindowCard.innerText = "Needs fleshed out in here";
    

}

export {openOrderWindow}