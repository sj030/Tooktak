import {SmallSection} from "../../../commons/Section";
import {Card} from "../../../commons/Card";
import {Button} from "../../../commons/Button";
import {useFileHospital} from "../../../../contexts/FileContext";
import {FileTable} from "./FileTable";
import {useState} from "react";
import DownloadModal from "./DownloadModal";

export default function FileBox() {
    const Hospital = useFileHospital();
    const [active, setActive] = useState(false);
    return (
        <SmallSection>
            <Card
                header={Hospital}
                body={<FileTable/>}
                footer={<Button children={"다운로드"} onClick={() => setActive(true)}/>}
            />
            {<DownloadModal active={active} setActive={setActive}/>}
        </SmallSection>
    );
}
