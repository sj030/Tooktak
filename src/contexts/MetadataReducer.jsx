export function metadataReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "SET_HOSPITAL":
            return {hospital: action.hospital, attributes: action.attributes};
        case "TEXT_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) => {
                    if (attribute.name === action.name) {
                        return {...attribute, value: action.value}
                    }
                    return attribute;
                })
            }
        case "RANGE_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) => {
                    if (attribute.name === action.name) {
                        return {...attribute, start: action.start, end: action.end}
                    }
                    return attribute;
                })
            }
        case "CHECKBOX_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) => {
                    if (attribute.name === action.name) {
                        return {...attribute, value: action.value}
                    }
                    return attribute;
                })
            }
        case "RESET_ATTRIBUTE":
            return {...state, attributes:state.attributes.map((attribute) => {
                return {...attribute, value: "",start: "", end: ""}
                })
            }
        default:
            return state;
    }
}
