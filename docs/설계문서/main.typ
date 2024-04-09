#import "./template.typ": *

#show: project.with(title: title, authors: authors,)

= 프로젝트 소개
#indent 보이노시스 서비스는 음성 / 영상 데이터를 토대로 난청, 인지장애, 치매 질병 예방 및 관리를 목적으로 개발된 의료 AI 활용 디지털 헬스케어 서비스입니다. 기존 보이노시스 서비스에서는 사용자의 데이터를 이용해 AI 분석 결과를 얻는 과정에서 해당 데이터는 버려지고 있었습니다. 이번 프로젝트는 이 데이터를 효율적으로 저장 및 관리하는 도구를 제작하여 차후 AI 모델 성능 향상을 목적으로 합니다. 즉, 사내 관리자들이 데이터를 저장 및 분석할 수 있는 웹 서비스를 제공하는 것을 목표로 합니다.
= 기본 사항
== 작동 환경
#indent Docker Container를 이미지로 만들어 제공하기에 Docker Container를 실행할 수 있는 환경이 필요합니다.
== 프로그램 구성
#indent 프로그램은 다음과 같이 구성됩니다.
- Frontend: React.js
- Backend: Node.js
- Database: MongoDB(NoSQL)
- Container: Docker
== 프로그램 설치 및 실행
= 프로그램 사용 흐름도
= 용어
*숫자: * (서)아라비아 숫자 중 표준 키보드로 직접 입력할 수 있는 10개(U+0030 '0' \~ U+0039 '9')만을 뜻합니다. 즉, 이 문서에서 말하는 "숫자"에는 아라비아 숫자가 아닌 로마 숫자나 각 언어별 고유 숫자 기호들은 포함되지 않으며, 아라비아 숫자 중에서도 전각 숫자, 원·괄호로 둘러싸인 숫자, 위·아래 첨자용 숫자, 수식용 글꼴별 숫자 등은 모두 제외됩니다.

*개행: * 텍스트 형식의 파일을 편집할 때 표준 키보드의 #enter 키로 입력할 수 있는 두 문자들(U+000A Line Feed, U+000D Carriage Return) 중 하나 혹은 이들의 조합입니다. 텍스트 편집기에서 #enter 키를 누를 때, 둘 중 어떤 문자나 조합이 입력될 지는 운영체제 / 편집기마다 다르지만, 무조건 사용자가 사용하는 운영체제 / 편집기에서 입력되는 문자(조합)를 개행이라고 부르겠습니다. 사실, "넓은 의미의 개행"에는 이들 둘(의 조합) 외에도 세로 탭(U+000B Vertical Tab)이나 용지먹임(U+000C Form Feed) 등 몇 가지 문자들이 더 포함되지만, 이 기획서에서는 이런 문자들을 혹시 언급할 일이 있으면 반드시 ("개행"이 아니라) 각각의 구체적인 이름으로 부르겠습니다. 
= 데이터 요소
== 계정
#indent 계정과 관련된 데이터 요소 목록입니다. 
=== 아이디
#indent 계정의 아이디를 나타내는 문자열입니다.

*문법 형식: * 정규식 `^[a-zA_Z]+[a-zA-Z0-9]*$`

*의미 규칙: * 계정의 아이디는 고유해야 합니다. 즉, 중복되는 아이디가 존재해서는 안됩니다.
=== 비밀번호
#indent 계정의 비밀번호를 나타내는 문자열입니다.

