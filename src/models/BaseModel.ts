export const dataTypeSymbol: unique symbol = Symbol('dataTypeSymbol')

export default class BaseModel {
  [dataTypeSymbol]: Map<string, any>;

  constructor() {
    this[dataTypeSymbol] = new Map();
  }
}
