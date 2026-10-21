import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors"
import { startDB } from "./src/config/database.js";

const app=express()

const port=3003 || process.env.PORT

app.use(express())

app.listen(port, async()=>{
    try{
        await startDB()
        console.log("conectado exitosamente")
    }catch(error){
        console.log("error al conectar servidor")
    }
})
