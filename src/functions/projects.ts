import { Request, Response } from "express";
import format from "pg-format";
import {
  iDataProjects,
  queryResultProjects,
} from "../interfaces/projectsInterfaces";
import { client } from "../database";
import { QueryConfig } from "pg";

export const createProject = async (req: Request,res: Response): Promise<Response> => {
try {
  const createProjectBody: iDataProjects = req.validateBodyProjects;

  let queryString: string = format(
    `
    INSERT INTO
      projects(%I)
    VALUES
      (%L)
    RETURNING*;
    `,
    Object.keys(createProjectBody),
    Object.values(createProjectBody)
  );

  const queryResult: queryResultProjects = await client.query(queryString);
  return res.status(201).json(queryResult.rows[0]);
} catch (error) {
  if(error instanceof Error){
    return res.status(400).json({message:"Developer not found"})
  }
  return res.status(500).json()
}
};

export const listAllProjects = async (req: Request,res: Response): Promise<Response> => {
  const queryString: string = `
    SELECT
     *
    FROM
     projects
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
  };

  const queryResult: queryResultProjects = await client.query(queryConfig);
  return res.status(200).json(queryResult.rows);
};

export const listProjectId = async ( req: Request,res: Response): Promise<Response> => {
  const developerId: number = parseInt(req.params.id);
  const queryString: string = `
    SELECT
    *
    FROM
      projects
    WHERE
       id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: queryResultProjects = await client.query(queryConfig);
  return res.status(200).json(queryResult.rows[0]);
};

export const updateProject = async (req: Request,res: Response): Promise<Response> => {
  try {
  const updateBody:iDataProjects = req.validateBodyProjects;
  const idProject:number=parseInt(req.params.id)
  const queryString: string = format(
    ` 
   UPDATE
     projects
   SET (%I)= ROW (%L)
   WHERE
     id=$1
   RETURNING*;
    `,
    Object.keys(updateBody),
    Object.values(updateBody)
  );
  const queryConfig:QueryConfig={
    text:queryString,
    values:[idProject]
  }

  const queryResult:queryResultProjects=await client.query(queryConfig)
  return res.status(200).json(queryResult.rows[0]);
  } catch (error) {
    return  res.status(500).json()
  }
};

export const deleteProject=async(req:Request,res:Response):Promise<Response>=>{
 try {
  const idProject: number = parseInt(req.params.id);
  const queryString: string = `
  DELETE FROM
   projects
  WHERE
    id = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [idProject],
  };

  await client.query(queryConfig);
  return res.status(204).json();
 } catch (error) {
  return res.status(500).json()
 }

   
}
