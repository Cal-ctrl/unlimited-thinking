import unlimited from "./api/unlimited.route.js"
import express from "express";
import cors from "cors";
import path from "path";

export const __dirname = path.resolve()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));

app.use("/api", unlimited)

      
    //serve static assets if in production
    if (process.env.NODE_ENV === "production") {

        app.use(express.static(path.resolve(__dirname, `client/build`)));

        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
        });

        
    } 


app.use("*", (req, res) => res.status(404).json({error: "not Found"}))

export default app;
