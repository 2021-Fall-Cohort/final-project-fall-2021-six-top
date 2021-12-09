const mainManagerPage = document.querySelector(".mainManagementPage");
const newProducts = document.querySelector(".newProducts");

let currentTaxRate = 3.5;

buildBussinessProfileDiv();
BuildEmployeeCard();
BuildTaxSelectorCard();
buildAddProducts();

function BuildEmployeeCard() {
  const employeeInfoDiv = document.createElement("div");
  employeeInfoDiv.className = "employeeInfoDiv";
  mainManagerPage.appendChild(employeeInfoDiv);

  const employeesHeader = document.createElement("h2");
  employeesHeader.innerText = "Employees";
  employeeInfoDiv.appendChild(employeesHeader);

  const employeeListDiv = document.createElement("div");
  employeeListDiv.className = "employeeListDiv";
  employeeInfoDiv.appendChild(employeeListDiv);

  const employeeList = document.createElement("h3");
  employeeList.className = "employeeListDiv";

  fetch("http://localhost:8080/Management/retrieveAllEmployees")
    .then((res) => res.json())
    .then((employeeJson) => {
      employeeJson.forEach((currentEmployee) => {
        const employeeList = document.createElement("p");
        employeeList.className = "employeeList";
        employeeList.innerText =
          "First name: " +
          currentEmployee.firstName +
          "\n" +
          "Last Name: " +
          currentEmployee.lastName +
          "\n" +
          "Job Title: " +
          currentEmployee.jobTitle +
          "\n" +
          "Employee ID: " +
          currentEmployee.id;
        employeeListDiv.appendChild(employeeList);
      });
    });

  const newEmployeeBox = document.createElement("div");
  newEmployeeBox.className = "newEmployeeBox";
  newEmployeeBox.innerText = "Assign new Employee";
  employeeInfoDiv.prepend(newEmployeeBox);

  const newEmployeeFirstNameBox = document.createElement("input");
  newEmployeeFirstNameBox.className = "newEmployeeFirstNameBox";
  newEmployeeFirstNameBox.placeholder = "First Name";
  newEmployeeBox.appendChild(newEmployeeFirstNameBox);

  const newEmployeeLastNameBox = document.createElement("input");
  newEmployeeLastNameBox.className = "newEmployeeLastNameBox";
  newEmployeeLastNameBox.placeholder = "Last Name";
  newEmployeeBox.appendChild(newEmployeeLastNameBox);

  var jobTitleArray = ["Server", "Cook", "Manager"];

  const jobTitleElement = document.createElement("select");
  jobTitleElement.className = "jobTitleElement";
  jobTitleElement.placeholder = "Job Title";
  newEmployeeBox.appendChild(jobTitleElement);

  for (let i = 0; i < jobTitleArray.length; i++) {
    var option = document.createElement("option");
    option.value = jobTitleArray[i];
    option.text = jobTitleArray[i];
    jobTitleElement.appendChild(option);
  }

  const newEmployeeSubmitButton = document.createElement("button");
  newEmployeeSubmitButton.className = "newEmployeeSubmitButton";
  newEmployeeSubmitButton.innerText = "Create";
  newEmployeeBox.appendChild(newEmployeeSubmitButton);
  employeeInfoDiv.prepend(newEmployeeBox);
  newEmployeeSubmitButton.addEventListener("click", () => {
    const newEmployeeJson = {
      firstName: newEmployeeFirstNameBox.value,
      lastName: newEmployeeLastNameBox.value,
      jobTitle: jobTitleElement.value,
    };

    console.log(newEmployeeJson);

    fetch(`http://localhost:8080/Management/addNewEmployee`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployeeJson),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  });
}

function buildBussinessProfileDiv() {
  const bussinessProfileDiv = document.createElement("div");
  bussinessProfileDiv.className = "bussinessProfileDiv";
  mainManagerPage.appendChild(bussinessProfileDiv);
}

function BuildTaxSelectorCard() {
  const taxSelectorCard = document.createElement("div");
  taxSelectorCard.className = "taxSelectorCard";
  mainManagerPage.appendChild(taxSelectorCard);

  const taxRateHeader = document.createElement("h2");
  taxRateHeader.className = "TaxRateHeader";
  taxRateHeader.innerText =
    "Current Tax Rate: " + currentTaxRate.toString() + "%";
  taxSelectorCard.appendChild(taxRateHeader);

  const taxSelectorCardLable = document.createElement("h3");
  taxSelectorCardLable.innerText = "Change Tax Rate: ";
  taxSelectorCard.appendChild(taxSelectorCardLable);

  const taxInputBox = document.createElement("input");
  taxInputBox.className = "taxInputBox";
  taxInputBox.placeholder = "State Sales-Tax Rate";
  taxSelectorCard.appendChild(taxInputBox);

  const taxRateSelectorButton = document.createElement("button");
  taxRateSelectorButton.className = "taxRateSelectorButton";
  taxRateSelectorButton.innerText = "Submit New Tax Rate";
  taxSelectorCard.appendChild(taxRateSelectorButton);

  taxRateSelectorButton.addEventListener("click", () => {
    fetch("http://localhost:8080/Management/changeTaxRate/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "text/plain",
      },
      body: taxInputBox.value, // remember this...
    })
      .then((res) => res.json())
      .then((companyProfile) => {
        console.log("pre change json: " + parseFloat(companyProfile.taxRate));
        currentTaxRate = parseFloat(taxInputBox.value);
        taxRateHeader.innerText =
          "Current Tax Rate: " + parseFloat(companyProfile.taxRate) + "%";

        console.log(companyProfile.taxRate);
      })
      .catch((err) => console.error(err));
  });
}

