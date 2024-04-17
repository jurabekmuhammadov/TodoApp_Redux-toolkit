/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../app/todosSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { loading, error, todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {todos.length > 0 && (
        <ul>
          {todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} index={index} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;


