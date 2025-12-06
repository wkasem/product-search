FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install knex -g
RUN apk add --no-cache bash

COPY . .


RUN chmod +x docker-entrypoint.sh wait-for-it.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "run", "dev"]
