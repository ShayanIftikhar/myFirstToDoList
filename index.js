let inobject = document.getElementById('task');
let ulobject = document.getElementById('new-display');
let btnobject = document.getElementById('btnid');
let newulobject = document.getElementById('completed-list');
let latulobject = document.getElementById('incomplete-list');

function AddToList() {

    if (inobject.value == "") {
        return;
    }

    console.log(inobject.value);

    var l1 = newulobject.children.length;
    var l2 = latulobject.children.length;

    console.log(inobject.value);
    console.log('shayan and sibi');

    if (l1 != 0) {
        for (var i = 0; i < l1; i++) {
            if (inobject.value == newulobject.children[i].innerHTML) {
                console.log('shayan');
                alert("Task Already Entered");
                return;
            }
        }
    }

    if (l2 != 0) {
        for (var i = 0; i < l2; i++) {
            if (inobject.value == latulobject.children[i].innerHTML) {
                alert("Task Already Entered");
                return;
            }
        }
    }

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
    latulobject.appendChild(newrpElement);

    inobject.value = "";
}

function RemoveFromList(RemoveElement) {
    var y = newulobject.children.length;
    var a = latulobject.children.length;

    console.log('completed list has no items');

    for (var j = 0; j < y; j++) {
        if (RemoveElement.parentElement.children[1].innerHTML == newulobject.children[j].innerHTML) {

            newulobject.children[j].remove();
        }
    }

    for (var k = 0; k < a; k++) {
        if (RemoveElement.parentElement.children[1].innerHTML == latulobject.children[k].innerHTML) {

            latulobject.children[k].remove();
        }
    }

    RemoveElement.parentElement.remove();

}

function CompletedList(AddElement) {
    if (AddElement.checked == true) {
        let parentobject = AddElement.parentElement;
        let parainnewlist = document.createElement('li');
        parainnewlist.textContent = parentobject.children[1].innerHTML;
        newulobject.appendChild(parainnewlist);

        var z = latulobject.children.length;
        for (var i = 0; i < z; i++) {
            if (AddElement.parentElement.children[1].innerHTML == latulobject.children[i].innerHTML) {
                latulobject.children[i].remove();
            }
        }


    }

    else if (AddElement.checked == false) {
        var x = newulobject.children.length;

        for (var i = 0; i < x; i++) {
            if (AddElement.parentElement.children[1].innerHTML == newulobject.children[i].innerHTML) {
                console.log(newulobject.children[i]);
                let switchp = newulobject.children[i];
                newulobject.children[i].remove();
                latulobject.appendChild(switchp);
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

ulobject.addEventListener("click", function (event) {
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