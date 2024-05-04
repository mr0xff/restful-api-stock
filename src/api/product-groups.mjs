import { Router } from "express";
import productGroupModel from "../models/product-groups.mjs";

const productGroupRoute = Router();

productGroupRoute.get('/', async(req, res)=>{
  try{
    const productGroups = await productGroupModel.find();
    res.send(productGroups);
  }catch(err){
    res.status(500).send({
      message: "error on server",
      detail: err.message,
    });
  }
});


productGroupRoute.post('/', async(req, res)=>{
  try{
    const { name } = req.body;
    
    if(name){
      const createProductGroup = await productGroupModel({name});
      await createProductGroup.save();
      return res.status(202).send({
        message: 'product group was created :)',
        detail: createProductGroup._id
      });
    }

    res.status(400).send({
      message: 'empty :('
    });

  }catch(err){
    if(err.code == 11000)
      return res.status(403).send({
        message: 'product group exist :|'  
      })
    res.status(500).send({
      message: 'error',
      detail: err.message
    })
  }
});

productGroupRoute.delete('/:productGroupId', async(req, res)=>{
  try{
    const { productGroupId } = req.params;

    const productGroupDeleted = await productGroupModel.findByIdAndDelete(productGroupId);
    
    if(!productGroupDeleted)
      return res.status(404).send({
        message: 'product group not exist :('
      });
    
    res.send({
      message: `${productGroupDeleted.name} was deleted :)`
    });
  }catch(err){
    res.status(400).send({
      message: "error",
      detail: err.message
    });
  }
});

export default productGroupRoute;