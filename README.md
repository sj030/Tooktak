# 👏 Tooktak 프로젝트
산학협력프로젝트 과목 (3230) 팀 프로젝트

## 실행 환경
- Linux(Ubuntu 등)
- WSL (Windows Subsystem for Linux)
- MacOS

## 실행 방법
### 1. Docker 설치
Docker를 설치합니다. 자세한 설치 방법은 [Docker 공식 문서](https://docs.docker.com/engine/install/)를 참조하세요.

### 2. `setup.sh` 스크립트 실행
프로젝트 루트 디렉토리로 이동하여 `setup.sh` 스크립트에 실행 권한을 부여한 후 실행합니다.
```
chmod +x setup.sh
./setup.sh
```
### 3. Docker Compose를 사용하여 컨테이너 빌드 및 실행
다음 명령어를 실행하여 Docker Compose를 사용하여 컨테이너를 빌드하고 실행합니다.   
```
(sudo) docker-compose up --build
```
### 4. 브라우저에서 서비스 접속
브라우저의 주소창에 `localhost`를 입력하여 서비스를 이용할 수 있습니다.


## 문제 해결
### MongoDB Compass와 연결되지 않는 경우
로컬에서 MongoDB가 이미 실행 중이라면 이를 중지합니다.
MongoDB Compass URI 입력란에 다음을 입력합니다.
```
mongodb://localhost:27017
```

