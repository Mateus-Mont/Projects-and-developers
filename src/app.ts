import express,{Application} from "express"
import {startDatabase} from "./database"
import {ensureDataBody} from "./middlewares"
import {registerDevelop,listAllDevelopers}from "./functions"

const app:Application=express()
app.use(express.json())

app.post("/developers",ensureDataBody,registerDevelop)
app.get("/developers",listAllDevelopers)
app.listen(3000,async()=>{
    console.log("server is runing")
    await startDatabase()
    
})