import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import TodoItem from './models/TodoItem';
import TodoList from './models/TodoList';

const personal = new TodoList();
personal.name = "My List";
personal.priority = 1;

const todoPersonal = new TodoItem();
todoPersonal.name = "tax";
todoPersonal.todoList = personal;

personal.todos.push(todoPersonal);
console.log("personal.todos:", personal.todos);

const work = new TodoList({
  name: "Work",
  priority: 2
});

console.log(work);
console.log("work.todos:", work.todos);

const todo1 = new TodoItem();
todo1.name = "Learn TS";
todo1.todoList = work;

work.todos.push(todo1);

setTimeout(function() {
  const todo2 = new TodoItem();
  todo2.name = "Remove nasty bug";
  todo2.todoList = work;

  work.todos = [...work.todos, todo2];
}, 5000);

setTimeout(function() {
  personal.update({
    name: "Personal",
    priority: 10
  });
}, 6000);

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
