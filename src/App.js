import React from 'react';
import './App.css';
import LayoutDesigner from "./LayoutDesigner";
import layout from "./config/userConfig";

function App() {
  return (
    <div className="App">
      <LayoutDesigner uiLayout={layout}/>
      {/*<LayoutDesigner uiLayout={null}/>*/}
    </div>
  );
}

export default App;
