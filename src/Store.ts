import TodoItem from './models/TodoItem';
import TodoList from './models/TodoList';
import BaseStore from './ReactData-v1/BaseStore';

class Store extends BaseStore {

}

const storeInstance = new Store();

storeInstance.registerModel('todoLists', TodoList);
storeInstance.registerModel('todoItems', TodoItem);

export default storeInstance;
