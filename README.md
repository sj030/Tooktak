## 👏 Tooktak 프로젝트
산학협력프로젝트 과목 (3230) 팀 프로젝트

## 프로젝트 설명
이 프로젝트는 클라우드 인스턴스에서 실행되는 풀스택 애플리케이션입니다.   
리액트 프론트엔드와 Node.js 백엔드로 구성되어 있으며, Nginx를 사용하여 리버스 프록시와 정적 파일 서빙을 담당합니다.   
인증서는 Let's Encrypt를 사용하여 HTTPS를 지원합니다.

## 배포 준비
### 1. 인스턴스 생성

GCP 또는 AWS에서 인스턴스를 생성합니다.
인스턴스의 방화벽 설정에서 TCP 포트 80과 443을 엽니다.
### 2. 도메인 설정

인스턴스의 고정 IP를 사용하여 도메인을 구입하거나 설정합니다.
### 3. 리포지토리 클론

인스턴스의 SSH에 접속하여 프로젝트 리포지토리를 클론합니다.

```
git clone https://github.com/your-repo/Tooktak.git

cd Tooktak
```

## 환경 설정

### 1. Nginx 설정
- /frontend/nginx.conf 파일을 열어 tooktak1234.duckdns.org 모든 부분을 설정한 도메인으로 변경합니다.
- 인증서를 처리하기 위해 주석에 맞추어 코드를 주석처리합니다.

### 2. 설치 스크립트 실행
- 프로젝트 루트에서 설치 스크립트를 실행하여 필요한 설정을 완료합니다.
```
chmod +x ./setup.sh
./setup.sh
```

### 3. Docker Compose 빌드 및 실행
- Docker Compose를 사용하여 애플리케이션을 빌드하고 실행합니다.
```
sudo docker-compose up --build -d
```

## SSL 인증서 발급
### 1. Let's Encrypt 인증서 발급
- Certbot을 사용하여 SSL 인증서를 발급받습니다. 이메일과 도메인을 적절히 입력합니다.
```
sudo docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot --webroot-path=/var/www/certbot \
  --email yourEmail@example.com --agree-tos --no-eff-email \
  -d yourDomain
```

### 2. Docker Compose 중지
- 인증서 발급 후 Docker Compose를 중지합니다.

```
sudo docker-compose down
```

### 3. Nginx 설정 업데이트
- /frontend/nginx.conf 파일에서 주석을 해제합니다.
- tooktak1234.duckdns.org 모든 부분이 설정한 도메인으로 변경되었는지 검토합니다.

```
server {
    listen 443 ssl;
    server_name yourDomain;  
    ssl_certificate /etc/letsencrypt/live/yourDomain/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourDomain/privkey.pem;
    ...
}
```
### 4. Docker Compose 재실행
- 변경된 설정을 적용하기 위해 Docker Compose를 다시 빌드하고 실행합니다.

```
sudo docker-compose up --build -d
```

## 서비스 접근
- 브라우저에서 설정한 도메인으로 접속하여 서비스를 이용할 수 있습니다.

## 인증서 자동 갱신 (옵션)
Let's Encrypt 인증서는 90일 동안 유효합니다. 인증서 자동 갱신을 설정하여 갱신을 자동화할 수도 있습니다.
