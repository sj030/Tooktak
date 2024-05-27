import { LargeSection } from "../components/commons/Section";
import { Card } from "../components/commons/Card";
import { LogBox } from "../components/service/log/LogBox";
import { QueryProvider } from "../contexts/Querycontext";
import { LogProvider } from "../contexts/LogContext";
import { LogSearch } from "../components/service/log/LogSearch";

export default function LogPage() {
    return (
        <QueryProvider>
            <LogProvider>
                <LargeSection>
                    <Card
                        header={"로그 확인"}
                        body={
                            <LogBox />
                        }
                        footer={
                            <>
                                <LogSearch /><p className="mx-1" />
                            </>
                        }
                    />
                </LargeSection>
            </LogProvider>
        </QueryProvider>
    )
}