import {Table} from "../../../commons/Table";
import {useFileAttributeContext, useFileListContext} from "../../../../contexts/FileContext";

export function FileTable() {
    const items = useFileListContext();
    const attributes = useFileAttributeContext();
    return <Table header={attributes}
                  items={items}
    />;
}