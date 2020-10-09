import BaseModel, { dataTypeSymbol } from './BaseModel';
import ReactDataRegistry from './ReactDataRegistry';

export interface ModelProp<TValue, THasDefault> {
  $valueType: TValue
  $hasDefault: THasDefault
  defaultFn?: () => TValue
  defaultValue?: TValue
  $options: any
}

export type ModelPropsToData<MP extends ModelProps> = {
  [k in keyof MP]: MP[k]["$valueType"];
}

export type PublicInterface = {
  update(attributes: Record<string, any>):void;
  save():void;
};

export interface ModelProps {
  [k: string]: ModelProp<any, any>
}

export function prop<TValue>(defaultFn?: () => TValue, options?: any): ModelProp<TValue, string>
export function prop<TValue>(defaultValue?: TValue, options?: any): ModelProp<TValue, string>
export function prop<TValue>(def?: any, options?: any): ModelProp<TValue, any> {
  const isDefFn = typeof def === "function"
  return {
    $valueType: null as any,
    $hasDefault: null as any,
    defaultFn: isDefFn ? def : undefined,
    defaultValue: isDefFn ? undefined : def,
    $options: options
  }
}

export interface InferredModelType<TProps extends ModelProps> {
  new (params?:Record<string, any>): ModelPropsToData<TProps> & PublicInterface;
}

export function Model<TProps extends ModelProps>(modelProps: TProps): InferredModelType<TProps> {
  return class extends BaseModel {
    constructor(params:Record<string, any>) {
      super(params, modelProps);

      const self = this;
      const keys = Object.keys(modelProps);

      keys.forEach(function(key:string){
        if (modelProps[key].defaultValue) {
          self[dataTypeSymbol].set(key, JSON.parse(JSON.stringify(modelProps[key].defaultValue)));
        }

        if (params && params[key]) {
          self[dataTypeSymbol].set(key, params[key]);
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