function buildAddProducts() {
  const productsDiv = document.createElement("div");
  productsDiv.className = "productsDiv";
  newProducts.appendChild(productsDiv);

  const itemCategoryBox = document.createElement("select");
  productsDiv.appendChild(itemCategoryBox);

  var newProductsCategoriesArray = [
    "Starter",
    "Entree",
    "Side",
    "Dessert",
    "NonAlcoholic",
    "Alcoholic",
  ];

  for (let i = 0; i < newProductsCategoriesArray.length; i++) {
    var option = document.createElement("option");
    option.value = newProductsCategoriesArray[i];
    option.text = newProductsCategoriesArray[i];
    itemCategoryBox.appendChild(option);
  }

  const itemNameBox = document.createElement("input");
  productsDiv.appendChild(itemNameBox);
  itemNameBox.placeholder = "Item Name";

  const itemPriceBox = document.createElement("input");
  productsDiv.appendChild(itemPriceBox);
  itemPriceBox.placeholder = "Item Price";

  const addItemButton = document.createElement("button");
  productsDiv.appendChild(addItemButton);
  addItemButton.innerText = "Add Inventory";
  console.log(addItemButton);
  addItemButton.addEventListener("click", () => {
    let inputJson = {};
    let endPointName = "";
    if (itemCategoryBox.selectedIndex == 0) {
      endPointName = "/Management/addCreateNewAppetizer/";
      inputJson = {
        name: itemNameBox.value,
        price: itemPriceBox.value,
        showOnMenu: true,
        description: "",
        available: true,
      };
    }
    else if(itemCategoryBox.selectedIndex == 1) {
        endPointName = "/Management/addCreateNewEntree/";
        inputJson = {
            name: itemNameBox.value,
            price: itemPriceBox.value,
            showOnMenu: true,
            description: "",
            available: true,
            modifiers: null
        };
    }
    else if(itemCategoryBox.selectedIndex == 2) {
        endPointName = "/Management/addCreateNewSide/"
        inputJson = {
            name: itemNameBox.value,
            price: itemPriceBox.value,
            showOnMenu: true,
            description: "",
            available: true,
            modifiers: null
          };
    }
    else if(itemCategoryBox.selectedIndex == 3) {
        endPointName = "/Management/addCreateNewDessert/"
        inputJson = {
            name: itemNameBox.value,
            price: itemPriceBox.value,
            showOnMenu: true,
            description: "",
            available: true,
            modifiers: null
          };
    }
    else if(itemCategoryBox.selectedIndex == 4) {
        endPointName = "/Management/addCreateNewNonAlcoholicDrink/"
        inputJson = {
            name: itemNameBox.value,
            price: itemPriceBox.value,
            showOnMenu: true,
            description: "",
            available: true,
            modifiers: null
          };
    }
    else if(itemCategoryBox.selectedIndex == 5) {
        endPointName = "/Management/addCreateNewAlcoholicDrink/"
        inputJson = {
            name: itemNameBox.value,
            price: itemPriceBox.value,
            showOnMenu: true,
            description: "",
            available: true,
            modifiers: null
          };
    }
    fetch(endPointName, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputJson),
    })
      .then(() => {
        itemNameBox.value = "";
        itemPriceBox.value = "";
      })
      .catch((err) => console.error(err));
  });
}
  // addItemButton.addEventListener("click", () => {
  //     const sideJSON = {
  //         "name": itemNameBox.value,
  //         "price":itemPriceBox.value,
  //         "showOnMenu":true,
  //         "description":"",
  //         "available":true
  //     }
  //     console.log("Json made")
  //         fetch("/Management/addCreateNewSide/", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify(sideJSON),
  //     })
  //     .then(() => {
  //         itemNameBox.value = ""
  //         itemPriceBox.value = ""
  //         console.log("Json sent 1");
  //     })
  //     .catch((err) => console.error(err))
  //     console.log("Json sent 2");
  // })

