import { Request, Response } from "express";
import {
  iDataDeveloper,
  developerResult,
  iDataDeveloperIncrement,
  iDataInfDeveloper,
  developerInfResult,
  iDataDeveloperInfIncrement,
} from "../interfaces/developersInterface";
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

  const queryResult: developerResult = await client.query(queryString);
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

export const listAllProjectsDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {

  const idDeveloper:number=parseInt(req.params.id)

  const queryString: string = `

  SELECT
    pj.*,
    dev."name",
    dev."email"
  FROM 
    projects pj
  FULL JOIN
    developers dev ON pj."developerId" = dev.id
  WHERE 
   dev.id = $1;

`;
const queryConfig:QueryConfig={
  text:queryString,
  values:[idDeveloper]
}

const queryResult=await client.query(queryConfig)

  return res.status(200).json(queryResult.rows);
};

export const registerInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const developerRegisterInfo: iDataInfDeveloper = req.validateBodyInf;
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
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: "requires keys: developerSince,preferredOS" });
    }

    return res.status(500);
  }
};

export const updateDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idDeveloper: number = parseInt(req.params.id);
  try {
    const queryString: string = format(
      `
    UPDATE
      developers
    SET (%I)= ROW (%L)
    WHERE
      id=$1
    RETURNING*;

  `,
      Object.keys(req.body),
      Object.values(req.body)
    );

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [idDeveloper],
    };

    const queryResult: developerResult = await client.query(queryConfig);

    return res.status(200).json(queryResult.rows[0]);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: " requires keys: name or email" });
    }
    return res.status(500);
  }
};

export const updateInfoDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const developerId: number = parseInt(req.params.id);

  let queryString: string = `
    SELECT
    *
   FROM 
     developers
   WHERE 
     id=$1;
    `;

  let getQueryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult = await client.query(getQueryConfig);

  let queryStringUpdate: string = format(
    `
    UPDATE
      develope_infos
    SET (%I)= ROW (%L)
    WHERE
      id=$1
    RETURNING *
    `,
    Object.keys(req.body),
    Object.values(req.body)
  );

  getQueryConfig = {
    text: queryStringUpdate,
    values: [queryResult.rows[0].developerInfoId],
  };

  const updatequeryResult: developerInfResult = await client.query(
    getQueryConfig
  );

  return res.status(200).json(updatequeryResult.rows[0]);
};

export const deleteDeveloper = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idDeveloper: number = parseInt(req.params.id);

  const queryString: string = `
  DELETE FROM
    developers
  WHERE
    id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idDeveloper],
  };

  await client.query(queryConfig);

  return res.status(204).json();
};
