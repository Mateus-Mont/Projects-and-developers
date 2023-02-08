import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      validateBody: {
        name: string;
        email: string;
      };
    }
  }
}
