FROM node:20

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

# .env.example 파일을 .env 파일로 복사
RUN cp .env.example .env

COPY ../wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

EXPOSE 3001

CMD ["./wait-for-it.sh", "mongo:27017", "--", "node", "bin/www"]
