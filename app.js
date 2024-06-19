"use strict";

const submitButton = document.querySelector(".submit");
const todoInput = document.querySelector(".todoinput");
const todoList = document.querySelector(".todolist");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const value = todoInput.value;
  if (value === "") return;
  const html = `<li>
  <input type="radio" id="todo-1" name="todo">
  <label for="todo-1">${value}</label>
  <img class="img" src="/delete.png">
</li>`;
  todoInput.value = "";
  todoList.insertAdjacentHTML("beforeend", html);
});

todoList.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const listItem = e.target.closest("li");
    listItem.remove();
  }
});
