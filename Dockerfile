# 1. Node.js bazaviy image
FROM node:24-alpine

# 2. App katalogi yaratamiz
WORKDIR /usr/src/app

# 3. package.json va package-lock.json copy qilamiz
COPY package*.json ./

# 4. Dependenciyalarni o‘rnatamiz
RUN npm install

# 5. TypeScript source copy qilamiz
COPY . .

# 6. Build qilamiz
RUN npm run build

# 7. Container ichida app ishga tushirish
CMD ["node", "dist/main.js"]

# 8. Portni ochamiz
EXPOSE 3002
