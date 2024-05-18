import { LTable } from "../../commons/LTable";
import { Grid } from "../../layout/Grid";
import { DropBox } from "../../commons/DropBox";
import DateBox from "../../commons/DateBox";
import { TextBox } from "../../commons/TextBox";
import { useLogs } from "../../../contexts/LogContext";
import { useQueryParams, useSetEnd, useSetStart } from "../../../contexts/Querycontext";
import { useUpdateQueryParams } from "../../../contexts/Querycontext";
export function LogBox() {
    const logsObject = useLogs();
    const logs = logsObject.logs || [];
    const { queryParams, startDate, endDate } = useQueryParams();
    const updateQueryParams = useUpdateQueryParams();
    const setStartDate = useSetStart();
    const setEndDate = useSetEnd();
    const items = Array.isArray(logs) ? logs.map(log => [
        log.timestamp, log.level, log.message, log.meta?.username, log.meta?.ip, log.meta?.requestUrl, log.meta?.f_name, log.meta?.error
    ]) : [];

    console.log(queryParams);
    return (
        <>
            <DateBox
                label={"date"}
                field={"date"}
                start={startDate}
                end={endDate}
                setStart={(value) => setStartDate(value)}
                setEnd={(value) => setEndDate(value)} />
            <Grid min={7}>
                <TextBox
                    label={"username"}
                    placeholder="홍길동"
                    field={"username"}
                    value={queryParams.username}
                    setValue={(value) => updateQueryParams('username', value)} />
                <DropBox
                    label={"role"}
                    options={["user", "admin"]}
                    field={"role"} value={queryParams.role}
                    setValue={(value) => updateQueryParams('role', value)} />
                <TextBox
                    label={"ip"}
                    placeholder="192.168.0.1"
                    field={"ip"} value={queryParams.ip}
                    setValue={(value) => updateQueryParams('ip', value)} />
                <TextBox
                    label={"f_name"}
                    placeholder="홍길동.txt"
                    field={"f_name"}
                    value={queryParams.f_name}
                    setValue={(value) => updateQueryParams('f_name', value)} />
            </Grid>


            <LTable
                header={["timestamp", "level", "message", "username", "ip", "requestUrl", "f_name", "error"]}
                items={items}
            />
        </>
    );
}
