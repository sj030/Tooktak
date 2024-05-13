import {Table} from "../../../commons/Table";
import {
    useFileAttribute,
    useFileList,
    useSelectFile,
} from "../../../../contexts/FileContext";
import {Button} from "../../../commons/Button";

export function FileTable() {
    const items = useFileList();
    const attributes = useFileAttribute();
    const {select,selectAll,unselectAll} = useSelectFile();
    return <>
        <Button children={"모두 선택"} onClick={selectAll} color={"blue"}/>
        <Button children={"모두 해제"} onClick={unselectAll} color={"red"}/>
        <Table header={attributes}
               items={items}
               select={select}
               id={"file_id"}
        />
    </>;
}