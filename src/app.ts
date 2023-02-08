import express,{Application} from "express"
import {startDatabase} from "./database"
import {ensureDataBody,ensureDeveloperExists} from "./middlewares"
import {registerDevelop,listAllDevelopers,listDevelopId}from "./functions"

const app:Application=express()
app.use(express.json())

app.post("/developers",ensureDataBody,registerDevelop)
app.get("/developers",listAllDevelopers)
app.get("/developers/:id",ensureDeveloperExists,listDevelopId)
app.listen(3000,async()=>{
    console.log("server is runing")
    await startDatabase()
    
})