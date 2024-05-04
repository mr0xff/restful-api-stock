import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";

config();

const conn =  connect(`${process.env.DATABASE_URI}/${process.env.DATABASE}`)
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

app.use('/groups', productGroupRoute);
app.use('/product', productRoute);
app.use('/stock', productStockRoute);

app.listen(process.env.PORT, ()=> {
  console.log(`\tapi: http://localhost:${process.env.PORT}`);
  console.log(`\tapi-docs: http://localhost:${process.env.PORT}/doc\n`);
});
