(function() {
  const addButton = document.getElementById("add-todo");
  const hideCompleted = document.getElementById("hide-complete");
  const deleteAllCompleted = document.getElementById("remove-complete");
  const todoList = document.getElementById("todo-list");
  const todosArray = JSON.parse(window.localStorage.getItem("todoList")) || [];

  let displayCompleted = true;

  renderTodos();

  addButton.onclick = function() {
    const todoInput = document.getElementById("todo-input");
    if (todoInput.value) {
      todosArray.push(new createTodo(todoInput.value));
      updateList();
      todoInput.value = "";
    }
  };

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
    debugger;
    todosArray.forEach((todo, index) => {
      if (todo.completed) {
        deleteTodo(index);
      }
    });
    updateList();
  });

  function createTodo(todoText) {
    return {
      text: todoText,
      completed: false
    };
  }

  function renderTodos() {
    todoList.innerHTML = "";
    if (todosArray.length) {
      todosArray.forEach((todo, index) => {
        if (displayCompleted) {
          createTodoItem(todo, index);
          hideCompleted.innerText = "Hide Completed";
        } else if (!todo.completed) {
          createTodoItem(todo, index);
          hideCompleted.innerText = "Show Completed";
        }
      });
    } else {
      todoList.innerHTML = "No todos";
    }
  }

  function createTodoItem(todo, index) {
    const listItem = document.createElement("li");
    const todoSpan = document.createElement("span");
    const trashCan = document.createElement("i");

    listItem.id = index;
    listItem.classList = "todo-item";
    todoSpan.textContent = todo.text;
    if (todo.completed) {
      todoSpan.classList = "completed";
    }
    trashCan.classList = "fas fa-trash";

    listItem.appendChild(todoSpan);
    listItem.appendChild(trashCan);
    todoList.appendChild(listItem);
  }

  function deleteTodo(id) {
    todosArray.splice(id, 1);
  }

  function toggleCompleted(id) {
    todosArray[id].completed = !todosArray[id].completed;
  }

  function saveToStorage(list) {
    window.localStorage.setItem("todoList", JSON.stringify(list));
  }

  function updateList() {
    saveToStorage(todosArray);
    renderTodos();
  }
})();
