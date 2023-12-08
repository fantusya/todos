import TodoItem from 'components/TodoItem';
import { Todo } from "components/TodoItem/TodoItem.types";

type Props = {
  todoArr: Array<Todo>;
};

const TodoList = ({ todoArr }: Props) => {
  return (
    <ul>
      {todoArr.map(todo => (
        <li key={todo._id}>
          <TodoItem
            todo={todo}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
