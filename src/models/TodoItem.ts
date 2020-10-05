import { Model, prop } from './Model';

import TodoList from './TodoList';

export default class TodoItem extends Model({
  name: prop<string>("TODO"),
  done: prop<boolean>(false),
  todoList: prop<TodoList>()
}) {
  test() {
    return this.name;
  }

  get supername() {
    return "super " + this.name;
  }
}
