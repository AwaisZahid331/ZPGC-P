export const validateRequest = (schema) => async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors.map((e) => e.message),
      });
    }
  };
  