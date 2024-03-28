import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import MonthCalendar from "./components/Grid";

function App() {
  return (
    <>
      <Provider store={store}>
       
        <MonthCalendar />
      </Provider>
    </>
  );
  
}

export default App;
