import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import TodoItem from './models/TodoItem';
import TodoList from './models/TodoList';

const personal = new TodoList();
personal.name = "Personal";
personal.meaningOfLife = 303;

const todoPersonal = new TodoItem();
todoPersonal.name = "tax";
todoPersonal.todoList = personal;

personal.todos.push(todoPersonal);
console.log("personal.todos:", personal.todos);

const work = new TodoList();
work.name = "Work";

console.log(work);
console.log("work.todos:", work.todos);

const todo1 = new TodoItem();
todo1.name = "Learn TS";
todo1.todoList = work;

work.todos.push(todo1);
console.log(todo1);
console.log(todo1.supername);

const todo2 = new TodoItem();
todo2.name = "Remove nasty bug";
todo2.todoList = work;

work.todos.push(todo2);

console.log(personal);
console.log("personal.name:", personal.name);
console.log("personal.meaningOfLife:", personal.meaningOfLife);

const store = {
  todoLists: [
    personal,
    work
  ]
}

ReactDOM.render(
  <App store={store} />,
  document.getElementById('react-app-container')
);

console.log(store);
