// Display all tasks for a user
function getAllTasks(token, userName) {
  sessionStorage.setItem("Authorization", token);
  sessionStorage.setItem("Name", userName);

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
      $("#userNameLink").append(userName);
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

// Change tesk status to complete
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

// Change task status to incomplete
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
      removeFromLowerList(taskData.data._id);
      addToLowerList(
        taskData.data._id,
        "#incompleteList",
        taskData.data.description
      );
    });
}

// Delete Task
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
      removeFromLowerList(element.id);
      element.remove();
    });
}

// Submit New Task
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

// Log In
$(document).ready(function () {
  $(document).on("click", "#logInButton", function (element) {
    let emailLogInObj = document.getElementById("emailInputLogIn");
    let passwordLogInObj = document.getElementById("passwordInputLogIn");

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
        if (data === "Unable to login") {
          alert("Incorrect Username or Password");
          return;
        } else {
          tokenValue = data.token;
          $("#logInBody").empty();
          $("#logInBody").load("index.html");
          getAllTasks(tokenValue, data.user.name);
        }
      });
  });
});

//Sign Up / Register
$(document).ready(function () {
  $(document).on("click", "#signUpSubmitButton", function () {
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
        tokenValue = data.token;
        $(document).ready(function () {
          $("#logInBody").empty();
          $("#logInBody").load("index.html");
        });
        getAllTasks(tokenValue);
      });
  });
});

// Log Out
$(document).ready(function () {
  $(document).on("click", "#logOutLink", function () {
    console.log("entering logout function");
    url = "https://api-nodejs-todolist.herokuapp.com/user/logout";

    params = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    fetch(url, params)
      .then((response) => {
        return response.json();
      })
      .then(() => {
        $("#logInBody").empty();
        $("#logInBody").load("login.html");
        sessionStorage.clear();
      });
  });
});

// Removing item from lower list
function removeFromLowerList(selectedElementId) {
  let removeableObject = document.getElementById("lower" + selectedElementId);
  removeableObject.remove();
}

// Adding item to lower list
function addToLowerList(selectedElementId, addObj, taskDescription) {
  $(addObj)
    .append(`<li id=lower${selectedElementId} class="list-group-item d-flex align-items-center border-0 mb-2 rounded"
  style="background-color: #f4f6f7;">
  ${taskDescription}
</li>`);
}

// Clicking on sign up / register now
$(document).ready(function () {
  $(document).on("click", "#takeToSignUpBtn", function () {
    $("#logInBody").empty();
    $("#logInBody").load("signUp.html");
  });
});

let tokenValue;

// On click functionality for checkbox checked or unchecked, and delete button
$(document).ready(function () {
  $(document).on("click", "#itemsToDo", function (event) {
    if (event.target.type == "checkbox" && event.target.checked) {
      updateTaskToCompleted(event.target.parentElement.id);
    } else if (event.target.type == "checkbox" && !event.target.checked) {
      updateTaskToIncomplete(event.target.parentElement.id);
    } else if (event.target.id == "deleteButton") {
      deleteTask(event.target.parentElement);
    }
  });
});

// If Authorization Token Already Present in Session Storage
if (sessionStorage.Authorization) {
  console.log("There is something is session storage");
  $("#logInBody").empty();
  $("#logInBody").load("index.html");
  tokenValue = sessionStorage.Authorization;
  getAllTasks(sessionStorage.Authorization, sessionStorage.Name);
}

// If  No Authorization Token Present in Session Storage
else {
  console.log("Session storage is empty");
}
