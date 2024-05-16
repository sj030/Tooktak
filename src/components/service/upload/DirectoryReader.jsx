import {useInitDirectory} from "../../../contexts/UploadFileContext";
import {DirectoryInputBox} from "../../commons/DirectoryInputBox";

export default function DirectoryReader(){
    const initDirectory=useInitDirectory();
    const handleDirectoryChange = event => {
        const files = event.target.files;
        const structuredFiles = [];
        for (let i = 0; i < files.length; i++) {
            structuredFiles.push(files[i]);
        }
        initDirectory(structuredFiles);
    };

    return <DirectoryInputBox
        color="yellow"
        label="폴더 선택"
        onChange={handleDirectoryChange}
        directory={true}
    />
}