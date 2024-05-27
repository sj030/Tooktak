export function metadataReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return {
                ...action.payload, attributes: action.payload.attributes.map((attribute) => {
                    if (attribute.option === "range") {
                        return {...attribute, value: {min: "", max: ""}}
                    }
                    return {...attribute, value: ""}
                })
            };
        case "SET_HOSPITAL":
            return {hospital: action.hospital, attributes: action.attributes};
        case "SET_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) =>
                    attribute.name === action.name ? {...attribute, value: action.value} : attribute
                )
            }
        case "RESET_ATTRIBUTE":
            return {
                ...state, attributes: state.attributes.map((attribute) => {
                    if (attribute.option === "range") {
                        return {...attribute, value: {min: "", max: ""}}
                    }
                    return {...attribute, value: ""}
                })
            }
        case "SET_ATTRIBUTE_VISIBLE":
            return {
                ...state, attributes: state.attributes.map((attribute) =>
                    attribute.name === action.name ? {...attribute, visible: action.visible} : attribute
                )
            }
        default:
            return state;
    }
}
