import {Table} from "../../commons/Table";
import {Grid} from "../../layout/Grid";
import {DropBox} from "../../commons/DropBox";
import RangeBox from "../../commons/RangeBox";
import {TextBox} from "../../commons/TextBox";

export function LogBox() {
    return <>
        <Grid min={7}>
            <DropBox label={"이름"} options={[]}/>
            <DropBox label={"소속"} options={[]}/>
            <RangeBox label={"시간"}/>
            <DropBox label={"요청 로그"} options={[]}/>
            <TextBox label={"ip"}/>
            <TextBox label={"file_id"}/>
        </Grid>
        <Table
            header={["이름", "id", "소속", "시간", "요청 로그", "ip", "file_id"]}
            items={[
                ["김철수", "kim", "개발팀", "2021-09-01 12:00:00", "로그인", "132.15.51.64", "1"],
                ["김철수", "kim", "개발팀", "2021-09-01 12:00:00", "파일 업로드", "192.168.0.14", "2"],
                ["김철수", "kim", "개발팀", "2021-09-01 12:00:00", "파일 삭제", "164.142.2.41", "3"],
                ["김철수", "kim", "개발팀", "2021-09-01 12:00:00", "로그아웃", "142.143.1.42", "4"],
            ]}
        />
    </>;
}