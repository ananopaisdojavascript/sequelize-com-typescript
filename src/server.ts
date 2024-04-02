import express, { Request, Response } from "express";
import cors from "cors";

const app = express()

app.use(express.json())

app.use(cors())

app.use("/", (_request: Request, response: Response) => {
  response.send("Oi")
})

export default app;