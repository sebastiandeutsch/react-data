import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import TodoItem from './models/TodoItem';
import TodoList from './models/TodoList';
import ReactDataRegistry from './ReactData-v1/ReactDataRegistry';

const personal = new TodoList();
personal.id = "1"
personal.name = "My List";
personal.priority = 1;
personal.save();

const todoPersonal = new TodoItem();
todoPersonal.id = "1"
todoPersonal.name = "tax";
todoPersonal.todoList = personal;
todoPersonal.save();

personal.todos.push(todoPersonal);
console.log("personal.todos:", personal.todos);

const work = new TodoList({
  id: "2",
  name: "Work",
  priority: 2
});
work.save();

console.log(work);
console.log("work.todos:", work.todos);

const todo1 = new TodoItem();
todo1.id = "2";
todo1.name = "Learn TS";
todo1.todoList = work;
todo1.save();

work.todos.push(todo1);

setTimeout(function() {
  const todo2 = new TodoItem();
  todo2.id = "3";
  todo2.name = "Remove nasty bug";
  todo2.todoList = work;
  todo2.save();

  work.todos = [...work.todos, todo2];
}, 5000);

setTimeout(function() {
  personal.update({
    name: "Personal",
    priority: 10
  });
}, 6000);

const store = ReactDataRegistry.getStore();
console.log(store);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('react-app-container')
);

console.log(store);
