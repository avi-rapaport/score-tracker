import { z } from "zod";
import { fa, fi } from "zod/locales";

export const scoreSchema = z.object({
  playerName: z.string().min(2),
  game: z.enum(["tetris", "snake", "space-invaders"]),
  points: z.number().int().positive(),
  level: z.number().int().positive().optional(),
  duration: z.number().int().positive().optional(),
});

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldError = JSON.parse(result.error).map(
        (f) => f.path + ": " + f.message,
      );
      const error = new Error("Invalid data! ");
      error.statusCode = 400;
      error.fieldError = fieldError;
      return next(error);
    }
    req.body = result.data;
    next();
  };
}

export async function errorHandling(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.statusCode ? err.message : "Internal server error";
  let jsonResponse = { Success: false, Message: message };

  if (err.fieldError) {
    jsonResponse.fieldError = err.fieldError;
  }

  res.status(statusCode).json(jsonResponse);
}
