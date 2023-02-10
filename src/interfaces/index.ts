import { QueryResult } from "pg";

export interface iDataDeveloper {
  name: string;
  email: string;
}

export interface iDataDeveloperIncrement extends iDataDeveloper {
  id: number;
}

export type developerResult = QueryResult<iDataDeveloperIncrement>;
export type keysDeveloperBody = "name" | "email";






export  interface iDataInfDeveloper{
  developerSince:Date;
  preferredOS:string;
}

export interface iDataDeveloperInfIncrement extends iDataInfDeveloper{
  id:number;
}

export type developerInfResult=QueryResult<iDataDeveloperIncrement>;

export type keysInfDeveloper ="developerSince" | "preferredOS";
export type valueInfDeveloperPreferred="Windows" | "Linux" | "MacOs";