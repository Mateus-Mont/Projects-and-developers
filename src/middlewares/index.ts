import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { developerResult, keysDeveloperBody } from "../interfaces";

export const ensureDataBody = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const requiredBody: Array<string> = Object.keys(req.body);
  const requiredKeys: Array<keysDeveloperBody> = ["name", "email"];

  const requestKeyBody: boolean = requiredKeys.every((elem: string) =>
    requiredBody.includes(elem)
  );

  if (!requestKeyBody) {
    return res.status(400).json({ message: `requires keys: ${requiredKeys}` });
  }

  const { name, email } = req.body;

  req.validateBody = {
    name,
    email,
  };

  return next();
};

export const ensureDeveloperExists = async(
  req: Request,
  res: Response,
  next: NextFunction
):Promise<Response | void>  => {
  const developerId: number = parseInt(req.params.id);

  const queryString:string=`
  SELECT
  *
  FROM
     developers
  WHERE
     id = $1
  `
  const queryConfig:QueryConfig={
    text:queryString,
    values:[developerId]
    
  }

  const queryResult:developerResult= await client.query(queryConfig)
 if(!queryResult.rows[0]){
    res.status(404).json({message:"developer not found"})
 }

  return next();
};
