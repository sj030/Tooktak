import {createContext, useContext, useEffect, useReducer} from "react";
import {metadataReducer} from "./MetadataReducer";
import {getMetadata} from "../services/hospital";

const metadataContext = createContext(null);
const metadataDispatchContext = createContext(null);

export function MetadataProvider({children}) {
    const [metadata, dispatch] = useReducer(metadataReducer, []);
    useEffect(() => {
        dispatch({
            type: "INIT",
            payload: getMetadata().map((item) =>
                ({...item, selected: false,})),
        });
    }, []);
    return (
        <metadataContext.Provider value={metadata}>
            <metadataDispatchContext.Provider value={dispatch}>
                {children}
            </metadataDispatchContext.Provider>
        </metadataContext.Provider>
    );

}

export function useHospitals() {
    const data = useContext(metadataContext);
    return data ? data.map((item) => item.name) : [];
}

export function useSetHospital() {
    const dispatch = useContext(metadataDispatchContext);
    return (hospital) => {
        dispatch({
            type: "SET_HOSPITAL",
            payload: hospital,
        });
    };
}

export function useMetadata() {
    const data = useContext(metadataContext);
    return data ? data.filter((item) => item.selected)[0] : null;
}

export function useAttributeDispatch() {
    const dispatch = useContext(metadataDispatchContext);

    return {
        setText: (attribute, value) => dispatch({
            type: "TEXT_ATTRIBUTE",
            name: attribute,
            value: value
        }),
        setRange: (attribute, start, end) => dispatch({
            type: "RANGE_ATTRIBUTE",
            name: attribute,
            start: start,
            end: end
        }),
        setCheckbox: (attribute, value) => dispatch({
            type: "CHECKBOX_ATTRIBUTE",
            name: attribute,
            value: value
        })
    };
}
