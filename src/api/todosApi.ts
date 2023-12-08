import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/todos';

export const fetchTodoList = async ()  => {
  const { data } = await axios.get('/');

  return data;
};

export const addTodo = async (text: string) => {
  console.log("ADDED", text);

  const { data } = await axios.post('/', { text });

  console.log("ADDED", data)
  return data;
};

export const deleteTodo = async (todoId: string) => {
  const { data } = await axios.delete(`${todoId}`);

  return data;
};

export const editTodo = async (todoId: string, text: string) => {
  const { data } = await axios.patch(`${todoId}`, {text});

  return data;
};

export const updateCompleted = async (todoId: string, completed: boolean) => {
  const { data } = await axios.patch(`${todoId}/completed`, {completed});

  return data;
};
