FROM node
WORKDIR /app
COPY src /app
COPY package.json /app
COPY .gitignore /app
