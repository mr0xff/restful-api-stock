import { Router } from "express";
import productStockModel from "../models/product-stock.mjs";
import productModel from '../models/product.mjs'
import movimentsModel from "../models/moviments.mjs";

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

productStockRoute.get('/:productId', async(req, res)=>{
  try{
    const { productId } = req.params;
    const allProductStock = await productStockModel.find({productId});
    
    if(!allProductStock.length){
      const productName = await productModel.findById({_id: productId}).select({name: 1});
      if(!productName)
        return res.status(404).send({
          message: 'this product not exist!'
        });
      return res.status(404).send({
        message: `${productName.name} do not have stock`,
      });
    }
    res.send(allProductStock);
  }catch(err){
    res.status(500).send({
      message: "error",
      detail: err.message,
    });
  }
})

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

      const stockMovimentLog = await movimentsModel({
        productStockId: createProductStock._id,
        quantity,
        type: 'in'
      });

      await stockMovimentLog.save();

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

productStockRoute.get('/:stockId/stock', async(req, res)=>{
  try{
    const { stockId } = req.params;
    const productStock = await productStockModel.findOne({_id: stockId});
    
    if(!productStock)
      return res.status(404).send({
        message: 'this stock not exist!',
        status: false
      });

    res.send(productStock);
  }catch(err){
    res.status(400).send({
      message: "error",
      detail: err.message
    });
  }
});

productStockRoute.post('/out/:stockId', async(req, res)=>{
  try{
    const { stockId } = req.params;

    const { 
      lote, 
      quantity,
      date 
    } = req.body;

    const productStock = await productStockModel.findOne({
      _id: stockId,
      lote,
    });

    if(!productStock){
      return res.status(404).send({
        message: 'product stock not found',
        status: false,
      });
    }

    const userbuildAt = Date.parse(date.buildAt);
    const userExpireAt = Date.parse(date.expireAt);
    const buildAt = Date.parse(productStock.date.buildAt);
    const expireAt = Date.parse(productStock.date.expireAt);

    if(userbuildAt !== buildAt || userExpireAt !== expireAt)
      return res.status(404).send({
        message: 'Lote date not found',
        status: false,
      });

    if(productStock.quantity){
      const q = quantity < 0? -(quantity):quantity
      const resultSub = productStock.quantity - q;
      if(resultSub < 0)
        return res.status(403).send({
          message: 'invalid sub quantity',
          detail: `${productStock.quantity} < ${quantity}`
        })
        await productStockModel.findOneAndUpdate({_id:stockId, lote}, {quantity: resultSub});
        const logs = await movimentsModel({
          productStockId: stockId,
          quantity: q,
          type: 'ou'
        });

        await logs.save();

        const updateStock = await productStockModel.findOne({_id: stockId});
        return res.status(202).send(updateStock);
    }

    res.status(403).send({
      message: 'product stock empty',
    });
  }catch(err){
    res.status(400).send({
      message: "error",
      detail: err.message
    });
  }
});

export default productStockRoute;