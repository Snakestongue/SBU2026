import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import userRouter from "./routes.js";

const app = express();
app.get("/health", (req, res) => {
console.log("Health");
res.send("Check")
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/SMPG", (req, res, next) => {
    console.log("SMPG router hit!", req.method, req.path);
    next();
}, userRouter);
const frontendPath = path.join(__dirname, "../../FRONTEND");
app.use(express.static(frontendPath));


app.get('{/*path}', (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

export default app;