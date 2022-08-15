let inputObject = document.getElementById("taskInput");
let itemsToDoObj = document.getElementById("itemsToDo");
let submitButtonObj = document.getElementById("submitNewTask");
let completedListObj = document.getElementById("completedList");
let inCompleteListObj = document.getElementById("incompleteList");

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
