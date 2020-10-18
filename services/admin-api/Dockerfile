FROM node:12-slim
ARG SERVICE_PATH=services/admin-api
WORKDIR /app
COPY ./local-packages /app/packages/
RUN for D in /app/packages/*; do npm ci --prod --prefix $D; done
COPY ./package*.json /app/${SERVICE_PATH}/
RUN npm ci --prod --prefix ${SERVICE_PATH}

FROM node:12-slim
ARG SERVICE_PATH=services/admin-api
WORKDIR /app
COPY --from=0 /app .
COPY . ./${SERVICE_PATH}/
RUN rm -fr ./${SERVICE_PATH}/local-packages
CMD ["node", "./services/admin-api/src/index.js"]