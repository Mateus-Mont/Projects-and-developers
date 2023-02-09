import express,{Application} from "express"
import {startDatabase} from "./database"
import {ensureDataBody,ensureDeveloperExists, ensureEmailDevelopExists} from "./middlewares"
import {registerDevelop,listAllDevelopers,listDevelopId, registerInfoDeveloper}from "./functions"

const app:Application=express()
app.use(express.json())

app.post("/developers",ensureDataBody,ensureEmailDevelopExists,registerDevelop)

app.get("/developers",listAllDevelopers)
app.get("/developers/:id",ensureDeveloperExists,listDevelopId)

app.post("/developers/:id/info",ensureDeveloperExists,registerInfoDeveloper)

app.listen(3000,async()=>{
    console.log("server is runing")
    await startDatabase()
    
})