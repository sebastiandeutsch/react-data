import MiniORM from './MiniORM';

class ReactDataRegistry {
  reactions:any[] = [];
  stack:any[] = [];
  callbacks:any[] = [];
  stores:Map<any, any> = new Map();

  constructor() {
  }

  getStore() {
    const store:any = {};

    for (var key of this.stores.keys()) {
      store[key] = new MiniORM(this.stores.get(key));
    }

    return store;
  }

  addReaction(r:any) {
    this.reactions.push(r);
  }

  addToStack(f:any) {
    this.stack.push(f);
  }

  subscribe(callback:any) {
    this.callbacks.push(callback);
  }

  notify() {
    this.callbacks.forEach((callback) => {
      callback();
    })
  }

  addToStore(model:any, instance:any) {
    let store = this.stores.get(model);
    if (!store) {
      store = new Map();
      this.stores.set(model, store);
    }
    store.set(instance.id, instance);
  }
}

export default new ReactDataRegistry();
