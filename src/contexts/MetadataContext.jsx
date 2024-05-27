import {createContext, useContext, useEffect, useReducer, useRef} from "react";
import {metadataReducer} from "./MetadataReducer";
import {getFileList, getMetadata} from "../services/searchApi";
import {useInitFile} from "./FileContext";

const referenceContext = createContext(null);
const metadataContext = createContext(null);
const metadataDispatchContext = createContext(null);

export function MetadataProvider({children}) {
    const [metadata, dispatch] = useReducer(metadataReducer, {hospital: "", attributes: []});
    const referenceData = useRef(null);
    useEffect(() => {
        getMetadata().then((res) => {
            referenceData.current = res.data.map((item) => {
                    return {
                        name: item.name, attributes: item.attributes.map((attribute) => {
                            if (attribute.option === "range") {
                                return {...attribute,visible:false, value: {min: "", max: ""}}
                            }
                            return {...attribute,visible:false, value: ""}
                        })
                    }
                }
            )
            dispatch({
                type: "INIT",
                payload: {
                    hospital: referenceData.current[0].name,  // Adjusted to use the actual data
                    attributes: referenceData.current[0].attributes
                }
            });
        }).catch(error => {
            console.error("Failed to fetch metadata:", error);
        });
    }, []);
    return (
        <referenceContext.Provider value={referenceData.current}>
            <metadataContext.Provider value={metadata}>
                <metadataDispatchContext.Provider value={dispatch}>
                    {children}
                </metadataDispatchContext.Provider>
            </metadataContext.Provider>
        </referenceContext.Provider>
    );

}

export function useHospitals() {
    const data = useContext(referenceContext);
    return data ? data.map((item) => item.name) : [];
}

export function useAttributes() {
    const data = useContext(metadataContext);
    return data ? data.attributes : [];
}

export function useAttributeVisible(){
    const dispatch = useContext(metadataDispatchContext);
    return (attributeName,visible) => {
        dispatch({
            type: "SET_ATTRIBUTE_VISIBLE",
            name: attributeName,
            visible: visible
        });
    }
}

export function useHospital() {
    const dispatch = useContext(metadataDispatchContext);
    const referenceData = useContext(referenceContext);
    const meta = useContext(metadataContext);
    const hospital = meta ? meta.hospital : ""
    const setHospital = (hospital) => {
        dispatch({
            type: "SET_HOSPITAL",
            hospital: hospital,
            attributes: referenceData.filter((item) => item.name === hospital)[0].attributes
        });
    };
    return {hospital: hospital, setHospital: setHospital};
}

export function useMetadata() {
    const data = useContext(metadataContext);
    return data ? {hospital: data.hospital, attributes: data.attributes} : {hospital: "", attributes: []};
}

export function useGetFileList() {
    const data = useContext(metadataContext);
    const initFile = useInitFile();
    const attributes = {}
    data.attributes.forEach((attribute) => {
        switch (attribute.option) {
            case "text":
                if (attribute["value"].length > 0) {
                    attributes[attribute.name] = {text: attribute.value};
                }
                break;
            case "range":
                if (attribute.value.min.length > 0) {
                    attributes[attribute.name] = {min: attribute.value.min};
                }
                if (attribute.value.max.length > 0) {
                    attributes[attribute.name] = {...attributes[attribute.name], max: attribute.value.max};
                }

                break;
            case "checkbox":
                if (attribute["value"].length > 0) {
                    attributes[attribute.name] = {list: [attribute.value]};
                }
                break;
            default:
                break;
        }
    });
    return () => {
        getFileList(data.hospital, attributes).then((res) => {
            initFile(res.data);
        }).catch(error => {
            initFile([])
            console.error("Failed to fetch file list:", error);
        })
    }
}

export function useAttributeDispatch() {
    const dispatch = useContext(metadataDispatchContext);
    return {
        setAttribute: (attribute, value) => dispatch({
            type: "SET_ATTRIBUTE",
            name: attribute,
            value: value
        }),
    };
}

export function useResetAttribute() {
    const dispatch = useContext(metadataDispatchContext);
    return () => {
        dispatch({
            type: "RESET_ATTRIBUTE"
        });
    };
}