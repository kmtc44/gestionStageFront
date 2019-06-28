import React from "react";
import "./App.css";
import Header from "./components/home/Header";
import Home from "./components/home/Home";
import Footer from "./components/home/Footer";
import { BrowserRouter } from "react-router-dom";
// import { connect } from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Home />
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
