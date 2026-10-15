function validate(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    req.validated = { ...req.validated, [source]: result.data };
    // Express 5 exposes req.query through a getter, so assigning to req.query
    // does not replace the parsed values. Keep the validated query separately.
    if (source !== "query") req[source] = result.data;
    return next();
  };
}

module.exports = validate;