*문법 형식: * 정규식 `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
=== 권한
#indent 계정의 권한을 나타내는 문자열입니다.

*문법 형식: * `<권한><개행>`

*의미 규칙: * `<권한>`은 admin, user1, user2 중 하나의 문자열이어야 합니다.
== 파일
#indent AI 분석에 사용되는 파일 데이터 요소 목록입니다.
=== 이름
#indent 파일의 이름을 나타내는 문자열입니다.

*문법 형식: * `<파일이름><개행>`

*의미 규칙: * `<파일이름>`은 여러 운영 체제 (Windows, Linux 및 MacOS)에서 유효해야 합니다.
=== 형식
#indent 파일의 확장자를 나타내는 문자열입니다.

*문법 형식: * `<확장자><개행>`

*의미 규칙: * `<확장자>`는 FTP 혹은 HTTP 방식으로 전송 가능한 파일 형식이어야 합니다.
=== 버전
#indent 병원에서 수집하는 파일 구조의 버전을 나타내는 양의 정수입니다.

*문법 형식: * 정규식 `^[1-9]+[0-9]*$`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
=== 챕터
#indent 파일이 어떠한 정보를 수집했는지를 나타내는 양의 정수입니다.

*문법 형식: * 정규식 `^[1-9]+[0-9]*$`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
=== 길이(크기)
#indent 파일의 길이를 초 단위로 나타내는 양의 정수입니다.

*문법 형식: * 정규식 `^[1-9]+[0-9]*$`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
=== 생성 일시
#indent 파일이 생성된 일시를 나타내는 문자열입니다.

*문법 형식: * 정규식 `[0-9]{4}-[0-9]{2}-[0-9]{2}`
- `YYYY-MM-DD` 문자열 형식입니다.

*의미 규칙: *
- `MM`을 올바르게 변환했을 때, 1 이상 12 이하의 정수입니다.
- `DD`를 올바르게 변환했을 때, 1 이상 31 이하의 정수이며, YYYY년 DD월에 존재하는 날짜를 나타내야 합니다. 예를 들어, 윤년 2월의 경우 DD가 올바르게 변환되었을 때 1 이상 29 이하의 값이어야 합니다.

=== 유저
#indent 파일을 수집한 유저의 정보를 나타내는 데이터 요소입니다.
==== 이름
#indent 파일을 수집한 유저의 이름을 나타내는 문자열입니다.

*문법 형식: * `<이름><개행>`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
==== 나이
#indent 파일을 수집한 유저의 나이를 나타내는 양의 정수입니다.

*문법 형식: * 정규식 `^[1-9]+[0-9]*$`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
==== 성별
#indent 파일을 수집한 유저의 성별을 나타내는 문자열입니다.

*문법 형식: * 정규식 `^(M|F)$`
==== AI 분석 결과
#indent 파일을 기반으로 생성된 AI 분석 결과인 MMSE 점수를 나타내는 정수입니다.

*문법 형식: * 정규식 `^[1-9]+[0-9]*$`

*의미 규칙: * MMSE 점수는 0 이상 30 이하의 값이어야 합니다.
==== 장소
#indent 파일을 수집된 장소의 이름을 나타내는 문자열입니다.

*문법 형식: * `<장소><개행>`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
=== 저장 경로
#indent 파일이 저장된 경로를 나타내는 문자열입니다.

*문법 형식: * `<경로><개행>`

*의미 규칙: * 추가적인 의미 규칙이 존재하지 않습니다.
=== 이외의 데이터 요소
#indent 이외의 데이터 요소들이 파일에 추가될 수 있습니다.
= 데이터 파일
== 병원 데이터 파일
== 보이노시스 서비스 데이터 파일
== 로그 파일
= 데이터베이스 구조
= API 목록
== 계정
#indent 계정과 관련된 API 목록입니다.
=== 로그인
#prompt(
```js
import axios from 'axios';

// 로그인 정보
var account = {
    id: 'id', 
    password: 'password'
};

try {
    var response = await axios.post('http://localhost:3001/account/login', account);
} catch (error) {

}
``` 
)
=== 로그아웃
#prompt(
```js
import axios from 'axios';

try {
    var response = await axios.get('http://localhost:3001/account/logout');
} catch (error) {

}
``` 
)
=== 서브 관리자 계정 생성
#prompt(
```js
import axios from 'axios';

// 추가하려는 계정 정보
var account = {
    id: 'id', 
    password: 'password',
    permission: 'permission'
};

try {
    var response = await axios.post('http://localhost:3001/account/create', account);
} catch (error) {

}
```
)
=== 서브 관리자 계정 제거
#prompt(
```js
import axios from 'axios';

// 삭제하려는 계정 정보
var account = {
    id: 'id'
};

try {
    var response = await axios.post('http://localhost:3001/account/delete', account);
} catch (error) {

}
```
)
=== 서브 관리자 계정 목록
#prompt(
```js
import axios from 'axios';

try {
    var response = await axios.get('http://localhost:3001/account/list');
} catch (error) {

}
```
)
=== 관리자 계정 아이디 및 비밀번호 재설정
#prompt(
```js
import axios from 'axios';

// 변경하려는 계정 정보
var account = {
    id: 'id', 
    password: 'password'
};

try {
    var response = await axios.post('http://localhost:3001/account/reset', account);
} catch (error) {

}
```
)
=== 로그 확인
#prompt(
```js
import axios from 'axios';

try {
    var response = await axios.get('http://localhost:3001/account/log');
} catch (error) {

}
```
)
== 파일
#indent 파일과 관련된 API 목록입니다.
=== 파일 업로드
#prompt(
```js
import axios from 'axios';

// 업로드할 파일
var onSubmit = async (e) => {
    e.preventDefault();
    e.persist();
    var file = new FormData();
    for (var i = 0; i < e.target.files.length; i++) {
        file.append('file', e.target.files[i]);
        var metaData = {
            name: 'name',
            format: 'format',
            version: 'version',
            chapter: 'chapter',
            length: 'length',
            created: 'created',
            user: {
                name: 'name',
                age: 'age',
                gender: 'gender',
                mmse: 'mmse',
                place: 'place'
            },
            path: 'path'
        };
        file.append('metaData', JSON.stringify(metaData));
    }

    try {
        var response = await axios.post('http://localhost:3001/file/upload', file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    } catch (error) {

    }
}
```
)
=== 파일 다운로드
#prompt(
```js
import axios from 'axios';
```
)
=== 파일 검색
#prompt(
```js
import axios from 'axios';

// 검색할 파일 정보
var filter = "";

try {
    var response = await axios.get('http://localhost:3001/file/search', {
        params: {
            filter: filter
        }
    });
} catch (error) {

}
```
)
= 프로그램 실행 화면
== 로그인 화면
== 메인 화면
== 계정 관리 화면
=== 생성
=== 삭제
== 데이터 관리 화면
=== 삽입
=== 삭제
== 데이터 분석 화면
=== 필터링
=== 로그
