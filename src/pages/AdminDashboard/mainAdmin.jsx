import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import globalReducer from "./state/index";

const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <MainAdmin />
    </Provider>
  );
}

export default App;
