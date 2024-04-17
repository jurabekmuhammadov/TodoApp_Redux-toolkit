import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos } from "../app/todosSlice";

const Todos = () => {
  const { loading, error, todos } = useSelector((state) => state.todos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {todos.length > 0 && (
        <div>
          <button>Add</button>
          {todos.map((todo) => (
            <div key={todo.id}>
              <p>{todo.desc}</p>
              <span>{todo.complete ? "Completed" : "Pending"}</span> <br />
              <span>Date: {todo.date}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Todos