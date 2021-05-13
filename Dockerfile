FROM node:14-alpine AS build
WORKDIR /srv
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn run tsc
RUN rm -rf node_modules
RUN yarn install --prod --frozen-lockfile

FROM node:14-alpine
WORKDIR /usr/src/app

RUN npm install pm2 -g
COPY --from=build /srv/.env .
COPY --from=build /srv/node_modules node_modules
COPY --from=build /srv/dist .

CMD ["pm2-runtime", "app.js"]
