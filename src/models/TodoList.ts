import { Model, prop } from './Model';
import TodoItem from './TodoItem';

export default class TodoList extends Model({
  name: prop<string>("hans"),
  meaningOfLife: prop<number>(42),
  todos: prop<TodoItem[]>([])
}) {
  test() {
    return this.name;
  }
}
