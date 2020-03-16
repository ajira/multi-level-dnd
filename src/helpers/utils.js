const definitionsMap = definitions => definitions.reduce((acc, definition) => ({
    ...acc,
    [definition.type]: definition
}), {});


export {
    definitionsMap
}
