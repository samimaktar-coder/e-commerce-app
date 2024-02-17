import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </Provider>
  </BrowserRouter>
);
