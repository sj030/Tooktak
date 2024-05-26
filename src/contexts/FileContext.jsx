import {createContext, useContext, useReducer} from "react";
import {fileReducer} from "./FileReducer";
import {getFileZip} from "../services/download";

const initialState = {
    hospital: "",
    attributes: [],
    files: [],
};

const FileContext = createContext(null);
const FileDispatchContext = createContext(null);

export function FileProvider({children}) {
    const [fileList, dispatch] = useReducer(fileReducer, initialState);
    return (
        <FileContext.Provider value={fileList}>
            <FileDispatchContext.Provider value={dispatch}>
                {children}
            </FileDispatchContext.Provider>
        </FileContext.Provider>
    );
}

export function useFileHospital() {
    const data = useContext(FileContext);
    return data.hospital ? data.hospital : "";
}

export function useFileAttribute() {
    const data = useContext(FileContext);
    return data.attributes ? data.attributes : [];
}

export function useFileList() {
    const data = useContext(FileContext);
    return data.files ? data.files : [];
}

export function useInitFile() {
    const dispatch = useContext(FileDispatchContext);
    return (fileData) => {
        dispatch({type: "INIT_FILE_LIST", fileData: fileData});
    }
}

export function useDownload() {
    const fileList = useContext(FileContext);
    const f = fileList.files.filter((file) => file.selected).map((file) => file.f_path);
    return () => getFileZip(f)
}


export function useSelectFile() {
    const dispatch = useContext(FileDispatchContext);
    const select = (file_id) => {
        dispatch({type: "SELECT_FILE", file_id: file_id});
    };
    const selectAll = () => {
        dispatch({type: "SELECT_ALL"});
    };
    const unselectAll = () => {
        dispatch({type: "UNSELECT_ALL"});
    };
    return {select, selectAll, unselectAll};
}