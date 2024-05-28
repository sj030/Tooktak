import React from 'react';
import { LTable } from "../../commons/LTable";
import { Grid } from "../../layout/Grid";
import { DropBox } from "../../commons/DropBox";
import { TextBox } from "../../commons/TextBox";
import DateBox from "../../commons/DateBox";
import { useLogs } from "../../../contexts/LogContext";
import { useQueryParams, useSetStart, useSetEnd, useSetDateRange } from "../../../contexts/Querycontext";
import { useUpdateQueryParams } from "../../../contexts/Querycontext";
import { LogPagination } from "./LogPagination";
import moment from 'moment-timezone';

export function LogBox() {
    const logsObject = useLogs();
    const logs = logsObject.logs || [];
    const { queryParams, startDate, endDate } = useQueryParams();
    const updateQueryParams = useUpdateQueryParams();
    const setStartDate = useSetStart();
    const setEndDate = useSetEnd();
    const setDateRange = useSetDateRange();

    const items = Array.isArray(logs) ? logs.map(log => [
        moment(log.timestamp).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss'), // timestamp를 한국 시간으로 변환
        log.level,
        log.message,
        log.meta?.username,
        log.meta?.ip,
        log.meta?.requestUrl,
        log.meta?.f_name,
        log.meta?.error
    ]) : [];

    return (
        <>
            <DateBox
                label={"date"}
                start={startDate}
                end={endDate}
                setStart={(value) => setStartDate(value)}
                setEnd={(value) => setEndDate(value)}
                setDateRange={(start, end) => setDateRange(start, end)} // setDateRange 전달
            />
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
            {logs.length > 0 && <LogPagination />}
        </>
    );
}
