import { LargeSection } from "../components/commons/Section";
import { Card } from "../components/commons/Card";
import { UserBox } from "../components/service/account/UserBox";
import { UserProvider } from "../contexts/UserContext";
import { UserFooter } from "../components/service/account/UserFooter";

export default function Admin() {
  return (
    <UserProvider>
      <LargeSection>
        <Card header={"사용자 계정"}
          body={<UserBox />}
          footer={<UserFooter />}
        />
      </LargeSection>
    </UserProvider>
  );
}
