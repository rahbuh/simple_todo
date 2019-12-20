(function() {
  const addButton = document.getElementById("add-todo");
  const hideCompleted = document.getElementById("hide-complete");
  const deleteAllCompleted = document.getElementById("remove-complete");
  const todoList = document.getElementById("todo-list");
  const todoInput = document.getElementById("todo-input");
  let todosArray = JSON.parse(window.localStorage.getItem("todoList")) || [];
  let displayCompleted = true;

  function init() {
    addListeners();
    renderTodos();
    todoInput.focus();
  }

  function addListeners() {
    document.addEventListener("keyup", enterKeyPress);
    todoList.addEventListener("click", addButtonClick);
    addButton.addEventListener("click", newTodo);
    hideCompleted.addEventListener("click", hideCompletedAction);
    deleteAllCompleted.addEventListener("click", deleteAllAction);
  }

  function enterKeyPress(e) {
    if (e.key === "Enter") newTodo();
  }

  function addButtonClick(e) {
    const element = e.srcElement.localName;
    const itemId = e.target.parentNode.id;

    if (element === "i") deleteTodo(itemId);
    if (element === "span") toggleCompleted(itemId);
  }

  function hideCompletedAction() {
    displayCompleted = !displayCompleted;
    renderTodos();
  }

  function deleteAllAction() {
    updateList(todosArray.filter(todo => !todo.completed));
  }

  function newTodo() {
    if (todoInput.value) {
      updateList([...todosArray, new todoObject(todoInput.value)]);
      todoInput.value = "";
      todoInput.focus();
    }
  }

  function todoObject(todoText) {
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
      if (!todoList.innerHTML) {
        todoList.innerHTML = "All todos are completed";
        hideCompleted.innerText = "Show Completed";
      }
    } else {
      todoList.innerHTML = "No todos";
    }
  }

  function createTodoItem(todo) {
    const listItem = document.createElement("li");
    const todoSpan = document.createElement("span");
    const deleteTodoIcon = document.createElement("i");

    listItem.id = todo.id;
    listItem.classList = "todo-item";
    todoSpan.textContent = todo.text;
    deleteTodoIcon.classList = "fas fa-trash";

    if (todo.completed) todoSpan.classList = "completed";

    listItem.appendChild(todoSpan);
    listItem.appendChild(deleteTodoIcon);
    todoList.appendChild(listItem);
  }

  function updateList(updatedTodos) {
    todosArray = [...updatedTodos];
    saveToStorage(todosArray);
    renderTodos(todosArray);
  }

  function deleteTodo(id) {
    updateList(todosArray.filter(todo => todo.id !== id));
  }

  function toggleCompleted(id) {
    const todoIndex = locateTodoItem(id);
    const toggleList = [...todosArray];

    if (todoIndex >= 0) {
      toggleList[todoIndex].completed = !toggleList[todoIndex].completed;
    }
    updateList(toggleList);
  }

  function saveToStorage(list) {
    window.localStorage.setItem("todoList", JSON.stringify(list));
  }

  function locateTodoItem(id) {
    return todosArray.findIndex(todo => todo.id === id);
  }

  init();
})();
