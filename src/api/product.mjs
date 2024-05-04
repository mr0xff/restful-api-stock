import { Router } from "express";
import productModel from "../models/product.mjs";

const productRoute = Router();

productRoute.get('/', async(req, res)=>{
  try{
    const productGroups = await productModel.find();
    res.send(productGroups);
  }catch(err){
    res.status(500).send({
      message: "error on server",
      detail: err.message,
    });
  }
});

productRoute.post('/', async(req, res)=>{
  try{
    const { name, productGroupId } = req.body;
    
    if(name && productGroupId){
      const createProduct = await productModel({name, productGroupId});
      await createProduct.save();
      return res.status(202).send({
        message: 'product was created :)',
        detail: createProduct._id
      });
    }

    res.status(400).send({
      message: 'empty :('
    });

  }catch(err){
    if(err.code == 11000)
      return res.status(403).send({
        message: 'product exist :|'  
      })
    res.status(500).send({
      message: 'error',
      detail: err.message
    })
  }
});

productRoute.delete('/:productId', async(req, res)=>{
  try{
    const { productId } = req.params;

    const productDeleted = await productModel.findByIdAndDelete(productId);
    
    if(!productDeleted)
      return res.status(404).send({
        message: 'product not exist :('
      });
    
    res.send({
      message: `${productDeleted.name} was deleted :)`
    });
  }catch(err){
    res.status(400).send({
      message: "error",
      detail: err.message
    });
  }
});

export default productRoute;