import { Button } from "../../commons/Button";
import { useLogs } from "../../../contexts/LogContext";
import { useQueryParams, useSetDateRange } from "../../../contexts/Querycontext";
import { useSyncQueryParams } from "../../../services/log";
import moment from 'moment-timezone';

export function LogSearch() {
  const { fetchLogs } = useLogs();
  const { queryParams, startDate, endDate } = useQueryParams();
  const syncQueryParams = useSyncQueryParams();
  const setDateRange = useSetDateRange();

  const handleSearch = () => {
    if (startDate && endDate) {
      const adjustedStartDate = moment(startDate).tz('Asia/Seoul').startOf('day').toDate();
      const adjustedEndDate = moment(endDate).tz('Asia/Seoul').endOf('day').toDate();
      setDateRange(adjustedStartDate, adjustedEndDate);
      syncQueryParams({ ...queryParams, date: `${adjustedStartDate.toISOString()}_to_${adjustedEndDate.toISOString()}` });
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
