import { Router } from 'express';

import movimentsModel from '../models/moviments.mjs';

const productLogsRoute = Router();

productLogsRoute.get('/', async(req, res)=>{
    try{
        const logs = await movimentsModel.find();
        res.send(logs);
    }catch(err){
        res.status(401).send({
            message: 'error',
            detail: err.message
        });
    }
});

productLogsRoute.get('/:productStockId', async(req, res)=>{
    try{
        const { productStockId } = req.params;

        const logsStock = await movimentsModel.find({productStockId});
        
        res.send(logsStock);
    }catch(err){
        res.status(500).send({
            message: 'error',
            detail: err.message
        });
    }
});

export default productLogsRoute;
