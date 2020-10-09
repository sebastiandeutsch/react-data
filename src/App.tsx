import React, { FC } from 'react';

import ReactDataRegistry from './ReactData-v1/ReactDataRegistry';
import { useForceUpdate } from './ReactData-v1/utils';

interface AppProps {
  store: any
}

function observer(FunctionComponent:any):any {
  return (props:any) => {
    const forceUpdate = useForceUpdate()

    ReactDataRegistry.addToStack(FunctionComponent);
    ReactDataRegistry.subscribe(() => {
      forceUpdate();
    });

    return FunctionComponent(props);
  };
}

const App: FC<AppProps> = observer((props:any) => {
  console.log(props);
  const store = props.store;
  const todoLists = store.TodoList.findAll();
  console.log(todoLists);

  return (<div>
    <ul>
      {todoLists.map( (list:any, index:any) => {
        return (
          <li key={index}>
            <h2>{list.name} {list.priority}</h2>
            <ul>
              {list.todos.map( (todoItem:any, index:any) => {
                return (
                  <li key={index}>
                    {todoItem.name}
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  </div>);
});

export default App;
