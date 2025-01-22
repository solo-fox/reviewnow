import { FastifyInstance } from "fastify";
import createReview from "../controllers/reviewController.js";
import { createReviewBodySchema } from "../schemas/reviewSchema.js";
import { headersBodySchema, responseBodySchema } from "../schemas/global.js";

async function reviewRoute(fastify: FastifyInstance) {
  fastify.route({
    method: "POST",
    url: "/reviews",
    schema: {
      body: createReviewBodySchema,
      headers: headersBodySchema,
      response: responseBodySchema,
    },
    handler: createReview,
  });
}

export default reviewRoute;
