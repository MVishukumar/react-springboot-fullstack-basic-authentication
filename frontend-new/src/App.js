import React from "react";
import logo from "./logo.svg";
import "./App.css";

import InstructorApp from "./component/InstructorApp";
import AppHeader from "./component/AppHeader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AppHeader />
          <InstructorApp />
        </div>
      </header>
    </div>
  );
}

export default App;
