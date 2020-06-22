FROM node:12.16.2

COPY ./src /usr/src/organic_food_app

WORKDIR /usr/src/organic_food_app

RUN npm install
RUN npm install -g nodemon

CMD ["npm", "run", "start"]
