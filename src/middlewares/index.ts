import {Request,Response, NextFunction } from "express";
import { keysDeveloperBody } from "../interfaces";

export const ensureDataBody =(req:Request,res:Response,next:NextFunction):Response | void=>{
    const requiredBody:Array<string>=Object.keys(req.body)
    const requiredKeys:Array<keysDeveloperBody>=["name","email"]

    const requestKeyBody: boolean = requiredKeys.every((elem: string) =>
    requiredBody.includes(elem)
  );

  if (!requestKeyBody) {
    return res
      .status(400)
      .json({ message: `requires keys: ${requiredKeys}` });
  }

  const {name,email}=req.body

  req.validateBody={
    name,
    email
  }

    return next()
    
}