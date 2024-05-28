import {LargeSection} from "../components/commons/Section";
import {Card} from "../components/commons/Card";
import UploadBox from "../components/service/upload/UploadBox";
import {UploadFileProvider} from "../contexts/UploadFileContext";
import UploadFooter from "../components/service/upload/UploadFooter";

export default function Upload() {
    return (
        <UploadFileProvider>
            <LargeSection>
                <Card header={"데이터 업로드"}
                      body={<UploadBox/>}
                      footer={<UploadFooter/>}/>
            </LargeSection>
        </UploadFileProvider>
    );
}
