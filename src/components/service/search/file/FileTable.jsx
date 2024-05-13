import {Table} from "../../../commons/Table";
import {useFileAttribute, useFileList} from "../../../../contexts/FileContext";

export function FileTable() {
    const items = useFileList();
    const attributes = useFileAttribute();
    return <Table header={attributes}
                  items={items}
    />;
}