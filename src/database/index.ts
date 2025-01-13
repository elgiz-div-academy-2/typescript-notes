import { join } from "path";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Note } from "./entities/Note.entity";

const sqlitePath = join(__dirname, "../../database.sqlite");

const dataSource = new DataSource({
  type: "sqlite",
  database: sqlitePath,
  synchronize: true,
  logging: true,
  entities: [User, Note],
});

dataSource
  .initialize()
  .then(() => {
    console.log(`Database is connected successfully`);
  })
  .catch((err) => {
    console.log(`Database connection failed`, err);
  });

export default dataSource;
