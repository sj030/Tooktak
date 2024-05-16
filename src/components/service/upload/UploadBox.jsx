import {useStep} from "../../../contexts/UploadFileContext";
import XlsxReader from "./XlsxReader";
import UploadTable from "./UploadTable";
import DirectoryReader from "./DirectoryReader";


export default function UploadBox() {
    const step = useStep();
    switch (step) {
        case "xlsx":
            return <XlsxReader/>;
        case "directory":
            return <DirectoryReader/>;
        case "upload":
            return <UploadTable/>
        default:
            return null;
    }
}