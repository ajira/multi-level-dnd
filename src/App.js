import React from 'react';
import './App.css';
import LayoutDesigner from "./components/LayoutDesigner/LayoutDesigner";
import {VerticalElementDefinition} from "./config/VerticalElementDefinition";
import {HorizontalElementDefinition} from "./config/HorizontalElementDefinition";
import {ChildElementDefinition} from "./config/ChildElementDefinition";

function App() {
    return (
        <div className="App">
            <LayoutDesigner uiLayout={null}
                            definitions={[
                                new VerticalElementDefinition(),
                                new HorizontalElementDefinition(),
                                new ChildElementDefinition()
                            ]}
                            onComplete={result => console.log(JSON.stringify(result, null, 4))}/>
        </div>
    );
}

export default App;


/*
 1. We need the LHS element
 2. An unique ID for draggable id
 3. The index in which it is generated
 4. For each type we need to determine the way we are going to have the config handled

 We can define these as a class / interface kinda thing and then make separate implementations passed on as an array
 This can be passed across and can be worked on as required.  So that everything becomes configurable.

 No need of any other external dependency now :)

 */

