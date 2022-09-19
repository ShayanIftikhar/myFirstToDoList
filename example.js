//let inputObject = document.getElementById("taskInput");
let itemsToDoObj = document.getElementById("itemsToDo");
let submitButtonObj = document.getElementById("submitNewTask");
let completedListObj = document.getElementById("completedList");
let inCompleteListObj = document.getElementById("incompleteList");

let jokeParagraphObj = document.getElementById("jokeParagraph");

let logInButtonObj = document.getElementById("logInButton");

let signUpNameObj = document.getElementById("signUpName");
let signUpAgeObj = document.getElementById("signUpAge");
let signUpEmailObj = document.getElementById("signUpEmail");
let signUpPasswordObj = document.getElementById("signUpPassword");
let signUpButtonObj = document.getElementById("signUpSubmitButton");

let takeToSignUpBtnObj = document.getElementById("takeToSignUpBtn");

function getAllTasks(token) {
  url = "https://api-nodejs-todolist.herokuapp.com/task";
  params = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((taskData) => {
      let taskArray = taskData.data;
      taskArray.forEach((element) => {
        $("#itemsToDo").append(
          `<li id=${element._id} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                            style="background-color: #f4f6f7;">
                            <input id= box${element._id} class="form-check-input me-2" type="checkbox" value="" aria-label="..."/>
                            ${element.description}
                            <button class="btn btn-info ms-2" id="deleteButton" type="button">Delete</button>
                          </li>`
        );
        document.getElementById("box" + element._id).checked =
          element.completed;

        let checkObj = document.getElementById("box" + element._id);

        if (checkObj.checked) {
          $("#completedList")
            .append(`<li id=lower${element._id} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
            style="background-color: #f4f6f7;">
            ${element.description}
          </li>`);
        } else {
          $("#incompleteList")
            .append(`<li id=lower${element._id} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
            style="background-color: #f4f6f7;">
            ${element.description}
          </li>`);
        }
      });
    });
}

function updateTaskToCompleted(elementid) {
  url = "https://api-nodejs-todolist.herokuapp.com/task/" + elementid;

  data = {
    completed: true,
  };

  params = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenValue}`,
    },
    body: JSON.stringify(data),
  };
  fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((taskData) => {
      console.log(taskData);
      removeFromLowerList(taskData.data._id);
      addToLowerList(
        taskData.data._id,
        "#completedList",
        taskData.data.description
      );
    });
}

function updateTaskToIncomplete(elementid) {
  console.log("inside update task Incomplete function");
  url = "https://api-nodejs-todolist.herokuapp.com/task/" + elementid;

  data = {
    completed: false,
  };

  params = {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenValue}`,
    },
    body: JSON.stringify(data),
  };
  fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((taskData) => {
      console.log(taskData);
      removeFromLowerList(taskData.data._id);
      addToLowerList(
        taskData.data._id,
        "#incompleteList",
        taskData.data.description
      );
    });
}

function deleteTask(element) {
  url = "https://api-nodejs-todolist.herokuapp.com/task/" + element.id;

  params = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenValue}`,
    },

    body: JSON.stringify(data),
  };

  fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((taskData) => {
      console.log(taskData);
      removeFromLowerList(element.id);
      element.remove();
    });
}

$(document).ready(function () {
  $(document).on("click", "#submitNewTask", function (element) {
    element.preventDefault();
    console.log("inside Add Task");

    let inputObject = document.getElementById("taskInput");

    if (inputObject.value == "") {
      return;
    }

    url = "https://api-nodejs-todolist.herokuapp.com/task";

    data = {
      description: inputObject.value,
    };

    params = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(data),
    };
    fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((taskData) => {
        console.log(taskData);
        $("#itemsToDo").append(
          `<li id=${taskData.data._id} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                            style="background-color: #f4f6f7;">
                            <input id= box${taskData.data._id} class="form-check-input me-2" type="checkbox" value="" aria-label="..."/>
                            ${taskData.data.description}
                            <button class="btn btn-info ms-2" id="deleteButton" type="button">Delete</button>
                          </li>`
        );
        $("#incompleteList").append(
          `<li id=lower${taskData.data._id} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
                            style="background-color: #f4f6f7;">
                            ${taskData.data.description}
                          </li>`
        );
      });
    inputObject.value = "";
  });
});

$(document).ready(function () {
  $(document).on("click", "#logInButton", function (element) {
    console.log("inside login function");
    let emailLogInObj = document.getElementById("emailInputLogIn");
    let passwordLogInObj = document.getElementById("passwordInputLogIn");

    url = "https://api-nodejs-todolist.herokuapp.com/user/login";

    data = {
      email: emailLogInObj.value,
      password: passwordLogInObj.value,
    };

    console.log(emailLogInObj.value);
    console.log(passwordLogInObj.value);

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
        if (data === "Unable to login") {
          alert("Incorrect Username or Password");
          return;
        } else {
          tokenValue = data.token;
          console.log(data.user.name);
          $(document).ready(function () {
            $("#logInBody").empty();
            $("#logInBody").load("index.html");
          });
          getAllTasks(tokenValue);
        }
      });
    //emailLogInObj.value = "";
    //passwordLogInObj.value = "";
  });
});

$(document).ready(function () {
  $(document).on("click", "#signUpSubmitButton", function () {
    console.log("inside signup function");

    let signUpNameObj = document.getElementById("signUpName");
    let signUpAgeObj = document.getElementById("signUpAge");
    let signUpEmailObj = document.getElementById("signUpEmail");
    let signUpPasswordObj = document.getElementById("signUpPassword");

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
        tokenValue = data.token;
        $(document).ready(function () {
          $("#logInBody").empty();
          $("#logInBody").load("index.html");
        });
        getAllTasks(tokenValue);
      });
  });
});

$(document).ready(function () {
  $(document).on("click", "#logOutLink", function () {
    console.log("inside logout function");

    url = "https://api-nodejs-todolist.herokuapp.com/user/logout";

    params = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
      body: JSON.stringify(data),
    };
    fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        $(document).ready(function () {
          $("#logInBody").empty();
          $("#logInBody").load("login.html");
        });
      });
  });
});

function removeFromLowerList(selectedElementId) {
  let removeableObject = document.getElementById("lower" + selectedElementId);
  removeableObject.remove();
}

function addToLowerList(selectedElementId, addObj, taskDescription) {
  $(addObj)
    .append(`<li id=lower${selectedElementId} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
  style="background-color: #f4f6f7;">
  ${taskDescription}
</li>`);
}

$(document).ready(function () {
  $(document).on("click", "#takeToSignUpBtn", function () {
    $("#logInBody").empty();
    $("#logInBody").load("signUp.html");
  });
});

let itemsToDoArray = [];
let idValue = 1;
let tokenValue;

$(document).ready(function () {
  $(document).on("click", itemsToDoObj, function (event) {
    if (event.target.type == "checkbox" && event.target.checked) {
      updateTaskToCompleted(event.target.parentElement.id);
    } else if (event.target.type == "checkbox" && !event.target.checked) {
      updateTaskToIncomplete(event.target.parentElement.id);
    } else if (event.target.id == "deleteButton") {
      deleteTask(event.target.parentElement);
    }
  });
});
