import { LoginBox } from "../components/service/LoginBox";

export default function Login() {
  return <LoginBox />;
}

const data={
  "status": "success",
  "metadata": {
    "attributes": [
      {
        "name": "나이",
        "class": "range",
        "type": "int",
        "allowedRange":[1,100],
      },
      {
        "name": "성별",
        "class": "select",
        "allowedValues": ["남", "여"]
      },
      {
        "name": "이름",
        "class": "input",
        "allowedLength":[1,5],
      },
      {
        "name": "최종 학력",
        "class": "select",
        "allowedValues": ["초졸", "중졸","고졸","대졸","대학원졸"],
      },
      {
        "name":"난청 모델 점수",
        "class":"range",
        "type":"int",
        "allowedRange":[1,10],
      }
    ]
  }
}

