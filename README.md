# Tooktak
산학협력프로젝트 과목 (3230) 팀프로젝트입니다. 

## 실행 방법
### 공통
- 터미널을 각각 `Tooktak\backend`와 `Tooktak\frontend`의 경로로 이동해주세요.
- `npm install` 명령어로 `package.json` 내의 모듈을 설치합니다.
    - 만약, 동작하지 않는다면 `npm update` 로 업데이트를 진행해주세요.
    - 그래도 동작하지 않는다면 `npm cache clean` 및 `npm uninstall` 명령어를 사용해 모듈을 삭제 후 다시 시도해주세요.
 
### Tooktak\frontend     
### Tooktak\backend
- `cp .env.example .env` 명령어를 사용해 `.env`파일을 세팅해주세요.
-  로컬에서 `mongodb`를 설치 및 실행해주세요. [install mongodb community-edition](https://www.mongodb.com/ko-kr/docs/manual/administration/install-community/)
    - url을 `mongodb://127.0.0.1:27017/voinosis`로 세팅해주세요.  `# voinosis : database명` 
    - `MongoDB Compass`를 사용하면 GUI로 이용할 수 있습니다.             
- `npm run dev` 명령어로 프로그램을 실행할 수 있습니다.
    - 코드 수정 시, 새로 고침을 해주면 즉시 반영됩니다.
- `npm run test` 명령어로 테스트를 실행할 수 있습니다. 
    - 테스트 코드는 `Tooktak\backend\tests` 경로에 있습니다.
    - 테스트 코드를 작성할 때는 `*.test.js`로 파일명을 작성해주세요.
    - vscode `Test Explorer UI`와 `jest` extension을 설치하면 GUI로 테스트를 실행할 수 있습니다. 
-------------------------------------------------------
실행되는 포트 번호입니다.
- frontend: 3000
- backend: 3001