import { FastifyPluginAsync } from "fastify";

const product:FastifyPluginAsync = async (fastify, opts)=>{
  fastify.post("/", async(req, res)=>{
    res.send({
      message: "hello sign"
    });
  });

  fastify.get("/", async(req, res)=>{
    res.send({
      hello: process.env.MESSAGE,
    })
  })
}

export default product;
