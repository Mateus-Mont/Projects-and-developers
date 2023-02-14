import { QueryResult } from "pg";

export interface iDataProjects {
  name: string;
  description: string;
  estimatedTime: Date;
  repository: string;
  startDate: Date;
  endDate?: Date;
  developerId: number;
}

export interface iDataProjectsIncrement extends iDataProjects {
  id: number;
}

export type queryResultProjects = QueryResult<iDataProjectsIncrement>;

export type keysProjectsBody = "name"| "description"| "estimatedTime"| "repository"| "startDate" | "endDate"  |"developerId"





export interface keysRegisterTech{
  technologyName:string
}

export interface iDataTechIncrement extends  keysRegisterTech{
  id:number
}

export type queryResultTech=QueryResult<iDataTechIncrement>
export type keysTechBody="technologyName"