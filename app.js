"use strict";

const submitButton = document.querySelector(".submit");
const todoInput = document.querySelector(".todoinput");
const todoList = document.querySelector(".todolist");

// Function to load data from Local Storage
function loadDataFromLocalStorage() {
  // Check if Local Storage is supported
  if (typeof localStorage === "undefined") {
    console.error("Local Storage is not supported");
    return;
  }

  // Get the data from Local Storage
  const data = localStorage.getItem("todoData");

  // If data exists, parse it and render the todo list
  if (data) {
    const todoList = JSON.parse(data);
    renderTodoList(todoList);
  }
}

// Function to render the todo list
function renderTodoList(todolist) {
  // Clear the todo container
  todoList.innerHTML = "";

  // Loop through the todo list and create list items
  todolist.forEach((todo) => {
    const html = `<li>
    <input class="form-check-input" type="radio" id="todo-1" name="todo">
    <label class="form-check-label" for="todo-1">${todo.text}</label>
    <img class="img" src="/delete.png">
    </li>`;
    todoList.insertAdjacentHTML("beforeend", html);
  });
}

// Load data from Local Storage as soon as the application loads
document.addEventListener("DOMContentLoaded", loadDataFromLocalStorage);

//submit button to add the task to the todo list
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = todoInput.value;
  if (value === "") return;
  const todolist = JSON.parse(localStorage.getItem("todoData") || "[]");
  const html = `<li>
  <input class="form-check-input" type="radio" id="todo-1" name="todo">
  <label class="form-check-label" for="todo-1">${value}</label>
  <img class="img" src="/delete.png">
</li>`;
  todoInput.value = "";
  todoList.insertAdjacentHTML("beforeend", html);
  todolist.push({ text: value });
  localStorage.setItem("todoData", JSON.stringify(todolist));
});

//to remove the element from the dom and also from the local storage
todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const listItem = e.target.closest("li");
    const todoText = listItem.querySelector("label").textContent;
    const todolist = JSON.parse(localStorage.getItem("todoData"));
    const index = todolist.findIndex((todo) => todo.text === todoText);
    if (index !== -1) {
      todolist.splice(index, 1);
      localStorage.setItem("todoData", JSON.stringify(todolist));
    }
    listItem.remove();
  }
});
