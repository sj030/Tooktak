import { Button } from "../../commons/Button"
import { useLogs } from "../../../contexts/LogContext";

export function LogSearch() {
    const { fetchLogs } = useLogs();

    return (
        <>
            <Button onClick={() => fetchLogs(1)} children={"search"} />
        </>
    )
}
