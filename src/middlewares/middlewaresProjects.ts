import { NextFunction, Request, Response } from "express";
import { keysProjectsBody } from "../interfaces/projectsInterfaces";

export const ensureDataBodyProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const requiredBody: Array<String> = Object.keys(req.body);
  const requiredKeys: Array<keysProjectsBody> = [
    "name",
    "description",
    "estimatedTime",
    "repository",
    "startDate",
    "developerId",
  ];

  const requestKeyBody: boolean = requiredKeys.every((elem: string) =>
    requiredBody.includes(elem)
  );

  if (!requestKeyBody) {
    res.status(400).json({ message: `requires keys: ${requiredKeys}` });
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
