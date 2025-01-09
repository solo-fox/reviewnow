import Fastify from "fastify";
import reviewRoute from "./routes/reviewRoute.js";
import auth from "./middleware/auth.js";
const fastify = Fastify({
  logger: true,
});

fastify.register(import("@fastify/swagger"))
fastify.register(import("@fastify/swagger-ui"), {
  routePrefix: "/docs"
})
fastify.register(reviewRoute, {
  prefix: "/api/v1"
})
fastify.addHook("preHandler", auth)

async function start() {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
