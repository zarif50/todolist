//initially ok na dile todo dekhte parbo na
window.alert("Welcome!Add your ToDo List")
//capture user input from a text box.
const input = document.querySelector("input");
//add a new to-do item.
const addButton = document.querySelector(".add-button");
//used to display the list of to-do items.
const todosHtml = document.querySelector(".todos");
// display an image or message when there are no to-do items.
const emptyImage = document.querySelector(".empty-image");
//no todo hole empty array  basically retrive korbe  todo from local browser history
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
//delete all to-do items at once.
const deleteAllButton = document.querySelector(".delete-all");
//display the list to  different criteria complete ,imcomplete ,deleted
const filters = document.querySelectorAll(".filter");
//initially amr todo empty thakbe 
let filter = '';

showTodos();
//represent to do and index item of the to do list
function getTodoHtml(todo, index) { 
  //empty string return korbe
  if (filter && filter != todo.status) {
    return '';
  }
  let checked = todo.status == "completed" ? "checked" : "";
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `; 
}

function showTodos() {
  //json array check kore if empty compare kore length 0
  if (todosJson.length == 0) {
    todosHtml.innerHTML = '';
    //(indicating that there are no to-do items) visible. img show korbe
    emptyImage.style.display = 'block';
    // todo json implementation if array is not empty
  } else {
    //update string hobe more than one to do item
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    //hide image if there is to do
    emptyImage.style.display = 'none';
  }
}

function addTodo(todo)  {
  //initially null
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  // add hole local storage save hobe
  localStorage.setItem("todos", JSON.stringify(todosJson));
  //show todo func call hobe terpor okhane todo dekhbo
  showTodos();
}


/*box list gula add kora*/
input.addEventListener("keyup", e => {
  /* input nibo input .value call kore*/
  let todo = input.value.trim();
  console.log(todo);
  /*jodi ascii character and jodi kichu na lekhe enter dile kono todo list add hobe na*/
  if (!todo || e.key != "Enter") {
    return;
  }
  //function call korlam addtodo
  addTodo(todo);
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (!todo) {
    return;
  }
  addTodo(todo);
});

function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  showTodos();
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      filter = '';
    } else {
      filters.forEach(tag => tag.classList.remove('active'));
      el.classList.add('active');
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});
