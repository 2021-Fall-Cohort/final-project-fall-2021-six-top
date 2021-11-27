const mainManagerPage = document.querySelector(".mainManagementPage");

///test
buildEmployeeData();
createNewEmployee();




function buildEmployeeData() {

    const employeeList = document.createElement("h3");
    employeeList.className = "employeeList";

    fetch("http://localhost:8080/Management/retrieveAllEmployees")
    .then((res) => res.json())
    .then((employeeJson) => {

        employeeJson.forEach(currentEmployee => {
            
            const employeeList = document.createElement("p");
            employeeList.innerText = "First name: " + currentEmployee.firstName + "\n" + "Last Name: " + currentEmployee.lastName + "\n" + "Job Title: " + currentEmployee.jobTitle + "\n" +"Employee ID: " + currentEmployee.id;
            mainManagerPage.appendChild(employeeList);
        });
    })

}

function createNewEmployee() {

    const newEmployeeFirstNameBox = document.createElement("input");
    newEmployeeFirstNameBox.className = "newEmployeeFirstNameBox";
    newEmployeeFirstNameBox.placeholder = "First Name";
    mainManagerPage.appendChild(newEmployeeFirstNameBox);

    const newEmployeeLastNameBox = document.createElement("input");
    newEmployeeLastNameBox.className = "newEmployeeLastNameBox";
    newEmployeeLastNameBox.placeholder = "Last Name";

    const jobTitleElement = document.createElement("select");
    jobTitleElement.placeholder = "Job Title";
    const text = jobTitleElement.options[1].text;
    const value = jobTitleElement.options[1].value
    
    



}
