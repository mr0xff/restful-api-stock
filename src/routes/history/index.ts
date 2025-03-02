import type { FastifyPluginAsync } from "fastify";
import { randomUUID } from "node:crypto";

type FackHistory = {
  id: string;
  src: string;
  dst: string;
  amount: number;
  productId: string;
};

const history:FastifyPluginAsync = async function(fastify, opts){
  fastify.get('/', async function(req, res){
    const fakeHistories:FackHistory[] = Array(10).fill(1).map((item)=>{
      return {
        id: randomUUID(),
        src: randomUUID(),
        dst: randomUUID(),
        amount: Math.random()*1000,
        productId: randomUUID()
      }
    });
    
    res.send(fakeHistories);
  });
}

export default history;