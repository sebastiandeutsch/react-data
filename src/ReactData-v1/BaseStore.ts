export default class BaseStore {
  models:Record<string, any>;

  constructor() {
    this.models = {};
  }

  registerModel(name:string, model:any) {
    this.models[name] = {
      klass: model,
      records: new Map()
    }
  }

  applySnapshot(snapshot:any) {
    console.log("apply snapshot");
    console.log(snapshot);

    const keys = Object.keys(snapshot);
    keys.forEach((key:string) => {
      const model = this.models[key];
      if (model) {
        const collection = snapshot[key];
        console.log("->");
        console.log(collection);
        collection.forEach((item:any) => {
          const instance = new model.klass(item);
          model.records.set(instance.id, instance);
        });
      }
    });

    console.log(this);
  }
}
