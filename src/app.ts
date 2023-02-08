import express,{Application} from "express"
import {startDatabase} from "./database"
import {ensureDataBody} from "./middlewares"
import {registerDevelop}from "./functions"

const app:Application=express()
app.use(express.json())

app.post("/developers",ensureDataBody,registerDevelop)
app.listen(3000,async()=>{
    console.log("server is runing")
    await startDatabase()
    
})