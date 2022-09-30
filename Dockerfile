FROM node:lts

WORKDIR /srv/chowder-cms

COPY . .

RUN yarn install

ENTRYPOINT ["yarn", "dev"]
