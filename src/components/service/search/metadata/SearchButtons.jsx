import {Button} from "../../../commons/Button";
import {useSetFile} from "../../../../contexts/FileContext";
import {getFileList} from "../../../../services/hospital";
import {useResetAttribute} from "../../../../contexts/MetadataContext";

export default function SearchButtons() {
    const setFile = useSetFile();
    const resetAttribute= useResetAttribute();
    const onSearch = () => {
        setFile(getFileList());
    }
    return (
        <>
            <Button color="red" onClick={resetAttribute}>Reset</Button>
            <Button color="green" onClick={onSearch}>Search</Button>
        </>
    );
}