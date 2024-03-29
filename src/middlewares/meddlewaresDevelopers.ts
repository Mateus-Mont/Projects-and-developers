import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../database";
import {
  developerInfResult,
  developerResult,
  keysDeveloperBody,
  keysInfDeveloper,
  valueInfDeveloperPreferred,
} from "../interfaces/developersInterface";
import { iDataProjects } from "../interfaces/projectsInterfaces";

export const ensureValidateDeveloperDataBody = (req: Request,res: Response,next: NextFunction):Response | void => {
  const requiredBody: Array<string> = Object.keys(req.body);
  const requiredKeys: Array<keysDeveloperBody> = ["name" ,"email"];



  const requestKeyBody: boolean = requiredKeys.every((elem: string) =>
    requiredBody.includes(elem)
  );

  if (!requestKeyBody) {
    return res.status(400).json({ message: `Requires keys: ${requiredKeys}` });
  }
  const { name, email, ...extraKey } = req.body;

  req.validateBody = {
    name,
    email,
  };


  return next();
};

export const ensureDataInfoBody = async (req: Request,res: Response,next: NextFunction): Promise<Response | void> => {
  const requiredBody: Array<string> = Object.keys(req.body);

  const requiredPreferred: Array<valueInfDeveloperPreferred> = [
    "Windows",
    "Linux",
    "MacOs",
  ];

  const requiredInfBody: Array<keysInfDeveloper> = [
    "developerSince",
    "preferredOS",
  ];

  const requiredKeyInfBody: boolean = requiredInfBody.every((elem: string) =>
    requiredBody.includes(elem)
  );

  if (!requiredKeyInfBody) {
    return res
      .status(400)
      .json({ message: `Requires keys: ${requiredInfBody}` });
  }
  if (!requiredPreferred.includes(req.body.preferredOS)) {
    return res
      .status(400)
      .json({
        message: `Invalid value requires one of the values: ${requiredPreferred}`,
      });
  }

  const { developerSince, preferredOS, ...extraKey } = req.body;
  req.validateBodyInf = {
    developerSince,
    preferredOS,
  };

  return next();
};

export const ensureEmailDevelopExists = async (req: Request,res: Response,next: NextFunction):Promise<Response | void> => {
  const email = req.body.email;
  const queryString: string = `
    SELECT
      *
    FROM
      developers
    WHERE
      email = $1;
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };
  const queryResult: developerInfResult = await client.query(queryConfig);
  if (queryResult.rows.length > 0) {
    return res.status(409).send({ error: "email already in use" });
  }

  next();
};

export const ensureDeveloperExists = async (req: Request,res: Response,next: NextFunction):Promise<Response | void> => {
  const developerId: number = parseInt(req.params.id);

  const queryString: string = `
  SELECT
  *
  FROM
     developers
  WHERE
     id = $1
  `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: developerResult = await client.query(queryConfig);

  if (!queryResult.rows[0]) {
   return res.status(404).json({ message: "Developer not found" });
  }

  return next();
};
