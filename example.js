let inputObject = document.getElementById("taskInput");
let itemsToDoObj = document.getElementById("itemsToDo");
let submitButtonObj = document.getElementById("submitNewTask");
let completedListObj = document.getElementById("completedList");
let inCompleteListObj = document.getElementById("incompleteList");

let jokeParagraphObj = document.getElementById("jokeParagraph");

let emailLogInObj = document.getElementById("emailInputLogIn");
let passwordLogInObj = document.getElementById("passwordInputLogIn");
let logInButtonObj = document.getElementById("logInButton");

let signUpNameObj = document.getElementById("signUpName");
let signUpAgeObj = document.getElementById("signUpAge");
let signUpEmailObj = document.getElementById("signUpEmail");
let signUpPasswordObj = document.getElementById("signUpPassword");
let signUpButtonObj = document.getElementById("signUpSubmitButton");

let takeToSignUpBtnObj = document.getElementById("takeToSignUpBtn");

/* function getData() {
  url = "https://api.chucknorris.io/jokes/random";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.value);
      jokeParagraphObj.textContent = data.value;
    });
} */

$(logInButtonObj).click(function logIn() {
  console.log("inside login");
  url = "https://api-nodejs-todolist.herokuapp.com/user/login";

  data = {
    email: emailLogInObj.value,
    password: passwordLogInObj.value,
  };

  params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data === "Unable to login") {
        alert("Incorrect Username or Password");
        return;
      } else {
        $("#logInBody").empty();
        $("#logInBody").load("index.html");
      }
    });
});

$(signUpButtonObj).click(function signUp() {
  console.log("inside signup finction");
  url = "https://api-nodejs-todolist.herokuapp.com/user/register";

  data = {
    name: signUpNameObj.value,
    email: signUpEmailObj.value,
    password: signUpPasswordObj.value,
    age: signUpAgeObj.value,
  };

  params = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
});

function addToMainList(e) {
  e.preventDefault();

  if (inputObject.value == "") {
    return;
  }

  if (itemsToDoArray.find((task) => task.taskName === inputObject.value)) {
    alert("Task Already Entered");
    return;
  }

  task = {
    taskId: idValue,
    taskName: inputObject.value,
    taskStatus: false,
  };

  itemsToDoArray.push(task);

  $("#itemsToDo").append(
    `<li id=${idValue} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      <input class="form-check-input me-2" type="checkbox" value="" aria-label="..."/>
                      ${task.taskName}
                      <button class="btn btn-info ms-2" id="deleteButton" type="button">Delete</button>
                    </li>`
  );

  $("#incompleteList").append(
    `<li id=lower${idValue} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                      style="background-color: #f4f6f7;">
                      ${task.taskName}
                    </li>`
  );

  idValue++;
  inputObject.value = "";
}

function removeFromMainList(removeElement) {
  let idOfRemoveableTask = removeElement.parentElement.id;
  let indexOfTaskToBeRemoved = itemsToDoArray.findIndex(
    (task) => task.taskId == idOfRemoveableTask
  );
  itemsToDoArray.splice(indexOfTaskToBeRemoved, 1);
  removeElement.parentElement.remove();
}

function removeFromLowerList(selectedElement) {
  let removeableObject = document.getElementById(
    "lower" + selectedElement.parentElement.id
  );
  removeableObject.remove();
}

function addToLowerList(selectedElement, status, addObj) {
  let idOfTask = selectedElement.parentElement.id;
  let taskToMove = itemsToDoArray.find((task) => task.taskId == idOfTask);
  taskToMove.taskStatus = status;
  addObj.innerHTML += `<li id=lower${idOfTask} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
  style="background-color: #f4f6f7;">
  ${taskToMove.taskName}
</li>`;
}

$(takeToSignUpBtnObj).click(function goToSignUpPage() {
  $("#logInBody").empty();
  $("#logInBody").load("signUp.html");
});

let itemsToDoArray = [];
let idValue = 1;

submitButtonObj.addEventListener("click", addToMainList);

itemsToDoObj.addEventListener("click", function (event) {
  if (event.target.id == "deleteButton") {
    removeFromLowerList(event.target);
    removeFromMainList(event.target);
  } else if (event.target.tagName == "INPUT" && event.target.checked) {
    removeFromLowerList(event.target);
    addToLowerList(event.target, true, completedListObj);
  } else if (event.target.tagName == "INPUT" && !event.target.checked) {
    removeFromLowerList(event.target);
    addToLowerList(event.target, false, inCompleteListObj);
  }
});
