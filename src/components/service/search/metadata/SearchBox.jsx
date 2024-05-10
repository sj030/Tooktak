import {SmallSection} from "../../../commons/Section";
import {Card} from "../../../commons/Card";
import Hospital from "./Hospital";
import AttributeList from "./AttributeList";
import SearchButtons from "./SearchButtons";
import {FilterProvider} from "../../../../contexts/FilterContext";


export default function SearchBox() {
    return (
        <SmallSection>
                <FilterProvider>
                    <Card
                        header={<Hospital />}
                        body={<AttributeList/>}
                        footer={<SearchButtons/>}
                    />
                </FilterProvider>
        </SmallSection>
    );
}

