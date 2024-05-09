import express from "express";
import { config } from "dotenv";
import { connect, set } from "mongoose";

config();

process.env.NODE_ENV='development' && set('debug', true);

connect(`${process.env.DATABASE_URI}/${process.env.DATABASE}`)
.then(()=>{
  console.log('[+] connected sucessful :)',);
})
.catch((err)=>{
  console.log('[-] cannot to connect to server :(');
});

const app = express();
app.use(express.json());

import productGroupRoute from "./api/product-groups.mjs";
import productRoute from "./api/product.mjs";
import productStockRoute from "./api/product-stock.mjs";
import productLogsRoute from "./api/product-logs.mjs";

app.use('/groups', productGroupRoute);
app.use('/product', productRoute);
app.use('/stock', productStockRoute);
app.use('/moviments', productLogsRoute);

app.listen(process.env.PORT, ()=> {
  console.log(`\tapi: http://localhost:${process.env.PORT}`);
  console.log(`\tapi-docs: http://localhost:${process.env.PORT}/doc\n`);
});
