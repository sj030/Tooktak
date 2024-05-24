import {Button} from "../../../commons/Button";
import {useGetFileList, useResetAttribute} from "../../../../contexts/MetadataContext";

export default function SearchButtons() {
    const resetAttribute = useResetAttribute();
    const getFileList = useGetFileList();
    return (
        <>
            <Button color="red" onClick={resetAttribute}>Reset</Button>
            <Button color="green" onClick={getFileList}>Search</Button>
        </>
    );
}