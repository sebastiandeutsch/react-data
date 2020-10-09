import { Model, prop } from '../ReactData-v1/Model';
import TodoList from './TodoList';

export default class TodoItem extends Model({
  id: prop<string>(),
  name: prop<string>("TODO"),
  done: prop<boolean>(false),
  todoList: prop<TodoList>(undefined, { relation: true })
}) {
  test() {
    return this.name;
  }

  get supername() {
    return "super " + this.name;
  }
}
