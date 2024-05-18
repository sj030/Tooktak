import { Button } from "../../commons/Button"
import { useQueryParams, useSetDateRange } from "../../../contexts/Querycontext";
import { useSyncQueryParams } from "../../../services/log";
import { useLogs } from "../../../contexts/LogContext";
export function LogSearch() {
    const params  = useQueryParams();
    const pageNum = params.queryParams.page;
    const syncQueryParams = useSyncQueryParams();
    const setDateRange = useSetDateRange();
    const { fetchLogs, start, end } = useLogs();

    console.log(pageNum);
    const handleSearch = (e) => {
        e.preventDefault();
        if(start && end){
            setDateRange(start, end);
        }
        syncQueryParams(params);
        fetchLogs();
    };
    return (
        <>
            <Button onClick={handleSearch} children={"search"} />
        </>
    )
}