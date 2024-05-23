import express, { Request, Response } from 'express';
import cors from 'cors';
import User from './entity/user.entity';
import dataSource from './app-data-source';

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error)
  })

const app = express();
app.use(cors());
app.use(express.json());

const port = 8080;

app.get("/users", async (_req: Request, res: Response) => {
  const users = await dataSource.getRepository(User).find();
  return res.json(users);
})

app.get("/users/:id", async function (req: Request, res: Response) {
  const { id } = req.params
  const results = await dataSource.getRepository(User).findOneBy({id});
  return res.send(results)
})

app.post("/users", async function (req: Request, res: Response) {
  const user = dataSource.getRepository(User).create(req.body)
  const results = await dataSource.getRepository(User).save(user)
  return res.send(results)
})

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await dataSource.getRepository(User).findOneBy({
      id: req.params.id,
  });
  if (user) {
    dataSource.getRepository(User).merge(user, req.body);
    const results = await dataSource.getRepository(User).save(user);
    return res.send(results);
  } else {
    return res.status(404).send("User not found");
  }
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await dataSource.getRepository(User).delete(req.params.id)
  return res.send(results)
})

app.listen(port, () => {
  console.log(port)
})