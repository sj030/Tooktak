import { Button } from "../../commons/Button"
import { useQueryParams } from "../../../contexts/Querycontext";
import { useLogs } from "../../../contexts/LogContext";

export function LogPrevPage() {
    const { queryParams } = useQueryParams();
    const pageNum = queryParams.page;
    const { updateAndFetchLogs } = useLogs();

    const handlePrevPage = (e) => {
        e.preventDefault();
        updateAndFetchLogs("page", pageNum === 1 ? 1 : pageNum - 1);
    };

    return (
        <>
            <Button
                color="purple" 
                onClick={handlePrevPage} children={"prev page"} />
        </>
    )
}