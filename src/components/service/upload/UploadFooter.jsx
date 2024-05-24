import {Button} from "../../commons/Button";
import {useStep} from "../../../contexts/UploadFileContext";

export default function UploadFooter() {
    const step=useStep()
    return <>
        {step === "upload" && <Button children={"upload"}/>}
    </>
}