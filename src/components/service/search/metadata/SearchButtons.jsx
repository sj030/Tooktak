import {Button} from "../../../commons/Button";
import {useSetFileContext} from "../../../../contexts/FileContext";
import {getFile} from "../../../../services/hospital";
import {useResetAttribute} from "../../../../contexts/MetadataContext";

export default function SearchButtons() {
    const setFile = useSetFileContext();
    const resetAttribute= useResetAttribute();
    const onSearch = () => {
        setFile(getFile());
    }
    return (
        <>
            <Button color="red" onClick={resetAttribute}>Reset</Button>
            <Button color="green" onClick={onSearch}>Search</Button>
        </>
    );
}