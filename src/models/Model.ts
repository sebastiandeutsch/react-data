import ReactDataRegistry from '../ReactDataRegistry';
import BaseModel, { dataTypeSymbol } from './BaseModel';

export interface ModelProp<TValue, THasDefault> {
  $valueType: TValue
  $hasDefault: THasDefault
  defaultFn?: () => TValue
  defaultValue?: TValue
}

export type ModelPropsToData<MP extends ModelProps> = {
  [k in keyof MP]: MP[k]["$valueType"];
}

export type PublicInterface = {
  update(attributes: Record<string, any>):void;
};

export interface ModelProps {
  [k: string]: ModelProp<any, any>
}

export function prop<TValue>(defaultFn?: () => TValue): ModelProp<TValue, string>
export function prop<TValue>(defaultValue?: TValue): ModelProp<TValue, string>
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
  new (): ModelPropsToData<TProps> & PublicInterface;
}

export function Model<TProps extends ModelProps>(modelProps: TProps): InferredModelType<TProps> {
  return class extends BaseModel {
    constructor(params:object) {
      super(params, modelProps);

      const self = this;
      const keys = Object.keys(modelProps);

      keys.forEach(function(key:string){
        if (modelProps[key].defaultValue) {
          self[dataTypeSymbol].set(key, JSON.parse(JSON.stringify(modelProps[key].defaultValue)));
        }
        // @TODO: Can this be done without self hack
        Object.defineProperty(self, key, {
          get: function() {
            return self[dataTypeSymbol].get(key);
          },
          set: function(newValue:any) {
            self[dataTypeSymbol].set(key, newValue);
            ReactDataRegistry.addReaction("add Reaction: " + key + "=" + newValue);
            ReactDataRegistry.notify();
          }
        });
      });
    }
  } as any;
}
