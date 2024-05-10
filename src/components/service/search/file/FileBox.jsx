import {SmallSection} from "../../../commons/Section";
import {Card} from "../../../commons/Card";
import {Button} from "../../../commons/Button";
import {useFileHospitalContext} from "../../../../contexts/FileContext";
import {FileTable} from "./FileTable";

export default function FileBox() {
    const Hospital = useFileHospitalContext();
    return (
        <SmallSection>
            <Card
                header={Hospital}
                body={<FileTable/>}
                footer={<Button children={"다운로드"}/>}
            />
        </SmallSection>
    );
}
