import * as express from "express";
declare global {
  namespace Express {
    interface Request {
      validateBody: {
        name: string;
        email: string;
      };
     
      validateBodyInf: {
        developerSince: Date;
        preferredOS: string;
      };
      validateBodyProjects:{
        name: string;
        description: string;
        estimatedTime: Date;
        repository: string;
        startDate: Date;
        endDate?: Date;
        developerId: number;
      };
      validadeTech:{
        name:string
      }
    }
  }
}
