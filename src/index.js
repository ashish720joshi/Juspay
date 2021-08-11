import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "tailwindcss/tailwind.css";
import NewComponent from './components/NewComponent';

console.log("hi");

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <NewComponent></NewComponent> */}
   </React.StrictMode>
  ,document.getElementById("root")
);
