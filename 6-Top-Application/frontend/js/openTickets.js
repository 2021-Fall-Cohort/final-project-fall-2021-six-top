const mainFloorPage = document.querySelector(".orderDiv")

function openTabsWindow() {

    const openTabsDiv = document.createElement("div")
    openTabsDiv.className = "openTabs";
    mainFloorPage.appendChild(openTabsDiv);

    const openTabsCard = document.createElement("div");
    openTabsCard.className = "openTabs"
    openTabsDiv.appendChild(openTabsCard);

    const openTabsWindowText = document.createElement("h1");
    openTabsCard.innerText = "Open Orders go here"

    const foodItemsOrderedList = document.createElement("ul")
    foodItemsOrderedList.className = "foodItemList";
    openTabsCard.appendChild(foodItemsOrderedList);
    // foodItemsOrderedList.innerText("Items ordered");

    const foodListItem = document.createElement("li");
    foodListItem.className = "foodListItem";
    foodItemsOrderedList.appendChild(foodListItem);
    foodListItem.innerText = "Burger";

    const drinkItemsOrderedList = document.createElement("ul");
    drinkItemsOrderedList.className = "drinkItemsOrderedList";
    openTabsCard.appendChild(drinkItemsOrderedList);

    const drinkListItem = document.createElement("li")
    drinkListItem.className = "drinkListItem";
    drinkItemsOrderedList.appendChild(drinkListItem);
    drinkListItem.innerText = "stupid bud light";


}

export {openTabsWindow}