FROM node:12-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --prod

FROM node:12-slim
WORKDIR /app
COPY --from=0 /app .
COPY . .
CMD ["node", "src/index.js"]