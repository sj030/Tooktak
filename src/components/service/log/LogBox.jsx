import { LTable } from "../../commons/LTable";
import { Grid } from "../../layout/Grid";
import { DropBox } from "../../commons/DropBox";
import RangeBox from "../../commons/RangeBox";
import { TextBox } from "../../commons/TextBox";
import { useLogs } from "../../../contexts/LogContext";
import { useQueryParams } from "../../../contexts/Querycontext";
import { useUpdateQueryParams } from "../../../contexts/Querycontext";
export function LogBox() {
    const logsObject = useLogs();
    const logs = logsObject.logs || [];
    const { queryParams } = useQueryParams();
    const updateQueryParams = useUpdateQueryParams();
    const items = Array.isArray(logs) ? logs.map(log => [
        log.timestamp, log.level, log.message, log.meta?.username, log.meta?.ip, log.meta?.requestUrl, log.meta?.f_name, log.meta?.error
    ]) : [];
    const {startDate, setStartDate, endDate, setEndDate} = useLogs();
    return (
        <>
            <Grid min={7}>
                <TextBox label={"username"} placeholder="홍길동" field={"username"} value={queryParams.username} setValue={(value)=>updateQueryParams('username', value)}/>
                <DropBox label={"role"} options={["user", "admin"]} field={"role"} value={queryParams.role} setValue={(value)=>updateQueryParams('role', value)}/>
                <TextBox label={"ip"} placeholder="192.168.0.1" field={"ip"} value={queryParams.ip} setValue={(value)=>updateQueryParams('ip', value)}/>
                <TextBox label={"f_name"} placeholder="홍길동.txt" field={"f_name"} value={queryParams.f_name} setValue={(value)=>updateQueryParams('f_name', value)}/>
                <RangeBox label={"date"} placeholder1={"YYYY-MM-DD"} placeholder2={"YYYY-MM-DD"} field={"date"} start={startDate} end={endDate} setStart={(start) => setStartDate(start)} setEnd={(end) => setEndDate(end)}/>
            </Grid>
            <LTable
                header={["timestamp", "level", "message", "username", "ip", "requestUrl", "f_name", "error"]}
                items={items}
            />
        </>
    );
}
