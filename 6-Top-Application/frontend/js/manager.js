const mainManagerPage = document.querySelector(".mainManagementPage");

let currentTaxRate = 3.5;

buildBussinessProfileDiv();
BuildEmployeeCard();
BuildTaxSelectorCard();

function BuildEmployeeCard() {

    const employeeInfoDiv = document.createElement("div");
    employeeInfoDiv.className = "employeeInfoDiv";
    mainManagerPage.appendChild(employeeInfoDiv);

    const employeesHeader = document.createElement("h2");
    employeesHeader.innerText = "Employees";
    employeeInfoDiv.appendChild(employeesHeader);

    const employeeListDiv = document.createElement("div");
    employeeInfoDiv.appendChild(employeeListDiv);

    const employeeList = document.createElement("h3");
    employeeList.className = "employeeList";

    fetch("http://localhost:8080/Management/retrieveAllEmployees")
    .then((res) => res.json())
    .then((employeeJson) => {

        employeeJson.forEach(currentEmployee => {
            
            const employeeList = document.createElement("p");
            employeeList.innerText = "First name: " + currentEmployee.firstName + "\n" + "Last Name: " + currentEmployee.lastName + "\n" + "Job Title: " + currentEmployee.jobTitle + "\n" +"Employee ID: " + currentEmployee.id;
            employeeListDiv.appendChild(employeeList);
        });
    })

    const newEmployeeFirstNameBox = document.createElement("input");
    newEmployeeFirstNameBox.className = "newEmployeeFirstNameBox";
    newEmployeeFirstNameBox.placeholder = "First Name";
    employeeInfoDiv.appendChild(newEmployeeFirstNameBox);

    const newEmployeeLastNameBox = document.createElement("input");
    newEmployeeLastNameBox.className = "newEmployeeLastNameBox";
    newEmployeeLastNameBox.placeholder = "Last Name";
    employeeInfoDiv.appendChild(newEmployeeLastNameBox);

    var jobTitleArray = ["Server", "Cook", "Manager"];

    const jobTitleElement = document.createElement("select");
    jobTitleElement.className = "jobTitleElement"
    jobTitleElement.placeholder = "Job Title";
    employeeInfoDiv.appendChild(jobTitleElement);
    
    for (let i = 0; i < jobTitleArray.length; i++) {    
        var option = document.createElement("option");
        option.value = jobTitleArray[i];
        option.text = jobTitleArray[i];
        jobTitleElement.appendChild(option);
    }

    const newEmployeeSubmitButton = document.createElement("button")
    newEmployeeSubmitButton.className = "newEmployeeSubmitButton";
    newEmployeeSubmitButton.innerText = "Create";
    employeeInfoDiv.appendChild(newEmployeeSubmitButton);
    newEmployeeSubmitButton.addEventListener("click", () => {

        const newEmployeeJson = {

            "firstName": newEmployeeFirstNameBox.value,
            "lastName": newEmployeeLastNameBox.value,
            "jobTitle": jobTitleElement.value,
        }

        console.log(newEmployeeJson);

        fetch(`http://localhost:8080/Management/addNewEmployee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEmployeeJson)
        }) 
        .then((res) => res.json())
        .catch(err => console.error(err));
       
    })

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
    taxRateHeader.innerText = "Current Tax Rate: " + currentTaxRate.toString() + "%";
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

        fetch("http://localhost:8080/Management/retrieveCompanyProfile/1")
        .then((res) => res.json())
        .then((companyProfile) => {
            
            console.log("json: " + parseFloat(companyProfile.taxRate));

            var newTaxRate = taxInputBox.value;
            


        })
 
        
        // currentTaxRate = parseFloat(taxInputBox.value);
        console.log("post-click tax rate: " + parseFloat(companyProfile.taxRate))
        taxRateHeader.innerText = "Current Tax Rate: " + parseFloat(companyProfile.taxRate) + "%";

    })
    

}


