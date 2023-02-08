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
