import { Model, prop } from '../ReactData-v1/Model';
import TodoItem from './TodoItem';

export default class TodoList extends Model({
  id: prop<string>(),
  name: prop<string>("hans"),
  priority: prop<number>(1),
  todos: prop<TodoItem[]>([], { relation: true })
}) {
  test() {
    return this.name;
  }
}
