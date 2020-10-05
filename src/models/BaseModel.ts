export const dataTypeSymbol: unique symbol = Symbol('dataTypeSymbol')

export default class BaseModel {
  [dataTypeSymbol]: Map<string, any>;
  modelProps: object;

  constructor(_params: object, modelProps:object) {
    this.modelProps = modelProps;
    this[dataTypeSymbol] = new Map();
  }
}
