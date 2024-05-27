export function fileReducer(state, action) {
    switch (action.type) {
        case "INIT_FILE_LIST":
            if(action.fileData.length===0) return {hospital: "file not found", attributes: [], files: []};
            const hospital=action.fileData[0].serviceName;
            const attribute=Object.keys(action.fileData[0].patient.attributes);
            return {
                hospital: hospital,
                attributes: attribute,
                files: action.fileData.map((file) => {
                    file["selected"] = false;
                    file["file_id"]=file._id;
                    return file;
                }),
            };
        case "SELECT_FILE":
            return {
                ...state,
                files: state.files.map((file) => {
                    if (file.file_id === action.file_id) {
                        return {
                            ...file,
                            selected: !file.selected
                        };
                    }
                    return file;
                }),
            };
        case "SELECT_ALL":
            return {
                ...state,
                files: state.files.map((file) => {
                        return {
                            ...file,
                            selected: !file.selected
                        };
                }),
            };
        case "UNSELECT_ALL":
            return {
                ...state,
                files: state.files.map((file) => {
                    return {...file, selected: false};
                }),
            };
        default:
            return state;
    }
}