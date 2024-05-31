import {SmallSection} from "../../../commons/Section";
import {Card} from "../../../commons/Card";
import { useFileHospital, useFileList} from "../../../../contexts/FileContext";
import {FileTable} from "./FileTable";
import {useState} from "react";
import DownloadModal from "./DownloadModal";
import DownloadFooter from "./DownloadFooter";

export default function FileBox() {
    const Hospital = useFileHospital();
    const [active, setActive] = useState(false);
    const [progress, setProgress] = useState({percent: 0, message: ""});
    const file = useFileList();
    return file.length>0 ?(
        <SmallSection>
            <Card
                header={Hospital}
                body={<FileTable/>}
                footer={<DownloadFooter setActive={setActive} setProgress={setProgress}/>}
            />
            {<DownloadModal progress={progress} active={active} setActive={setActive}/>}
        </SmallSection>
    ):null;
}
