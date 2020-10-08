import ReactDataRegistry from '../ReactDataRegistry';

export const dataTypeSymbol: unique symbol = Symbol('dataTypeSymbol')

export default class BaseModel {
  [dataTypeSymbol]: Map<string, any>;
  modelProps: object;

  constructor(_params: Record<string, any> | undefined, modelProps:object) {
    this.modelProps = modelProps;
    this[dataTypeSymbol] = new Map();
  }

  update(attributes: Record<string, any>) {
    const keys = Object.keys(this.modelProps);
    keys.forEach((key:string) => {
      const value = attributes[key];
      if (value) {
        this[dataTypeSymbol].set(key, value);

        ReactDataRegistry.addReaction("add Reaction: mass assignment" + attributes);
        ReactDataRegistry.notify();
      }
    });
  }
}
