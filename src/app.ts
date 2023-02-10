import express,{Application} from "express"
import {startDatabase} from "./database"
import {ensureDataBody,ensureDataInfoBody,ensureDeveloperExists, ensureEmailDevelopExists} from "./middlewares"
import {registerDevelop,listAllDevelopers,listDevelopId, registerInfoDeveloper, updateDeveloper, deleteDeveloper, updateInfoDeveloper}from "./functions"

const app:Application=express()
app.use(express.json())

app.post("/developers",ensureDataBody,ensureEmailDevelopExists,registerDevelop)
app.post("/developers/:id/info",ensureDataInfoBody,ensureDeveloperExists,registerInfoDeveloper)


app.get("/developers",listAllDevelopers)
app.get("/developers/:id",ensureDeveloperExists,listDevelopId)

app.patch("/developers/:id",ensureDeveloperExists,ensureEmailDevelopExists,updateDeveloper)
app.patch("/developers/:id/info",ensureDeveloperExists,ensureDataInfoBody,updateInfoDeveloper)

app.delete("/developers/:id",ensureDeveloperExists,deleteDeveloper)


app.listen(3000,async()=>{
    console.log("server is runing")
    await startDatabase()
    
})