import index from "./IndexSingleton";

const convertFromUILayoutToState = (layout) => {
    if (!layout) return null;
    index.increment();
    if(Array.isArray(layout)){
        return {
            draggableId: index.index,
            type: "Horizontal",
            children: layout.map( x => convertFromUILayoutToState(x))
        }
    }

    if(layout.rows){
        return {
            draggableId: index.index,
            type: "Vertical",
            children: layout.rows.map( x => convertFromUILayoutToState(x))
        }
    }

    return {
        draggableId: index.index,
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
