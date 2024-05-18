import { Button } from "../../commons/Button"
import { useQueryParams, useSetDateRange } from "../../../contexts/Querycontext";
import { useSyncQueryParams } from "../../../services/log";
import { useLogs } from "../../../contexts/LogContext";
export function LogSearch() {
    const { queryParams, startDate, endDate } = useQueryParams();
    const syncQueryParams = useSyncQueryParams();
    const { fetchLogs } = useLogs();
    const setDateRange = useSetDateRange();

    const handleSearch = (e) => {
        e.preventDefault();
        if (startDate && endDate) {
            setDateRange(startDate, endDate);
            syncQueryParams({ ...queryParams, date: `${startDate}_to_${endDate}` });
        } else {
            syncQueryParams(queryParams);
        }
        fetchLogs();
    };
    return (
        <>
            <Button onClick={handleSearch} children={"search"} />
        </>
    )
}