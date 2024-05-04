import { LargeSection } from "../components/commons/Section";
import { Card } from "../components/commons/Card";
import { Table } from "../components/commons/Table";
import {Button} from "../components/commons/Button";
export default function Admin() {
  return (
    <LargeSection>
      <Card header={"사용자 계정"} footer={<Button children={"계정 삭제"} color={"red"}/>}>
        <Table
          header={["이름", "id", "소속"]}
          items={[
            ["문찬규", "정상", "개발자"],
            ["김민수", "정상", "분석가"],
            ["이상민", "정상", "분석가"],
          ]}
        />
      </Card>
    </LargeSection>
  );
}
