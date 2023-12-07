FROM node:20-alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

#CMD ["npm", "run", "migrate:run"]

CMD ["npm", "run", "start"]
