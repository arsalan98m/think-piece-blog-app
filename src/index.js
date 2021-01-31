import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import "rsuite/dist/styles/rsuite-default.css";
import { PostsProvider } from "./context/PostProvider";
import { UserProvider } from "./context/UserProvider";

ReactDOM.render(
  <UserProvider>
    <PostsProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PostsProvider>
  </UserProvider>,
  document.getElementById("root")
);
