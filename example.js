let inputObject = document.getElementById('taskInput');     
let itemsToDoObj = document.getElementById('itemsToDo');   
let submitButtonObj = document.getElementById('submitNewTask');  
let completedListObj = document.getElementById('completedList');
let inCompleteListObj = document.getElementById('incompleteList');

function addToMainList() {
   if (inputObject.value == "") {
        return;
    }

    if (itemsToDoArray.find((task) => task.taskName === inputObject.value))
    {
        alert('Task Already Entered');
        return;
    }

    task = {taskId : idValue, taskName : inputObject.value, taskStatus : 'incomplete'};
    itemsToDoArray.push(task);
    
    itemsToDoObj.innerHTML +=`<li id=${idValue}> <input type=checkbox> <p>${task.taskName}</p> <span>&cross;</span> </li>`;
     
   
    /* let newListItemObject = document.createElement('li');

    let newCheckBoxObject = document.createElement('input');
    newCheckBoxObject.type = "checkbox";
    newCheckBoxObject.id = "checkid";

    let newParagrahpObject = document.createElement('p');
    newParagrahpObject.textContent = task.taskName;

    let newCrossObject = document.createElement('span');
    newCrossObject.innerHTML = "&cross;";

    newListItemObject.appendChild(newCheckBoxObject);
    newListItemObject.appendChild(newParagrahpObject);
    newListItemObject.appendChild(newCrossObject);
    itemsToDoObj.appendChild(newListItemObject);

    itemsToDoObj.lastChild.id = idValue;
    itemsToDoObj.lastChild.children[1].textContent = task.taskName; */
    
    inCompleteListObj.innerHTML +=`<li id=lower${idValue}>${task.taskName}</li>`;
    idValue ++;
    inputObject.value = "";
}

function removeFromMainList(removeElement) {
   let idOfRemoveableTask = removeElement.parentElement.id;
   let indexOfTaskToBeRemoved = itemsToDoArray.findIndex((task) => task.taskId == idOfRemoveableTask);
   itemsToDoArray.splice(indexOfTaskToBeRemoved,1);
   removeElement.parentElement.remove();
}

function removeFromLowerList(selectedElement)    
{
    let removeableObject = document.getElementById('lower'+selectedElement.parentElement.id);
    removeableObject.remove();
}

function addToLowerList(selectedElement, status, addObj){
    let idOfTask = selectedElement.parentElement.id;
    let taskToMove = itemsToDoArray.find((task) => task.taskId == idOfTask);
    taskToMove.taskStatus = status;
    addObj.innerHTML += `<li id=lower${idOfTask}>${taskToMove.taskName}</li>`;
}

let itemsToDoArray = [];
let idValue = 1;

submitButtonObj.addEventListener("click", addToMainList);

 itemsToDoObj.addEventListener("click", function (event) {   //use ids of checkbox, cross
    if (event.target.tagName == "SPAN") {
        removeFromLowerList(event.target);
        removeFromMainList(event.target);
    } 

    else if (event.target.tagName == "INPUT" && event.target.checked) {
        removeFromLowerList(event.target);
        addToLowerList(event.target, 'Complete', completedListObj);
    }

    else if (event.target.tagName == "INPUT" && !event.target.checked) {
        removeFromLowerList(event.target);
        addToLowerList(event.target, 'incomplete', inCompleteListObj);
    }
})