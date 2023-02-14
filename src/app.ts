import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  ensureValidateDeveloperDataBody,
  ensureDataInfoBody,
  ensureDeveloperExists,
  ensureEmailDevelopExists,
} from "./middlewares/meddlewaresDevelopers";
import {
  registerDeveloper,
  listAllDevelopers,
  listDeveloperId,
  registerInfoDeveloper,
  updateDeveloper,
  deleteDeveloper,
  updateInfoDeveloper,
  listAllProjectsDeveloper,
} from "./functions/developers";

import {
  ensureDataBodyProjects,
  ensureDataTechnologies,
  ensureProjectsExists,
} from "./middlewares/middlewaresProjects";
import {
  createProject,
  deleteProject,
  deleteTechnologies,
  listAllProjects,
  listProjectId,
  registerTechnologies,
  updateProject,
} from "./functions/projects";

const app: Application = express();
app.use(express.json());

app.post( "/developers",ensureValidateDeveloperDataBody,ensureEmailDevelopExists,registerDeveloper);
app.post("/developers/:id/infos", ensureDeveloperExists,ensureDataInfoBody,registerInfoDeveloper);
app.get("/developers", listAllDevelopers);
app.get("/developers/:id", ensureDeveloperExists, listDeveloperId);
app.get("/developers/:id/projects",ensureDeveloperExists,listAllProjectsDeveloper);
app.patch("/developers/:id",ensureDeveloperExists,ensureEmailDevelopExists, ensureValidateDeveloperDataBody,updateDeveloper);
app.patch("/developers/:id/infos",ensureDeveloperExists,ensureDataInfoBody,updateInfoDeveloper);
app.delete("/developers/:id", ensureDeveloperExists, deleteDeveloper);



app.post("/projects", ensureDataBodyProjects, createProject);
app.post("/projects/:id/technologies",ensureProjectsExists,ensureDataTechnologies,registerTechnologies)
app.get("/projects", listAllProjects);
app.get("/projects/:id", ensureProjectsExists, listProjectId);
app.patch("/projects/:id",ensureProjectsExists,ensureDataBodyProjects,updateProject);
app.delete("/projects/:id", ensureProjectsExists,deleteProject);
app.delete("/projects/:id/technologies/:tecnologyName",ensureProjectsExists,deleteTechnologies)

app.listen(3000, async () => {
  console.log("server is runing");
  await startDatabase();
});
