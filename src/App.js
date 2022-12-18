/** @format */
import { Provider } from "react-redux";
import Router from "./config/router";
import { store } from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
