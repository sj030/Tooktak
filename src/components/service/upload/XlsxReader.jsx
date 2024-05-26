import {FileInputBox} from "../../commons/FileInputBox";
import {useInitXlsx} from "../../../contexts/UploadFileContext";
import {handleFileUpload} from "../../../utility/xlsx";
import {useRef, useState} from "react";
import {TextBox} from "../../commons/TextBox";
import {Button} from "../../commons/Button";


export default function XlsxReader() {
    const initXlsx = useInitXlsx();
    const [dateColumn, setDateColumn] = useState("");
    const [nameColumn, setNameColumn] = useState("");
    const [boxActive, setBoxActive] = useState(false);
    const onChange = useRef(null);
    onChange.current= (event) => {
        handleFileUpload(event, initXlsx, dateColumn, nameColumn);
    }
    return !boxActive ? <>
        <TextBox label={"엑셀 날짜 헤더 이름"}
                 value={dateColumn}
                 setValue={setDateColumn}
                 placeholder={"검사일자"}
        />
        < TextBox label={"엑셀 환자명 헤더 이름"}
                 value={nameColumn}
                 setValue={setNameColumn}
                 placeholder={"환자명"}/>
        <Button onClick={() => setBoxActive(true)}>확인</Button>
    </> : <FileInputBox onChange={onChange.current} accept=".xlsx, .xls" color={"blue"} label={"엑셀파일"}/>
}