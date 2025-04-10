import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
} // w ten sposób możemy zmodyfikować istniejącą
// definicję typu, nie musimy robić extends Request
// 

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req);
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      // słuzy odszyfrowaniu
      req.session.jwt, // danych JWT
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
