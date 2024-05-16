import {useDirectory} from "../../../contexts/UploadFileContext";
import {UTable} from "../../commons/UTable";

export default function UploadTable({header, data}){
    const {attributeList,directoryList}=useDirectory();
    return <UTable header={attributeList} directory={directoryList}/>
}