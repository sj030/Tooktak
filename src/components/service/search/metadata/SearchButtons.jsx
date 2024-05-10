import {Button} from "../../../commons/Button";
import {useSetFileContext} from "../../../../contexts/FileContext";
import {getFile} from "../../../../services/hospital";

export default function SearchButtons() {
    const setFile = useSetFileContext();
    const onSearch = () => {
        setFile(getFile());
    }
    return (
        <>
            <Button color="red">Reset</Button>
            <Button color="green" onClick={onSearch}>Search</Button>
        </>
    );
}