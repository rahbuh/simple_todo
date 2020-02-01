(function() {
  const addButton = document.getElementById("add-todo");
  addButton.addEventListener("click", newTodo);

  document.addEventListener("keyup", e => {
    if (e.key === "Enter") newTodo();
  });

  let todosArray = JSON.parse(window.localStorage.getItem("todoList")) || [];
  let displayCompleted = true;

  function newTodo() {
    const todoInput = document.getElementById("todo-input");

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

  function createTodoItem(todo) {
    const liElem = createLiElement(todo.id);
    liElem.appendChild(createSpanElement(todo));
    liElem.appendChild(createIconElement());
    return liElem;
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
      // const toggleList = todosArray.map(todo => {
      //   return { ...todo };
      // });

      // if (todoIndex >= 0) {
      //   toggleList[todoIndex].completed = !toggleList[todoIndex].completed;
      // }
      // updateList(toggleList);

      console.log(todoIndex);
    });

    return spanElem;
  }

  function createIconElement() {
    const iconElem = document.createElement("i");
    iconElem.classList.add("fa", "fa-trash");
    return iconElem;
  }

  function renderTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";

    if (todosArray.length) {
      todosArray.forEach(todo => {
        if (displayCompleted) {
          todoList.appendChild(createTodoItem(todo));
          // hideCompleted.innerText = "Hide Completed";
        } else if (!todo.completed) {
          todoList.appendChild(createTodoItem(todo));
          // hideCompleted.innerText = "Show Completed";
        }
      });
      if (!todoList.innerHTML) {
        todoList.innerHTML = "All todos are completed";
        // hideCompleted.innerText = "Show Completed";
      }
    } else {
      todoList.innerHTML = "No todos";
    }
  }

  function updateList(updatedTodosArr) {
    todosArray = updatedTodosArr.map(todo => {
      return { ...todo };
    });

    !todosArray.length
      ? window.localStorage.removeItem("todoList")
      : saveToStorage(todosArray);

    renderTodos();
  }

  // function deleteTodo(id) {
  //   updateList(todosArray.filter(todo => todo.id !== id));
  // }

  // function toggleCompleted(id) {
  //   const todoIndex = locateTodoItem(id);
  //   const toggleList = todosArray.map(todo => {
  //     return { ...todo };
  //   });

  //   if (todoIndex >= 0) {
  //     toggleList[todoIndex].completed = !toggleList[todoIndex].completed;
  //   }
  //   updateList(toggleList);
  // }

  function saveToStorage(list) {
    window.localStorage.setItem("todoList", JSON.stringify(list));
  }

  function locateTodoItem(id) {
    return todosArray.findIndex(todo => todo.id === id);
  }
})();

// const hideCompleted = document.getElementById("hide-complete");
// hideCompleted.addEventListener("click", () => {
//   displayCompleted = !displayCompleted;
//   renderTodos();
// });

// const deleteAllCompleted = document.getElementById("remove-complete");
// deleteAllCompleted.addEventListener("click", () => {
//   updateList(todosArray.filter(todo => !todo.completed));
// });

// function addListeners() {
//   const todoList = document.getElementById("todo-list");
//   todoList.addEventListener("click", addButtonClick);
// }

// function addButtonClick(e) {
//   const element = e.srcElement.localName;
//   const itemId = e.target.parentNode.id;

//   if (element === "i") deleteTodo(itemId);
//   if (element === "span") toggleCompleted(itemId);
// }
