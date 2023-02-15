import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import {  keysProjectsBody, keysTechBody, queryResultProjects} from "../interfaces/projectsInterfaces";

export const ensureDataBodyProjects = async (req: Request,res: Response,next: NextFunction):Promise<Response | void> => {
  const requiredBody: Array<String> = Object.keys(req.body);
  const requiredKeys: Array<keysProjectsBody> = [
    "name",
    "description",
    "estimatedTime",
    "repository",
    "startDate",
    "developerId"
   
  ];


  const requestKeyBody: boolean = requiredKeys.every((elem: string) =>{
      return requiredBody.includes(elem)
    }
  );

  if (!requestKeyBody) {
  return  res.status(400).json({ message: `Requires keys: ${requiredKeys}` });
  }

  const {
    name,
    description,
    estimatedTime,
    repository,
    startDate,
    endDate,
    developerId,
  } = req.body;

  req.validateBodyProjects = {
    name,
    description,
    estimatedTime,
    repository,
    startDate,
    endDate,
    developerId,
  };

  return next();
};

export const ensureProjectsExists =async(req:Request,res:Response,next:NextFunction):Promise<Response | void >=>{
 const developerId:number= parseInt(req.params.id);

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

  const queryResult:queryResultProjects= await client.query(queryConfig);

  if (!queryResult.rowCount) {
   return res.status(404).json({ message: "Project not found" });
  }

  return next()

}

export const ensureDataTechnologies =async(req:Request,res:Response,next:NextFunction):Promise<Response | void>=>{
const keysBody:Array<String>=Object.keys(req.body)
const requiredKeys:Array<keysTechBody>=["technologyName"]


const requestKeyBody: boolean = requiredKeys.every((elem: string) =>{
  return keysBody.includes(elem)
}
);
if(!requestKeyBody){
  return res.status(400).json({message:`Required key: ${requiredKeys}`})
}


const{technologyName}=req.body

req.validadeTech={
  technologyName
}
next()
}