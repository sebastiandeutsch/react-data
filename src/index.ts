import '@babel/polyfill';
import 'react-app-polyfill/ie11';

import TodoList from './models/TodoList';

const work = new TodoList();
// work.name = "Foo";
// work.meaningOfLife = 1337;

// console.log("hallo");
console.log(work);
console.log("work.name:", work.name);
console.log("work.meaningOfLife:", work.meaningOfLife);
//console.log("work.test():", work.test());
// console.log(work.meaningOfLife);
// console.log(work.meaningOfLife);
