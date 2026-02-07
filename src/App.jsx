import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Games from "./components/games.jsx";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <main className="container">
        <Games />
        <ToastContainer />
      </main>
    );
  }
}
