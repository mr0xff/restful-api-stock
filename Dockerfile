FROM node 
WORKDIR /app
COPY . .
RUN npm install && npm run build:ts
EXPOSE 3000
CMD ["npm", "run", "start"]
