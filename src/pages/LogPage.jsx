import {LargeSection} from "../components/commons/Section";
import {Card} from "../components/commons/Card";
import {LogBox} from "../components/service/log/LogBox";

export default function LogPage() {
    return (<LargeSection>
        <Card
            header={"로그 확인"}
            body={<LogBox/>}
            footer={""}
        />
    </LargeSection>);
}