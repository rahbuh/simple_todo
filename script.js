(function() {
  const addButton = document.getElementById("add-todo");
  const todoList = document.getElementById("todo-list");
  const todosArray = JSON.parse(window.localStorage.getItem("todoList")) || [];

  renderTodos();

  addButton.onclick = function() {
    const todoInput = document.getElementById("todo-input");
    if (todoInput.value) {
      todosArray.push(new createTodo(todoInput.value));
      saveToStorage(todosArray);
      renderTodos();
      todoInput.value = "";
    }
  };

  todoList.addEventListener("click", e => {
    const element = e.srcElement.localName;
    const itemId = e.target.parentNode.id;

    if (element === "i") {
      deleteTodo(itemId);
    }
    if (element === "span") {
      toggleCompleted(itemId);
    }
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
        createTodoItem(todo, index);
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
    saveToStorage(todosArray);
    renderTodos();
  }

  function toggleCompleted(id) {
    todosArray[id].completed = !todosArray[id].completed;
    saveToStorage(todosArray);
    renderTodos();
  }

  function saveToStorage(list) {
    window.localStorage.setItem("todoList", JSON.stringify(list));
  }
})();
