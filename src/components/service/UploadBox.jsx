import {File} from "../commons/File";

export default function UploadBox() {
    return (
        <>
            <File color={"red"} label={"metadata file"}/>
            <File color={"blue"}  label={"data file"}/>
        </>
    );
}