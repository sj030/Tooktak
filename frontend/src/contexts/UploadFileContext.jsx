import {createContext, useContext, useReducer, useRef, useState} from "react";
import uploadFileReducer from "./UploadFileReducer";
import {upload} from "../services/upload";

const DirectoryContext = createContext(null);
const XlsxContext = createContext(null);
const FileContext = createContext(null);
const StepContext = createContext(null);

export function UploadFileProvider({children}) {
    const [directoryList, dispatch] = useReducer(uploadFileReducer, {});
    const [step, setStep] = useState("xlsx");
    const xlsxRef = useRef(null);
    const fileRef = useRef(null);
    return (
        <XlsxContext.Provider value={xlsxRef}>
            <FileContext.Provider value={fileRef}>
                <DirectoryContext.Provider value={{directoryList, dispatch}}>
                    <StepContext.Provider value={{step, setStep}}>
                        {children}
                    </StepContext.Provider>
                </DirectoryContext.Provider>
            </FileContext.Provider>
        </XlsxContext.Provider>)
}

export function useInitXlsx() {
    const xlsxData = useContext(XlsxContext);
    const {setStep} = useContext(StepContext);
    return (data) => {
        xlsxData.current = data;
        setStep("directory");
    };
}

export function useInitFile() {
    const file = useContext(FileContext);
    const {setStep} = useContext(StepContext);
    const xlsxData = useContext(XlsxContext);
    const {dispatch} = useContext(DirectoryContext);
    return (files) => {
        const directory = {};
        Object.entries(files).forEach(([_, data]) => {
            const path = data.webkitRelativePath.split("/");
            const key = path[1] + "/" + path[2] + "/" + path[3];
            directory[key] = (data);
        })
        file.current = directory;
        dispatch({type: "INIT_DATA", xlsx: xlsxData.current, file: file.current});
        setStep("upload");
    }
}

export function useDirectory() {
    const {directoryList} = useContext(DirectoryContext);
    return directoryList;
}

export function useStep() {
    const {step} = useContext(StepContext);
    return step;
}
function useUploadSuccess(){
    const {dispatch} = useContext(DirectoryContext);
    return (file) => {
        dispatch({type: "UPLOAD_SUCCESS", file: file});
    }
}
function useUploadFail(){
    const {dispatch} = useContext(DirectoryContext);
    return (file) => {
        dispatch({type: "UPLOAD_FAIL", file: file});
    }
}
function useLoading(){
    const {dispatch}=useContext(DirectoryContext);
    return (file) => {
        dispatch({type: "UPLOADING", file: file});
    }
}

export function useUploadAll() {
    const {directoryList} = useContext(DirectoryContext);
    const success = useUploadSuccess();
    const fail = useUploadFail();
    const loading = useLoading();
    const fileList = [];
    Object.entries(directoryList).forEach(([_, dir]) => {
        if(dir.state!=="ready") return;
        const attr = dir.attributes;
        Object.entries(dir.files).forEach(([_, file]) => {
            fileList.push({file: file, attributes: attr});
        })
    });
    return async () => {
        for (const {file, attributes} of fileList) {
            loading(file);
            try {
                const res = await upload(file, attributes);
                if (res.status === 200) {
                    success(file);
                }else{
                    fail(file);
                }
            }catch (e) {
                fail(file);
            }
        }
    };
}