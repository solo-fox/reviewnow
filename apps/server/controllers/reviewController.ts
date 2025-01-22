import { FastifyReply, FastifyRequest } from "fastify";

async function createReview(request: FastifyRequest, reply: FastifyReply) {
  reply.code(200).send({
    message: "Review created successfully",
  });
}

export default createReview;
