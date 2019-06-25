import React from "react";
import "./App.css";
import Header from "./components/header";
import Authentification from "./components/authentification";
import Footer from "./components/footer";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Authentification />
      <Footer />
    </React.Fragment>
  );
}

export default App;
