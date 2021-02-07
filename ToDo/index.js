// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
// const todoList = document.querySelector(".todo-list");

const todoContainer = document.querySelector(".todo-container");

/// Event Listeners
//document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addToDo);
// todoList.addEventListener("click", deleteCheck);

todoContainer.addEventListener("click", deleteCheck);

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
  //Create LI
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
  // todoList.appendChild(todoDiv);
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
    // store a ref. on the dragged elem
    selectedNode = event.target;
    // console.log(typeof dragged);
    // console.log("This is the id " + event.target.id);
    // make it half transparent
    // event.target.style.opacity = 0.5;
  },
  false
);

dropzone.addEventListener("dragover", (event) => {
  event.preventDefault();
  whereAmI(event.clientY);
});

dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  // console.log(typeof selectedNode);
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
