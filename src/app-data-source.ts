import { DataSource } from "typeorm";
import User from "./entity/user.entity";

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'user_database',
  synchronize: true,
  entities: [User],
  logging: true
})

export default dataSource;