import { useDispatch } from "react-redux";
import { deleteTodoAsync, toggleTodoComplete } from "../app/todosSlice";
import { FaToggleOn, FaToggleOff, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import PropTypes from "prop-types"

const TodoItem = ({ todo, index }) => {
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        dispatch(deleteTodoAsync(id));
    }

    const handleToggleComplete = (id) => {
        dispatch(toggleTodoComplete(id));
    };
    return (
        <li className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-2 gap-4">
            <div className="flex items-center">
                <span className="mr-4 text-gray-500">
                    {index + 1}.
                </span>
                <span className={`mr-4 ${todo.complete ? 'line-through text-gray-500' : ''}`}>
                    {todo.desc}
                </span>
            </div>
            <div className='space-x-3 ml-8'>
                <span>{todo.complete ? "Completed" : "Doing"}</span> <br />
                <button
                    className="mr-2 text-sm bg-blue-500 text-white sm:px-2 px-1 py-1 rounded"
                    onClick={() => dispatch(handleToggleComplete(todo.id))}
                >
                    {todo.complete ? <FaToggleOff /> : <FaToggleOn />}
                </button>
                <button
                    className="mr-2 text-sm bg-red-500 text-white sm:px-2 px-1 py-1 rounded"
                    onClick={() => dispatch(handleDelete(todo.id))}
                >
                    <FaTrash />
                </button>
                {!todo.complete ? (
                    <button
                        className="text-sm bg-green-500 text-white sm:px-2 px-1 py-1 rounded"
                        onClick={() => dispatch(handleToggleComplete(todo.id))}
                    >
                        <FaCheck />
                    </button>
                ) : ""}
                {todo.complete ? (
                    <button
                        className="text-sm bg-yellow-500 text-white sm:px-2 px-1 py-1 rounded"
                        onClick={() => dispatch(handleToggleComplete(todo.id))}
                    >
                        <FaTimes />
                    </button>
                ) : ""}
            </div>
        </li>
    );
};

TodoItem.propTypes = {
    todo: PropTypes.object,
    index: PropTypes.number,
}

export default TodoItem;