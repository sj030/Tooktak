# Tooktak
산학협력프로젝트 과목 (3230) 팀프로젝트입니다. 

## 실행 방법
터미널을 각각 `Tooktak\backend`와 `Tooktak\frontend`의 경로로 이동해주세요.
- `npm install` 명령어로 `package.json` 내의 모듈을 설치합니다.
    - 만약, 동작하지 않는다면 `npm update` 로 업데이트를 진행해주세요.
    - 그래도 동작하지 않는다면 `npm cache clean` 및 `npm uninstall` 명령어를 사용해 모듈을 삭제 후 다시 시도해주세요.
- `npm run dev` 명령어로 프로그램을 실행할 수 있습니다.
    - 코드 수정 시, 새로 고침을 해주면 즉시 반영됩니다.

실행되는 포트 번호입니다.
- frontend: 3000
- backend: 3001

<details>
<summary>API</summary>

## API
기본적으로 `axios`가 임포트 되어 있는 상황을 가정합니다.
```js
import axios from 'axios';
```

<details>
<summary>계정</summary>

### 계정
#### 로그인
```js
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
#### 로그아웃
```js
try {
    var response = await axios.get('http://localhost:3001/account/logout');
} catch (error) {

}
```
#### 서브 관리자 계정 생성
```js
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
#### 서브 관리자 계정 제거
```js
// 삭제하려는 계정 정보
var account = {
    id: 'id'
};

try {
    var response = await axios.post('http://localhost:3001/account/delete', account);
} catch (error) {

}
```
#### 서브 관리자 계정 목록
```js
try {
    var response = await axios.get('http://localhost:3001/account/list');
} catch (error) {

}
```
#### 관리자 계정 아이디 및 비밀번호 재설정
```js
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
#### 로그 확인
```js
try {
    var response = await axios.get('http://localhost:3001/account/log');
} catch (error) {

}
```
</details>

<details>
<summary>파일</summary>

### 파일
#### 파일 업로드
```js
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
#### 파일 다운로드
```js
```
#### 파일 검색
```js
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
</details>
</details>
