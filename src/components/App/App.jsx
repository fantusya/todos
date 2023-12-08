import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { fetchTodoList, addTodo } from 'api/todosApi';

import AddingBar from 'components/AddingBar';
import TodosList from 'components/TodosList';

function App() {
  const { isLoading, isError, data } = useQuery('todos', fetchTodoList);
  console.log('data', data);
  const queryClient = useQueryClient();

  const mutation = useMutation(text => addTodo(text), {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  return (
    <section>
      {isLoading && <span>Loading...</span>}
      {isError && <span>ERROR</span>}

      {data && (
        <>
          <h1>Todos({data.length})</h1>
          <AddingBar
            onSubmit={text => mutation.mutate(text)}
            isDisabled={mutation.isLoading}
          />
          <TodosList todoArr={data} />
        </>
      )}
    </section>
  );
}

export default App;
