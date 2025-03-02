FROM node
RUN mkdir /home/elliot
RUN useradd -d /home/elliot elliot
RUN chown -R elliot:elliot /home/elliot
USER elliot
WORKDIR /app
RUN git clone https://github.com/mr0xff/restful-api-stock.git
WORKDIR /app/restful-api-stock
RUN npm install 
RUN npm run build:ts
EXPOSE 3000
CMD ["npm", "run", "start"]
