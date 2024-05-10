import {createContext, useContext, useReducer} from "react";
import {attributeReducer} from "./AttributeReducer";

const attributesContext = createContext(null);
const attributeDispatchContext = createContext(null);


export function FilterProvider({children}) {
    const [attributes, dispatch] = useReducer(attributeReducer, []);
    return (
        <attributesContext.Provider value={attributes}>
            <attributeDispatchContext.Provider value={dispatch}>
                {children}
            </attributeDispatchContext.Provider>
        </attributesContext.Provider>
    );

}

export function useAttributes() {
    return useContext(attributesContext);
}

export function useAttributeDispatch() {
    return useContext(attributeDispatchContext);
}