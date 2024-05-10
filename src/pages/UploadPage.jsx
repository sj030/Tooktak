import { LargeSection } from "../components/commons/Section";
import { Card } from "../components/commons/Card";
import { Button } from "../components/commons/Button";
import UploadBox from "../components/service/UploadBox";

export default function Upload() {
  return (
    <LargeSection>
      <Card header={"데이터 업로드"}
            body={<UploadBox/>}
            footer={<Button children={"upload"} />}/>
    </LargeSection>
  );
}
