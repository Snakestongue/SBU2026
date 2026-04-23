// import dotenv from "dotenv";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Debug block
// const envPath = path.resolve(__dirname, ".env");
// console.log("Does .env exist?", fs.existsSync(envPath));
// console.log("Looking at:", envPath);
// dotenv.config({ path: envPath });

// import connectDB from "./database.js";
// import app from "./app.js";
// dotenv.config({ path: path.resolve(__dirname, ".env") }); // same folder
// console.log("running?");
// const startServer= async ()=>{
//     try{
//         await connectDB();
//         const PORT = 9000;
//         app.listen(PORT, () =>{
//             console.log(`Server is running on port #${PORT}`);
//         });
//     }catch (error){
//         console.log("MONGO DB connection failed", error);
//     }
// };
// startServer();


import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") }); 

import connectDB from "./database.js";
import app from "./app.js";

const startServer = async () => {
    try {
        await connectDB();
        app.listen(4000, () => console.log("Server running on port 4000"));
    } catch (error) {
        console.log("MongoDB connection failed", error);
    }
};

startServer();