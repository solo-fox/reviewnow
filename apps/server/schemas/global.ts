const responseBodySchema = {
  200: {
    type: "object",
    properties: {
      statusCode: { type: "number" },
      error: { type: "string" },
      message: { type: "string" },
    },
  },
};

const headersBodySchema = {
  type: "object",
  properties: {
    "x-api-key": { type: "string", minLength: 20 },
  },
  required: ["x-api-key"],
};

export { responseBodySchema, headersBodySchema };
