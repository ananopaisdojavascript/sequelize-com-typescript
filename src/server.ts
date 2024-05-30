import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.get('/', (_request: Request, response: Response) => {
  return response.send('Hey 😇😇😇')
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})