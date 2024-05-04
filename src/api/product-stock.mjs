import { Router } from "express";
import productStockModel from "../models/product-stock.mjs";

const productStockRoute = Router();

productStockRoute.get('/', async(req, res)=>{
  try{
    const productGroups = await productStockModel.find();
    res.send(productGroups);
  }catch(err){
    res.status(500).send({
      message: "error on server",
      detail: err.message,
    });
  }
});

productStockRoute.post('/', async(req, res)=>{
  try{
    const { 
      productId,
      quantity,
      lote,
      date 
    } = req.body;
    
    if(productId && quantity && lote && date){
      const createProductStock = await productStockModel({
        productId, 
        quantity,
        lote,
        date
      });

      await createProductStock.save();

      return res.status(202).send({
        message: 'stock was created :)',
        detail: createProductStock._id
      });
    }

    res.status(400).send({
      message: 'empty :(',
      detail: 'need all required fields :/'
    });

  }catch(err){
    res.status(400).send({
      message: 'error',
      detail: err.message
    })
  }
});

productStockRoute.delete('/:productId', async(req, res)=>{
  try{
    const { productId } = req.params;

    const productDeleted = await productStockModel.findByIdAndDelete(productId);
    
    if(!productDeleted)
      return res.status(404).send({
        message: 'product stock not exist :('
      });
    
    res.send({
      message: "stock was deleted :)"
    });
  }catch(err){
    res.status(400).send({
      message: "error",
      detail: err.message
    });
  }
});

export default productStockRoute;