(function() {
  const addTodoButton = document.getElementById("add-todo");
  addTodoButton.addEventListener("click", newTodo);

  // use enter key for adding todo
  document.addEventListener("keyup", e => {
    if (e.key === "Enter") newTodo();
  });

  let displayCompleted = true;

  const hideCompletedBtn = document.getElementById("hide-complete");
  hideCompletedBtn.addEventListener("click", () => {
    displayCompleted = !displayCompleted;
    renderTodos(getTodoList());
  });

  document.getElementById("remove-complete").addEventListener("click", () => {
    updateList(getTodoList().filter(todo => !todo.completed));
  });

  function newTodo() {
    const todoInput = document.getElementById("todo-input");
    const todoList = getTodoList();

    if (todoInput.value) {
      updateList([...todoList, new todoObject(todoInput.value)]);
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

  function createTodoItem(todo) {
    const todoItem = createLiElement(todo.id);
    todoItem.appendChild(createSpanElement(todo));
    todoItem.appendChild(createIconElement(todo.id));

    return todoItem;
  }

  function createLiElement(id) {
    const liElem = document.createElement("li");
    liElem.id = `${id}`;
    liElem.className = "todo-item";

    return liElem;
  }

  function createSpanElement({ id, text, completed }) {
    const spanElem = document.createElement("span");
    spanElem.innerText = `${text}`;
    completed
      ? spanElem.classList.add("completed")
      : spanElem.classList.remove("completed");

    spanElem.addEventListener("click", () => {
      const todoIndex = locateTodoItem(id);
      const toggleList = getTodoList().map(todo => {
        return { ...todo };
      });
      if (todoIndex >= 0) {
        toggleList[todoIndex].completed = !toggleList[todoIndex].completed;
      }
      updateList(toggleList);
    });

    return spanElem;
  }

  function createIconElement(id) {
    const iconElem = document.createElement("i");
    iconElem.classList.add("fa", "fa-trash");
    iconElem.addEventListener("click", () => {
      updateList(getTodoList().filter(todo => todo.id !== id));
    });

    return iconElem;
  }

  function updateList(updatedTodos) {
    newTodosArr = updatedTodos.map(todo => {
      return { ...todo };
    });

    !newTodosArr.length
      ? window.localStorage.removeItem("todoList")
      : saveTodoList(newTodosArr);

    renderTodos(newTodosArr);
  }

  function renderTodos(todosArray) {
    const todoListUl = document.getElementById("todo-list");
    todoListUl.innerHTML = "";

    if (todosArray.length) {
      todosArray.forEach(todo => {
        if (displayCompleted) {
          todoListUl.appendChild(createTodoItem(todo));
          hideCompletedBtn.innerText = "Hide Completed";
        } else if (!todo.completed) {
          todoListUl.appendChild(createTodoItem(todo));
          hideCompletedBtn.innerText = "Show Completed";
        }
      });
      if (!todoListUl.innerHTML) {
        todoListUl.innerHTML = "All todos are completed";
        hideCompletedBtn.innerText = "Show Completed";
      }
    } else {
      todoListUl.innerHTML = "No todos";
    }
  }

  function getTodoList() {
    return JSON.parse(window.localStorage.getItem("todoList")) || [];
  }

  function saveTodoList(list) {
    window.localStorage.setItem("todoList", JSON.stringify(list));
  }

  function locateTodoItem(id) {
    return getTodoList().findIndex(todo => todo.id === id);
  }

  renderTodos(getTodoList());
})();
