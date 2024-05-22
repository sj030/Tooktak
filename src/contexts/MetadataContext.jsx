import {createContext, useContext, useEffect, useReducer, useRef} from "react";
import {metadataReducer} from "./MetadataReducer";
import {getFileList, getMetadata} from "../services/searchApi";

const referenceContext = createContext(null);
const metadataContext = createContext(null);
const metadataDispatchContext = createContext(null);

export function MetadataProvider({children}) {
    const [metadata, dispatch] = useReducer(metadataReducer, {hospital: "", attributes: []});
    const referenceData = useRef(null);
    useEffect(() => {
        getMetadata().then((res) => {
            referenceData.current = res.data
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
    const attributes={}
    data.attributes.forEach((attribute)=>{
        switch (attribute.type) {
            case "text":
                if(attribute["value"]&& attribute["value"].length>0){
                    attributes[attribute.name]={"text":attribute.value};
                }
                break;
            case "range":
                if(attribute["start"] || attribute["end"]){
                    if(attribute["start"].length>0){
                        attributes[attribute.name]={max:attribute.start};
                    }
                    if(attribute["end"].length>0){
                        attributes[attribute.name]={...attributes[attribute.name],min:attribute.end};
                    }
                }
                break;
            case "checkbox":
                if(attribute["value"]){
                    attributes[attribute.name]={list:[attribute.value]};
                }
                break;
            default:
                break;
        }
    });
    return ()=> {
        return getFileList(data.hospital, attributes)
    };
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

export function useResetAttribute() {
    const dispatch = useContext(metadataDispatchContext);
    return () => {
        dispatch({
            type: "RESET_ATTRIBUTE"
        });
    };
}