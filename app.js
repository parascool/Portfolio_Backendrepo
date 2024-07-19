import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from "dotenv";
import cors from "cors";
import fileUpload from 'express-fileupload';
import { dbConnection } from './database/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import AdminRouter from "./routes/AdminRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
config({ path:"./.env" });

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        method: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
)

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
   })
)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", AdminRouter);



dbConnection();
app.use(errorMiddleware);

export default app;