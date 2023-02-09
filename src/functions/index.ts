import { Request, Response } from "express";
import {
  iDataDeveloper,
  developerResult,
  iDataDeveloperIncrement,
  iDataInfDeveloper,
  developerInfResult,
} from "../interfaces";
import { client } from "../database";
import format from "pg-format";
import { QueryConfig } from "pg";

export const registerDevelop = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const developerRegisterBody: iDataDeveloper = req.validateBody;

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
  const developerId: number = parseInt(req.params.id);

  const queryString = `
    SELECT
      dev.*,
      dinf."developerSince",
      dinf."preferredOS"
    FROM 
      developers dev
    LEFT JOIN
      develope_infos dinf ON dev."developerInfoId" = dinf.id
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
   
  };

  const queryResult: developerResult = await client.query(queryConfig);
  return res.json(queryResult.rows);
};

export const listDevelopId = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerId: number = parseInt(req.params.id);

  const queryString = `
    SELECT
      dev.*,
      dinf."developerSince",
      dinf."preferredOS"
    FROM 
      developers dev
    FULL JOIN
      develope_infos dinf ON dev."developerInfoId" = dinf.id
    WHERE 
      dev.id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: developerResult = await client.query(queryConfig);
  return res.json(queryResult.rows[0]);
};

export const registerInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
 try {
  const developerRegisterInfo: iDataInfDeveloper = req.body;
  const developerId: number = parseInt(req.params.id);

  let queryString: string = format(
    `
    INSERT INTO
      develope_infos (%I)
    VALUES
      (%L)
    RETURNING*  

  `,
    Object.keys(developerRegisterInfo),
    Object.values(developerRegisterInfo)
  );

  let queryResult: developerInfResult = await client.query(queryString);

  queryString = `
  UPDATE
     developers
   SET
     "developerInfoId" = $1
   WHERE
    id = $2
    RETURNING *;  
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [queryResult.rows[0].id, developerId],
  };
  await client.query(queryConfig);

  return res.status(201).json(queryResult.rows[0]);

 } catch (error:any) {
  if(error.code==="42703"){
    res.status(400).json({ message: "requires keys: developerSince,preferredOS" })
  }

 return  res.status(500)
 }
};
