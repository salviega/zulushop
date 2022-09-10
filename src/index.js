import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "../src/components/App";
import { store } from "./store/index";
import { ZuluProvider } from "./components/ZuluContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ZuluProvider>
        <App />
      </ZuluProvider>
    </Provider>
  </React.StrictMode>
);
