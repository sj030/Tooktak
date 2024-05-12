export function metadataReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "SET_HOSPITAL":
            return state.map((item) => {
                if (item.name === action.payload) {
                    return {...item, selected: true}
                } else {
                    return {...item, selected: false}
                }
            });
        case "TEXT_ATTRIBUTE":
            return state.map((attribute) => {
                if (attribute.name === action.name) {
                    return {...attribute, value: action.value}
                }
                return attribute;
            })
        case "RANGE_ATTRIBUTE":
            return state.map((attribute) => {
                if (attribute.name === action.name) {
                    return {...attribute, start: action.start, end: action.end}
                }
                return attribute;
            })
        case "CHECKBOX_ATTRIBUTE":
            return state.map((attribute) => {
                if (attribute.name === action.name) {
                    return {...attribute, value: action.value}
                }
                return attribute;
            })
        default:
            return state;
    }
}
