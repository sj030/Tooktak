import {Table} from "../../../commons/Table";
import {useFileAttribute, useFileList, useSelectFile} from "../../../../contexts/FileContext";

export function FileTable() {
    const items = useFileList();
    const attributes = useFileAttribute();
    const select = useSelectFile();
    return <Table header={attributes}
                  items={items}
                  select={select}
                  id={"file_id"}
    />;
}