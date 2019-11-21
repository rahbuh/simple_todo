(function() {
  const addButton = document.getElementById("add-todo");
  const hideCompleted = document.getElementById("hide-complete");
  const deleteAllCompleted = document.getElementById("remove-complete");
  const todoList = document.getElementById("todo-list");
  let todosArray = JSON.parse(window.localStorage.getItem("todoList")) || [];

  let displayCompleted = true;

  addButton.addEventListener("click", newTodo);
  
  todoList.addEventListener("click", e => {
    const element = e.srcElement.localName;
    const itemId = e.target.parentNode.id;
    
    if (element === "i") {
      deleteTodo(itemId);
      updateList();
    }
    if (element === "span") {
      toggleCompleted(itemId);
      updateList();
    }
  });
  
  hideCompleted.addEventListener("click", () => {
    displayCompleted = !displayCompleted;
    renderTodos();
  });
  
  deleteAllCompleted.addEventListener("click", () => {
    const filteredList = todosArray.filter(todo => !todo.completed)
    todosArray = [...filteredList]
    updateList();
  });
  
  renderTodos();

  function newTodo() {
    const todoInput = document.getElementById("todo-input");
    if (todoInput.value) {
      todosArray.push(new createTodo(todoInput.value));
      updateList();
      todoInput.value = "";
    }
  }

  function createTodo(todoText) {
    return {
      id: String(Date.now()),
      text: todoText,
      completed: false
    };
  }

  function renderTodos() {
    todoList.innerHTML = "";
    if (todosArray.length) {
      todosArray.forEach(todo => {
        if (displayCompleted) {
          createTodoItem(todo);
          hideCompleted.innerText = "Hide Completed";
        } else if (!todo.completed) {
          createTodoItem(todo);
          hideCompleted.innerText = "Show Completed";
        }
      });
    } else {
      todoList.innerHTML = "No todos";
    }
  }

  function createTodoItem(todo) {
    const listItem = document.createElement("li");
    const todoSpan = document.createElement("span");
    const trashCan = document.createElement("i");

    listItem.id = todo.id;
    listItem.classList = "todo-item";
    todoSpan.textContent = todo.text;
    trashCan.classList = "fas fa-trash";

    if (todo.completed) {
      todoSpan.classList = "completed";
    }

    listItem.appendChild(todoSpan);
    listItem.appendChild(trashCan);
    todoList.appendChild(listItem);
  }

  function deleteTodo(id) {
    todosArray.splice(id, 1);
  }

  function toggleCompleted(id) {
    const todoIndex = locateTodoItem(id);
    if (todoIndex >= 0) {
      todosArray[todoIndex].completed = !todosArray[todoIndex].completed;
    }
  }

  function saveToStorage(list) {
    window.localStorage.setItem("todoList", JSON.stringify(list));
  }

  function updateList() {
    saveToStorage(todosArray);
    renderTodos();
  }

  function locateTodoItem(id) {
    return todosArray.findIndex(todo => todo.id === id);
  }
})();
