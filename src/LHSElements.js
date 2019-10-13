import { Draggable } from "react-beautiful-dnd";
import React from "react";

const LHSElements = ({ provided }) => (
  <div {...provided.droppableProps} ref={provided.innerRef}>
    <Draggable type="drop" key="vertical" draggableId="vertical" index={0}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          Vertical
        </div>
      )}
    </Draggable>

    <Draggable type="drop" key="horizontal" draggableId="horizontal" index={1}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          Horizontal
        </div>
      )}
    </Draggable>

    <Draggable type="drop" key="element" draggableId="element" index={2}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          Element
        </div>
      )}
    </Draggable>

    {provided.placeholder}
  </div>
);

export default LHSElements;
