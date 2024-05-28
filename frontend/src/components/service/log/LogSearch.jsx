import { Button } from "../../commons/Button";
import { useLogs } from "../../../contexts/LogContext";
import { useQueryParams, useSetDateRange } from "../../../contexts/Querycontext";
import { useSyncQueryParams } from "../../../services/log";

export function LogSearch() {
    const { fetchLogs } = useLogs();
    const { queryParams, startDate, endDate } = useQueryParams();
    const syncQueryParams = useSyncQueryParams();
    const setDateRange = useSetDateRange();
    const handleSearch = () => {
        if (startDate && endDate) {
            setDateRange(startDate, endDate);
            syncQueryParams({ ...queryParams, date: `${startDate}_to_${endDate}` });
        } else {
            syncQueryParams(queryParams);
        }
        fetchLogs(1);
    };

    return (
        <>
            <Button onClick={handleSearch} children={"search"} />
        </>
    );
}
