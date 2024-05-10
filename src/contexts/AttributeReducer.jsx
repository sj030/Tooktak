export function attributeReducer (state, action) {
    switch (action.type) {
        case "reset":
            return action.payload;
        case "text":
            return state.map((attribute) => {
                if (attribute.name === action.name) {
                    return {...attribute, value: action.value}
                }
                return attribute;
            })
        case "range":
            return state.map((attribute) => {
                if (attribute.name === action.name) {
                    return {...attribute, start: action.start, end: action.end}
                }
                return attribute;
            })
        case "checkbox":
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
