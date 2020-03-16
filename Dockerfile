FROM node:alpine

# used for git dependency
RUN apk add --update git

WORKDIR /app

COPY ./package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "start"]