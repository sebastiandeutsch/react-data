import { Model, prop } from './Model';

export default class TodoList extends Model({
  name: prop<string>("hans"),
  meaningOfLife: prop<number>(42)
}) {
  test() {
    return this.name;
  }
}
