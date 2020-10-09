FROM node:12.18.3-alpine

RUN mkdir -p /dist/related

WORKDIR /dist/related

COPY . /dist/related

RUN npm install

RUN npm run build

RUN cd server && npm install

EXPOSE 3004

CMD ["npm", "run", "server"]



