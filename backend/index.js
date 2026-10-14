import express from"express";
import db from "./db/db.config.js";
import mainRouter from "./src/api/main.routes.js";
import { errorHandler } from "./src/middleware/error-handler.js";
import cors from "cors"

const app = express()
//we are receiving json
app.use(express.json());

//giving access to our frontend
app.use(cors());
// app.get("/health", (req, res)=>{
//     res.send("hello from backend")
// })

app.use("/api", mainRouter);


//error middleware
app.use(errorHandler)



let PORT = process.env.PORT;
async function startServer(){
    try {
        let connection = await db.getConnection();
        connection.release();
        console.log("db connected")
        app.listen(PORT, ()=>{
        console.log(`server is running on port http://localhost:${PORT}`)
})
    } catch (error) {
       console.log(error) 
    }
}
startServer()

