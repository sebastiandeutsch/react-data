class ReactDataRegistry {
  reactions:any[] = [];
  stack:any[] = [];
  callbacks:any[] = [];

  constructor() {
    console.log("Hi ReactDataRegistry");
  }

  addReaction(r:any) {
    console.log(r);
    this.reactions.push(r);
  }

  addToStack(f:any) {
    this.stack.push(f);
  }

  subscribe(callback:any) {
    this.callbacks.push(callback);
  }

  notify() {
    console.log("notifiing", this.callbacks);
    this.callbacks.forEach((callback) => {
      callback();
    })
  }
}

export default new ReactDataRegistry();
