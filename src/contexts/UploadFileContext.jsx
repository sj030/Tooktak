import {createContext, useContext, useReducer} from "react";
import uploadFileReducer from "./UploadFileReducer";

const initialState = {
    hospital: "",
    directoryList: {},
    attributeList: [],
    step: "xlsx"
}
const UploadDirectoryContext = createContext(null);

export function UploadFileProvider({children}) {
    const [directoryList, dispatch] = useReducer(uploadFileReducer, initialState);
    return <UploadDirectoryContext.Provider value={{ directoryList, dispatch}}>
        {children}
    </UploadDirectoryContext.Provider>
}

export function useInitXlsx() {
    const {dispatch} = useContext(UploadDirectoryContext);
    return (header,data) => {
        dispatch({type: "INIT_XLSX_DATA", header: header, data: data});
    }
}

export function useSetHospital() {
    const {dispatch} = useContext(UploadDirectoryContext);
    return (hospital) => {
        dispatch({type: "SET_HOSPITAL", hospital: hospital});
    }
}

export function useInitDirectory() {
    const {dispatch} = useContext(UploadDirectoryContext);
    return (files) => {
        dispatch({type: "INIT_DIRECTORY_DATA", files: files});
    }
}

export function useDirectory() {
    const {directoryList} = useContext(UploadDirectoryContext);
    return {attributeList: directoryList.attributeList,directoryList:Object.entries(directoryList.directoryList)};
}

export function useHospital() {
    const {directoryList} = useContext(UploadDirectoryContext);
    return directoryList.hospital;
}
export function useStep() {
    const {directoryList} = useContext(UploadDirectoryContext);
    return directoryList.step;
}