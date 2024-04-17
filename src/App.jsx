import store from "./app/store";
import Todos from "./components/Todos"
import { Provider } from "react-redux";


const App = () => {
  return (
    <Provider store={store}>
      <Todos/>
    </Provider>
  )
}

export default App