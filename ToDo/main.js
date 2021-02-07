// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoContainer = document.querySelector(".todo-container");

/// Event Listeners
//document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addToDo);
todoContainer.addEventListener("click", deleteCheck);


//////// States ////////
let breakState = false;
let completedCycles = 2;
let cycleCount = 6 - completedCycles;

//////// Section for header nav ////////
const todayDate = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date = todayDate.toLocaleDateString('en-us', options);
document.getElementById("date").innerHTML = date;


//Functions
function addToDo (event) {
  event.preventDefault();
  // Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todoNode");
  todoDiv.draggable = true;
  var uid = Math.random().toString(16).slice(2);
  todoDiv.id = uid;
  //CHECK DRAG BUTTON
  const dragButton = document.createElement("i");
  dragButton.innerHTML = '<i class="fas fa-align-justify"></i>';
  dragButton.classList.add("drag-btn");
  todoDiv.appendChild(dragButton);
  //Create div for holding todo item text
  const todoItem = document.createElement("div");
  todoItem.innerText = todoInput.value;
  todoItem.classList.add("todo-item");
  todoItem.classList.add("dragzone");
  todoDiv.appendChild(todoItem);

  //ADD TODO TO LOCALSTORAGE
  //   saveLocalTodos(todoInput.value);

  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  //Append to List
  todoContainer.appendChild(todoDiv);

  //clear ToDo input value
  todoInput.value = "";
}

function deleteCheck (event) {
  const item = event.target; //getting which is being clicked

  //Delete Todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");

    //TO DELETE ITEM IN LOCALSTORAGE
    //removeLocalTodos(todo);

    todo.addEventListener("transitionend", function (event) {
      event.preventDefault();
      todo.remove();
    });
  }
  ///Check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

var dropzone = document.getElementById("main-container");
var nodes = document.getElementsByClassName("todoNode");
var selectedNode;
var selectedNodePos = 0;

dropzone.addEventListener(
  "dragstart",
  function (event) {
    // event.preventDefault();
    selectedNode = event.target;
  },
  false
);

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  whereAmI(event.clientY);
});

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropzone.insertBefore(selectedNode, dropzone.children[selectedNodePos]);
});

function establishNodePositions () {
  for (var i = 0; i < nodes.length; i++) {
    var element = document.getElementById(nodes[i]["id"]);
    var position = element.getBoundingClientRect(); //info of the element position on the frame
    var yTop = position.top;
    var yBottom = position.bottom;
    //yCenter
    nodes[i]["yPos"] = yTop + (yBottom - yTop) / 2;
  }
}

function whereAmI (currentYPos) {
  establishNodePositions();
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i]["yPos"] < currentYPos) {
      var nodeAbove = document.getElementById(nodes[i]["id"]);
      selectedNodePos = i + 1;
    }
  }
  // for the top of the list
  if (typeof nodeAbove === "undefined") {
    selectedNodePos = 0;
  }
}
