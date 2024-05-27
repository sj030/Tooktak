import {Button} from "../../commons/Button";
import {useStep, useUploadAll} from "../../../contexts/UploadFileContext";

export default function UploadFooter() {
    const step=useStep()
    const uploadAll=useUploadAll()
    return <>
        {step === "upload" && <Button onClick={uploadAll} children={"upload"}/>}
    </>
}