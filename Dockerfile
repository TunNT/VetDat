FROM node:14

WORKDIR /app

COPY . .

RUN rm -rf node_modules/
RUN rm -rf dist/

COPY .env.example .env
RUN yarn install

EXPOSE 8001

CMD [ "yarn", "dev" ]