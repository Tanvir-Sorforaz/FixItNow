import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application, type Request, type Response } from "express";


const app: Application = express();

app.use(cors());
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: "FixItNow API is running",
    });
});

app.use(express.json());



export default app;