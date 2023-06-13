FROM node:18-alpine

# set working directory
WORKDIR /my-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm i react-router-dom
RUN npm install reactjs-popup --save
RUN npm install --save react-toastify

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]