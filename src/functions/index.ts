import { Request, Response } from "express";
import {
  iDataDeveloper,
  developerResult,
  iDataDeveloperIncrement,
} from "../interfaces";
import { client } from "../database";
import format from "pg-format";
import { QueryConfig } from "pg";

export const registerDevelop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const developerRegisterBody: iDataDeveloper = req.body;

    const queryString: string = format(
      `
    INSERT INTO
       developers(%I)
    VALUES
        (%L)
        RETURNING*; 

    `,
      Object.keys(developerRegisterBody),
      Object.values(developerRegisterBody)
    );

    const queryResult: developerResult = await client.query(queryString);
    const newDeveloper: iDataDeveloper = queryResult.rows[0];

    return res.status(201).json(newDeveloper);
  } catch (error: any) {
    if (error.code === "23505") {
      res.status(409).json({ message: "E-mail already registered" });
    }
    if (error.code === "42703") {
      res.status(400).json({ message: "requires keys: name,email" });
    }

    return res.status(500);
  }
};

export const listAllDevelopers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString: string = `
    SELECT
     *
    FROM
     developers
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
  };
  const queryResult: developerResult = await client.query(queryConfig);

  return res.status(200).json(queryResult.rows);
};

export const listDevelopId=async(req:Request,res:Response):Promise<Response>=>{
    const developerId: number = parseInt(req.params.id);

  const queryString=`
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



    return res.status(200).json(queryResult.rows[0])
}