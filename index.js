let inobject = document.getElementById('task');     //inObject (camel casing)
let ulobject = document.getElementById('new-display');   //use better names like completed list
let btnobject = document.getElementById('btnid');  // use descriptive names instead
let completedListObj = document.getElementById('completed-list');
let inCompleteListObj = document.getElementById('incomplete-list');

function AddToList() {

    if (inobject.value == "") {
        return;
    }

    console.log(inobject.value);

    var l1 = completedListObj.children.length;
    var l2 = inCompleteListObj.children.length;

    console.log(inobject.value);
    console.log('shayan and sibi');
    console.log('shayan and sibi 2');

    //Move small functionalities into different functions
    if (l1) {   //used l1 instead of l1!=0
        for (var i = 0; i < l1; i++) {   //use for each
            if (inobject.value == completedListObj.children[i].innerHTML) {
                console.log('shayan');
                alert("Task Already Entered");
                return;
            }
        }
    }

    if (l2) {
        for (var i = 0; i < l2; i++) {
            if (inobject.value == inCompleteListObj.children[i].innerHTML) {
                alert("Task Already Entered");
                return;
            }
        }
    }

    //use single html for all elements (add html block through JS)
    let newliElement = document.createElement('li');

    let newinElement = document.createElement('input');
    newinElement.type = "checkbox";

    let newpElement = document.createElement('p');
    newpElement.textContent = inobject.value;

    let newrElement = document.createElement('span');
    newrElement.innerHTML = "&cross;";

    newliElement.appendChild(newinElement);
    newliElement.appendChild(newpElement);
    newliElement.appendChild(newrElement);
    ulobject.appendChild(newliElement);

    let newrpElement = document.createElement('li');
    newrpElement.textContent = inobject.value;
    inCompleteListObj.appendChild(newrpElement);

    inobject.value = "";
}

function RemoveFromList(RemoveElement) {
    var y = completedListObj.children.length;
    var a = inCompleteListObj.children.length;

    console.log('completed list has no items');

    for (var j = 0; j < y; j++) {   //use dynamic id on list items to remove tasks
        if (RemoveElement.parentElement.children[1].innerHTML == completedListObj.children[j].innerHTML) {

            completedListObj.children[j].remove();
        }
    }

    for (var k = 0; k < a; k++) {
        if (RemoveElement.parentElement.children[1].innerHTML == inCompleteListObj.children[k].innerHTML) {

            inCompleteListObj.children[k].remove();
        }
    }

    RemoveElement.parentElement.remove();

}

function CompletedList(AddElement) {
    if (AddElement.checked == true) {   //no need to write == true
        let parentobject = AddElement.parentElement;
        let parainnewlist = document.createElement('li');
        parainnewlist.textContent = parentobject.children[1].innerHTML;
        completedListObj.appendChild(parainnewlist);

        var z = inCompleteListObj.children.length;
        for (var i = 0; i < z; i++) {
            if (AddElement.parentElement.children[1].innerHTML == inCompleteListObj.children[i].innerHTML) {
                inCompleteListObj.children[i].remove();
            }
        }


    }

    else if (AddElement.checked == false) {   // use !AdddElement.checked 
        var x = completedListObj.children.length;

        for (var i = 0; i < x; i++) {
            if (AddElement.parentElement.children[1].innerHTML == completedListObj.children[i].innerHTML) {
                console.log(completedListObj.children[i]);
                let switchp = completedListObj.children[i];
                completedListObj.children[i].remove();
                inCompleteListObj.appendChild(switchp);
            }
        }
    }
}

btnobject.addEventListener("click", AddToList);

inobject.addEventListener('keydown', function (event) {

    if (event.key === 'enter') {
        event.preventDefault();
        alert('enter key pressed');
    }
});

ulobject.addEventListener("click", function (event) {   //use ids of checkbox, cross
    if (event.target.tagName == "SPAN") {
        RemoveFromList(event.target);
    }

    else if (event.target.tagName == "INPUT") {
        CompletedList(event.target);
    }

    else if (event.target.tagName == "P") {
        console.log(event.target);
    }

})