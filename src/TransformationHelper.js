import uuidv1 from "uuid";

const convertFromUILayoutToState = (layout) => {
    if (!layout) return null;
    if(Array.isArray(layout)){
        return {
            draggableId: uuidv1(),
            type: "Horizontal",
            children: layout.map( x => convertFromUILayoutToState(x))
        }
    }

    if(layout.rows){
        return {
            draggableId: uuidv1(),
            type: "Vertical",
            children: layout.rows.map( x => convertFromUILayoutToState(x))
        }
    }

    return {
        draggableId: uuidv1(),
        type: "Element",
        config: layout
    };

};

const convertFromStateToUILayout = state => {
    if(Array.isArray(state)){
        return {
            rows: state.map(x => convertFromStateToUILayout(x))
        }
    }

    if(state.type === "Vertical") {
        return {
            rows: state.children.map( x => convertFromStateToUILayout(x))
        }
    }

    if(state.type ===  "Horizontal") {
        return state.children.map( x => convertFromStateToUILayout(x))
    }

    return state.config;

};


export {convertFromUILayoutToState, convertFromStateToUILayout}
