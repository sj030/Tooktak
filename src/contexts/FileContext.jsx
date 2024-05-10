import {createContext, useContext, useState} from "react";

const initialState = {
    hospital: "",
    attributes: [],
    files: {},
};

const FileContext = createContext(null);
const SetFileContext = createContext(null);

export function FileProvider({children}) {
    const [fileList, setFileList] = useState(initialState);

    return (
        <FileContext.Provider value={fileList}>
            <SetFileContext.Provider value={setFileList}>
                {children}
            </SetFileContext.Provider>
        </FileContext.Provider>
    );
}

export function useFileHospitalContext() {
    const FC = useContext(FileContext);
    return FC.hospital ? FC.hospital : "";
}

export function useFileAttributeContext() {
    const FC = useContext(FileContext);
    return FC.attribute ? FC.attribute : [];
}

export function useFileListContext() {
    const FC = useContext(FileContext);
    return FC.file ? FC.file : {};
}

export function useSetFileContext() {
    return useContext(SetFileContext);
}