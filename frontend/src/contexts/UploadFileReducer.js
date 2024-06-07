export default function uploadFileReducer(state, action) {
    switch (action.type) {
        case "INIT_DATA":
            const directoryList = {};
            Object.entries(action.xlsx).forEach(([key, value]) => {
                directoryList[key] = {attributes: value, state: "xlsxOnly", files: {}};
            });
            directoryList["no_xlsx_data"] = {state: "fileOnly", files: {}};
            Object.entries(action.file).forEach(([key, value]) => {
                const path = key.split("/");
                const dirPath = path[0] + "/" + path[1];
                if (directoryList[dirPath]) {
                    directoryList[dirPath].files[key] = value;
                    directoryList[dirPath].state = "ready";
                } else {
                    directoryList["no_xlsx_data"].files[key] = value;
                }
            });
            //add fileNumber to each directory
            Object.entries(directoryList).forEach(([key, value]) => {
                value.fileNum = Object.keys(value.files).length;
            });
            return directoryList;
        case "UPLOAD_SUCCESS":
            const path = action.file.webkitRelativePath.split("/");
            const dirPath = path[1] + "/" + path[2];
            const fileKey = path[1] + "/" + path[2] + "/" + path[3];
            const newDirectoryList = {...state};
            newDirectoryList[dirPath].files[fileKey] = fileKey + " upload success";
            newDirectoryList[dirPath].fileNum -= 1;
            // 2. 해당 폴더의 파일이 없다면 state를 xlsxOnly로 변경한다.
            if (newDirectoryList[dirPath].fileNum === 0) {
                newDirectoryList[dirPath].state = "success";
            }
            return newDirectoryList;
        case "UPLOAD_FAIL":
            const failPath = action.file.webkitRelativePath.split("/");
            const failDirPath = failPath[1] + "/" + failPath[2];
            const failFileKey = failPath[1] + "/" + failPath[2] + "/" + failPath[3];
            const failDirectoryList = {...state};
            failDirectoryList[failDirPath].state = "error";
            failDirectoryList[failDirPath].files[failFileKey] = failFileKey + " upload fail";
            return failDirectoryList;
        case  "UPLOADING":
            const uploadingPath = action.file.webkitRelativePath.split("/");
            const uploadingDirPath = uploadingPath[1] + "/" + uploadingPath[2];
            const uploadingFileKey = uploadingPath[1] + "/" + uploadingPath[2] + "/" + uploadingPath[3];
            const uploadingDirectoryList = {...state};
            uploadingDirectoryList[uploadingDirPath].files[uploadingFileKey] = uploadingFileKey + " uploading...";
            return uploadingDirectoryList;
        default:
            return state;
    }
}