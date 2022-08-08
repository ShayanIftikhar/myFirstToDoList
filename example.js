let inputObject = document.getElementById("taskInput");
let itemsToDoObj = document.getElementById("itemsToDo");
let submitButtonObj = document.getElementById("submitNewTask");
let completedListObj = document.getElementById("completedList");
let inCompleteListObj = document.getElementById("incompleteList");

function addToMainList() {
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

  itemsToDoObj.innerHTML += `<li id=${idValue}> <input type=checkbox> <p>${task.taskName}</p> <input id="deleteButton" type="button" value="Delete Task"> </li>`;

  itemsToDoArray.forEach((task) => {
    if (task.taskStatus == true) {
      let checkedElement = document.getElementById(task.taskId);
      checkedElement.children[0].checked = true;
    }
  });

  inCompleteListObj.innerHTML += `<li id=lower${idValue}>${task.taskName}</li>`;
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
  addObj.innerHTML += `<li id=lower${idOfTask}>${taskToMove.taskName}</li>`;
}

let itemsToDoArray = [];
let idValue = 1;

submitButtonObj.addEventListener("click", addToMainList);

itemsToDoObj.addEventListener("click", function (event) {
  //use ids of checkbox, cross
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
