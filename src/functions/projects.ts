import { Request, Response } from "express";
import format from "pg-format";
import { iDataProjects, queryResultProjects } from "../interfaces/projectsInterfaces";
import { client } from "../database";

export const createProject = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createProjectBody: iDataProjects = req.body;

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
  
  const queryResult:queryResultProjects= await client.query(queryString)

  return res.status(201).json(queryResult.rows[0]);
};
