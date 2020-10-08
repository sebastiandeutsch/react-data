import React, { FC } from 'react';

import ReactDataRegistry from './ReactDataRegistry';

interface AppProps {
  store: any
}

function observer(FunctionComponent:any):any {
  return (props:any) => {
    const [value, setValue] = React.useState(0);
    ReactDataRegistry.addToStack(FunctionComponent);
    ReactDataRegistry.subscribe(() => {
      setValue(_ => (value + 1));
    });
    return FunctionComponent(props);
  };
}

// temp1.todoLists[0].name = "foo";

const App: FC<AppProps> = observer((props:any) => {
  console.log(props);
  const store = props.store;

  return (<div>
    <ul>
      {store.todoLists.map( (list:any, index:any) => {
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
