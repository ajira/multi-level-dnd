import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./LayoutDesigner.scss";
import LHSElements from "./LHSElements";
import uuid4 from "uuid";

const TypeLookup = {
  0: "Vertical",
  1: "Horizontal",
  2: "Element"
};

const TypeElementLookup = {
  Element: (config) => (
    <div key={config.draggableId} className="element">{config.config.id || "No ID"}</div>
  ),
  Horizontal: input => buildDroppable(input),
  Vertical: input => buildDroppable(input)
};

const buildDroppable = (config) =>
    (
        <Droppable
            droppableId={config.draggableId}
            key={config.draggableId}
            direction={config.type.toLowerCase()}
        >
          {(provided, snapshot) => (
              <div
                  className={`${config.type.toLowerCase()}Container`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={snapshot.isDraggingOver ? {background: "lightgrey"} : {}}
              >
                {config.children.map((x, index) => {
                  return buildDraggable(x, index,);
                })}

                {provided.placeholder}
              </div>
          )}
        </Droppable>
    );

const buildDraggable = (x, index) =>
    (
        <Draggable draggableId={x.draggableId} index={index} key={x.draggableId}>
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="elementContainer"
              >
                {TypeElementLookup[x.type](x)}
              </div>
          )}
        </Draggable>
    );

const updateState = (id, index, arr, matching, item) => {
  if (matching) {
    const clone = [].concat(arr);
    clone.splice(index, 0, item);
    return clone;
  }

  return arr.map(x => {
    if (x.type === "Element") return x;
    return { ...x, children: updateState(id, index, x.children, x.draggableId === id, item) };
  });
};

const LayoutDesigner = () => {
  const [layout, setLayout] = useState([
    {
      draggableId: uuid4(),
      type: "Vertical",
      config: {},
      children: [
        {
          draggableId: uuid4(),
          index: 1,
          type: "Horizontal",
          children: [
            { draggableId: uuid4(), index: 1, type: "Element", config: { id: "test" } }
          ]
        }
      ]
    }
  ]);

  const onDragEnd = ({ source, destination }) => {
    if (
      !destination ||
      source.droppableId !== "lhsArea" ||
      source.droppableId === destination.droppableId
    )
      return;

    const updatedState = updateState(
      destination.droppableId,
      destination.index,
      layout,
      destination.droppableId === "designerArea",
      {
        draggableId: uuid4(),
        type: TypeLookup[source.index],
        config: {},
        children: []
      }
    );

    setLayout(updatedState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="lhsContainer">
          <Droppable droppableId="lhsArea">
            {(provided, snapshot) => <LHSElements provided={provided} />}
          </Droppable>
        </div>
        <div className="rhsContainer">
          <Droppable droppableId="designerArea">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.isDraggingOver
                    ? { background: "lightgrey", padding: "10px" }
                    : { padding: "10px" }
                }
              >
                {layout.map((x, index) => buildDraggable(x, index, null))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default LayoutDesigner;
