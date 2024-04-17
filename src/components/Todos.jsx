import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodoAsync, deleteTodoAsync, toggleTodoComplete, markAllTodosCompleted } from "../app/todosSlice";

const Todos = () => {
  const { loading, error, todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const [newTodoDesc, setNewTodoDesc] = useState("");

  // const [selectedFilter, setSelectedFilter] = useState("all");

  const handleAddTodo = () => {
    dispatch(addTodoAsync(newTodoDesc.trim()));
    setNewTodoDesc("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoAsync(id));
  }

  const handleToggleComplete = (id) => {
    dispatch(toggleTodoComplete(id));
  };

  const handleMarkAllCompleted = () => {
    dispatch(markAllTodosCompleted());
  };

  // const handleSetFilter = (e) => {
  //   setSelectedFilter(e.target.value);
  // };

  // const filteredTodos = todos.filter((todo) => {
  //   switch (selectedFilter) {
  //     case "all":
  //       return true;
  //     case "completed":
  //       return todo.complete;
  //     case "uncompleted":
  //       return !todo.complete;
  //     default:
  //       return true;
  //   }
  // });

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      <form>
        <input
          type="text"
          value={newTodoDesc}
          required
          onChange={(e) => setNewTodoDesc(e.target.value)}
        />
        <button onClick={handleAddTodo} type="submit">Add</button>
      </form>
      <button onClick={handleMarkAllCompleted}>Mark All Completed</button>

      {/* <select value="all" onChange={handleSetFilter}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select> */}

      {todos.length > 0 && (
        <div>
          {todos.length > 0 && (
            <div>
              {todos.length > 0 && (
                <ul>
                  {todos.map((todo) => (
                    <li key={todo.id}>
                      <p className={`${todo.complete ? "completed-todo" : ""}`}>{todo.desc}</p>
                      <span>{todo.complete ? "Completed" : "Doing"}</span> <br />
                      <span>Date: {todo.date}</span>
                      <button onClick={() => handleToggleComplete(todo.id)}>
                        {todo.complete ? "Mark Incomplete" : "Mark Complete"}
                      </button>
                      <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Todos;


