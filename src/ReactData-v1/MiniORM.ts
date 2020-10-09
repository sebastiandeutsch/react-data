export default class MiniORM {
  map:Map<any, any>;

  constructor(map:Map<any, any>) {
    this.map = map;
  }

  findAll():any[] {
    return Array.from(this.map.values());
  }

  findById(id:any):any {
    return this.map.get(id);
  }
}
