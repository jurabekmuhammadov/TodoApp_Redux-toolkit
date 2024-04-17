import store from "./app/store";
import Todo from "./components/Todo";
import { Provider } from "react-redux";


const App = () => {
  return (
    <Provider store={store}>
      {/* <TodoList/> */}
      <Todo/>
    </Provider>
  )
}

export default App