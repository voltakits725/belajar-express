const validate = (schema, request) => {
  return schema.parse(request);
};

module.exports = { validate };
