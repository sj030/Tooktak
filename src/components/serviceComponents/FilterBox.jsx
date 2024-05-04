import { SmallSection } from "../commons/Section";
import { Card } from "../commons/Card";
import { getFilter } from "../../services/search";
import { useEffect, useState } from "react";
import { Button, RedButton } from "../commons/Button";
import { DropDownCombobox, HospitalFilter } from "../commons/DropDown";
export default function FilterBox({ onSearch }) {
  const [filter, setFilter] = useState({});
  useEffect(() => {
    setFilter(getFilter());
  }, []);

  return (
    <SmallSection>
      <Card
        header={
          <div className="columns">
            <div className="column is-6">병원 선택</div>
            <div className="column is-6">
              <DropDownCombobox label={"서울대학교병원"} options={[]} />
            </div>
          </div>
        }
        footer={
          <>
            <Button onClick={() => onSearch(filter)} children={"검색"} />
            <Button onClick={() => setFilter({})} children={"리셋"} color={"red"} />
          </>
        }
      >
        <DropDownCombobox label={"성별"} options={["남", "여"]} />
        <DropDownCombobox label={"나이"} options={["10대", "20대"]} />
        <DropDownCombobox label={"인지장애"} options={["1", "2", "3"]} />
      </Card>
    </SmallSection>
  );
}
