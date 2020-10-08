import { Model, prop } from './Model';
import TodoItem from './TodoItem';

export default class TodoList extends Model({
  name: prop<string>("hans"),
  priority: prop<number>(1),
  todos: prop<TodoItem[]>([])
}) {
  test() {
    return this.name;
  }
}
