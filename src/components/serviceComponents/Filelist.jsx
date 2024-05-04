import { Table } from "../commons/Table";
import { SmallSection } from "../commons/Section";
import { Card } from "../commons/Card";
import { downloadFile } from "../../services/download";
import { useState } from "react";
import { Button } from "../commons/Button";
export default function Filelist() {
  const [checkedFile, setCheckedFile] = useState([]);
  return (
    <SmallSection>
      <Card
        header={"파일 리스트"}
        footer={<Button children={"다운로드"} />}
      >
        <Table
          header={[
            "이름",
            "청력정도",
            "난청",
            "모델",
            "점수",
            "인지장애",
            "점수",
            "성별",
            "나이",
            "최종학력",
          ]}
          items={[
            [
              "문찬규",
              "정상",
              "없음",
              "1",
              "1",
              "없음",
              "1",
              "남",
              "20대",
              "대학졸업",
            ],
            [
              "김민수",
              "정상",
              "없음",
              "1",
              "1",
              "없음",
              "1",
              "남",
              "20대",
              "대학졸업",
            ],
            [
              "이상민",
              "정상",
              "없음",
              "1",
              "1",
              "없음",
              "1",
              "남",
              "20대",
              "대학졸업",
            ],
          ]}
        />
      </Card>
    </SmallSection>
  );
}
