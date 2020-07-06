import BaseModel, { dataTypeSymbol } from './BaseModel';

export interface ModelProp<TValue, THasDefault> {
  $valueType: TValue
  $hasDefault: THasDefault
  defaultFn?: () => TValue
  defaultValue?: TValue
}

export type ModelPropsToData<MP extends ModelProps> = {
  [k in keyof MP]: MP[k]["$valueType"]
}

export interface ModelProps {
  [k: string]: ModelProp<any, any>
}

export function prop<TValue>(defaultFn: () => TValue): ModelProp<TValue, string>
export function prop<TValue>(defaultValue: TValue): ModelProp<TValue, string>
export function prop<TValue>(def?: any): ModelProp<TValue, any> {
  const isDefFn = typeof def === "function"
  return {
    $valueType: null as any,
    $hasDefault: null as any,
    defaultFn: isDefFn ? def : undefined,
    defaultValue: isDefFn ? undefined : def
  }
}

export interface InferredModelType<TProps extends ModelProps> {
  new (): ModelPropsToData<TProps>;
}

export function Model<TProps extends ModelProps>(modelProps: TProps): InferredModelType<TProps> {
  return class extends BaseModel {
    constructor() {
      super();

      const self = this;
      const keys = Object.keys(modelProps);
      keys.forEach(function(key:string){
        self[dataTypeSymbol].set(key, modelProps[key].defaultValue);

        Object.defineProperty(self, key, {
          get: function() {
            return self[dataTypeSymbol].get(key);
          },
          set: function(newValue:any) {
            self[dataTypeSymbol].set(key, newValue);
          }
        });
      });
    }
  } as any;
}
