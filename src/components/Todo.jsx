import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './TodoList';
import { BsPlus } from 'react-icons/bs';
import { addTodoAsync, markAllTodosCompleted } from '../app/todosSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const [newTodoDesc, setNewTodoDesc] = useState("");

    const handleAddTodo = () => {
        dispatch(addTodoAsync(newTodoDesc.trim()));
        setNewTodoDesc("");
    };
    const handleMarkAllCompleted = () => {
        dispatch(markAllTodosCompleted());
    };

    return (
        <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded">
            <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>Personal TODO APP</h2>
            <form className="flex items-center mb-4">
                <input
                    id="addTodoInput"
                    className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Add Todo"
                    value={newTodoDesc}
                    onChange={(e) => setNewTodoDesc(e.target.value)}
                />
                <button
                type='submit'
                    className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none flex justify-center items-center"
                    onClick={handleAddTodo}
                >
                    <BsPlus size={20} />
                </button>
                <button type='button' onClick={handleMarkAllCompleted}>Mark All Completed</button>
            </form>

            <TodoList />
        </div>
    );
};

export default Todo;