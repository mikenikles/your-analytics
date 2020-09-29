FROM mhart/alpine-node:12
ARG SERVICE_PATH=services/events-api
WORKDIR /app
COPY ./local-packages /app/packages/
COPY ./package*.json /app/${SERVICE_PATH}/
RUN npm ci --prod --prefix ${SERVICE_PATH}

FROM mhart/alpine-node:slim-12
ARG SERVICE_PATH=services/events-api
WORKDIR /app
COPY --from=0 /app .
COPY . ./${SERVICE_PATH}/
RUN rm -fr ./${SERVICE_PATH}/local-packages
CMD ["node", "./services/events-api/src/index.js"]