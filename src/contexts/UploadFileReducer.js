import {parseAndFormatDate} from "../utility/date";

export default function uploadFileReducer(state, action) {
    switch (action.type) {
        case "INIT_XLSX_DATA":
            const directoryList = {};
            action.data.forEach((data) => {
                const key = parseAndFormatDate(data["검사일자"]) + "/" + data["환자명"];
                directoryList[key] = ({...data, files: [], status: "unset", file_num: 0, finish_num: 0});
            })
            directoryList["untracked"] = {files: [], status: "unset", file_num: 0, finish_num: 0};
            return {
                ...state,
                step: "directory",
                attributeList: ["files", "file_num", "finish_num", ...action.header],
                directoryList: directoryList
            }
        case "INIT_DIRECTORY_DATA":
            const directory = {...state.directoryList};
            action.files.forEach((file) => {
                const path = file.webkitRelativePath.split("/");
                const key = path[1] + "/" + path[2];
                if (directory[key] === undefined) {
                    directory["untracked"].files.push(file);
                    directory["untracked"].file_num++;
                    directory["untracked"].status = "ready";
                } else {
                    directory[key].files.push(file);
                    directory[key].file_num++;
                    directory[key].status = "ready";
                }
            })
            console.log(directory);
            return {
                ...state,
                step: "upload",
                directoryList: directory
            }
        default:
            return state;
    }
}