import express from "express";
import { getPodcasts } from "./controllers/podcast-controller";
import cors from "cors"
import dotenv from "dotenv"
import path from "path";

dotenv.config({ path: path.join(__dirname, '../.env') });

export const app = express();

app.use(cors())

app.get("/podcast", getPodcasts)

const port = process.env.PORT ?? 8080

app.listen(port, () => {
    console.log(`server started at localhost: ${port}`)
})
