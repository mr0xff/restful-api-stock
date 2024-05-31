import express from "express";
import { config } from "dotenv";
import { connect, set } from "mongoose";
import cors from 'cors';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { serve, setup } from 'swagger-ui-express';

config();

process.env.NODE_ENV=='development' && set('debug', true);

connect(`${process.env.DATABASE_URI}/${process.env.DATABASE}`)
.then(()=>{
  console.log('[+] connected sucessful :)',);
})
.catch((err)=>{
  console.log('[-] cannot to connect to server :(');
  console.error(`[DETAIL]`, err.message);
});

const app = express();
const file = readFileSync(process.env.API_DOC_FILE, 'utf-8');
const swaggerDocument = parse(file);

app.use(express.json());
app.use(cors());

import productGroupRoute from "./api/product-groups.mjs";
import productRoute from "./api/product.mjs";
import productStockRoute from "./api/product-stock.mjs";
import productLogsRoute from "./api/product-logs.mjs";

app.use('/v1/groups', productGroupRoute);
app.use('/v1/product', productRoute);
app.use('/v1/stock', productStockRoute);
app.use('/v1/moviments', productLogsRoute);

app.listen(process.env.PORT, ()=> {
  console.log(`\tbase url: http://localhost:${process.env.PORT}`);
  console.log(`\tapi documentation (swagger ui): http://localhost:${process.env.PORT}/doc -> open this link on your browser`);
  console.log(`\taddress of mongoDb: ${process.env.DATABASE_URI}`);
  console.log(`\tmode: ${process.env.NODE_ENV}`);
  console.log('To change any think open the *.env* file')
});

app.use('/doc', serve, setup(swaggerDocument));
