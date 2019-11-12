import React from 'react';
import './App.css';
import LayoutDesigner from "./components/LayoutDesigner/LayoutDesigner";
import layout from "./config/flashCards";

function App() {
  return (
    <div className="App">
      <LayoutDesigner uiLayout={layout}/>
    </div>
  );
}

export default App;
