export default function uploadFileReducer(state, action) {
    switch (action.type) {
        case "INIT_DATA":
            const directoryList = {};
            // 1. xlsx 파일의 데이터를 읽어서 attributeList와 directoryList를 만든다.
            Object.entries(action.xlsx).forEach(([key, value]) => {
                directoryList[key] = {attributes: value, state: "xlsxOnly", files: {}};
            });
            directoryList["no_xlsx_data"] = {state: "fileOnly", files: {}};
            //2. file의 데이터를 읽어서 directoryList에 추가한다.
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
            return directoryList;
        case "UPLOAD_SUCCESS":
            const path = action.file.webkitRelativePath.split("/");
            const dirPath = path[1] + "/" + path[2];
            const fileKey = path[1] + "/" + path[2] + "/" + path[3];
            const newDirectoryList = {...state};
            // 1. directoryList에서 해당 파일을 찾아서 삭제한다.
            delete newDirectoryList[dirPath].files[fileKey];
            // 2. 해당 폴더의 파일이 없다면 state를 xlsxOnly로 변경한다.
            if (Object.keys(newDirectoryList[dirPath].files).length === 0) {
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
        default:
            return state;
    }
}