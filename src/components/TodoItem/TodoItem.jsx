import { Todo } from './TodoItem.types';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { updateCompleted, editTodo, deleteTodo } from 'api/todosApi';

// type Props = {
//   todo: Todo,
// };

// type Edit = {
//   _id: string;
//   text: string;
// }

const TodoItem = ({ todo }) => {
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState(todo.text);

  const queryClient = useQueryClient();

  const mutation1 = useMutation(({ _id, text }) => editTodo(_id, text), {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const mutation = useMutation(
    ({ _id, completed }) => updateCompleted(_id, completed),
    { onSuccess: () => queryClient.invalidateQueries(['todos']) }
  );

  const mutation3 = useMutation(({ _id }) => deleteTodo(_id), {
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const onChange = () => {
    mutation.mutate({ _id: todo._id, completed: !todo.completed });
  };

  const onClickEdit = () => {
    mutation1.mutate({ _id: todo._id, text: newTask });
    setShowInput(!showInput);
  };

  const onCancel = () => {
    setShowInput(!showInput);
    setNewTask(todo.text);
  };

  const onDeleteClick = () => {
    mutation3.mutate({ _id: todo._id });
  };

  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={onChange} />
      {showInput ? (
        <>
          <input value={newTask} onChange={e => setNewTask(e.target.value)} />
          <button type="button" onClick={onClickEdit}>
            Confirm
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{todo.text}</p>
          <button type="button" onClick={() => setShowInput(!showInput)}>
            Edit
          </button>
          <button type="button" onClick={onDeleteClick}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
