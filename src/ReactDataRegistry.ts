class ReactDataRegistry {
  reactions:any[] = [];
  stack:any[] = [];
  callbacks:any[] = [];

  constructor() {
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
}

export default new ReactDataRegistry();
