import {Button} from "../../../commons/Button";
import {useInitFile} from "../../../../contexts/FileContext";
import {getFileList} from "../../../../services/hospital";
import {useResetAttribute} from "../../../../contexts/MetadataContext";

export default function SearchButtons() {
    const initFile=useInitFile();
    const resetAttribute= useResetAttribute();
    const onSearch = () => {
        initFile(getFileList());
    }
    return (
        <>
            <Button color="red" onClick={resetAttribute}>Reset</Button>
            <Button color="green" onClick={onSearch}>Search</Button>
        </>
    );
}