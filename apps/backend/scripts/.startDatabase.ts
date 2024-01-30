import fs from "fs";
import { connection } from "../src/infrastructure/database/connection";
import { creatingClientSeedQuery } from "./creatingClientSeedQuery";
import { creatingPetsSeedQuery } from "./creatingPetsSeedQuery";
import { creatingScheduleSeedQuery } from "./creatingScheduleSeedQuery";

async function start() {
  const sql = fs.readFileSync("./apps/backend/database.sql", "utf8");
  const db = await connection();
  console.info("Creating tables if not exists...");
  await db.query(sql);
  console.info("Tables created...");
  const clientsNumber = await db.query("SELECT COUNT(*) FROM clients");
  const petsNumber = await db.query("SELECT COUNT(*) FROM pets");
  const schedulesNumber = await db.query("SELECT COUNT(*) FROM schedules");
  const isEmpty = (answer: any): boolean => {
    return answer.rows[0].count === "0";
  };
  if (
    isEmpty(clientsNumber) &&
    isEmpty(petsNumber) &&
    isEmpty(schedulesNumber)
  ) {
    console.info("Start seeding...");
    const petsQuery = creatingPetsSeedQuery();
    console.info("Creating Pets...");
    await db.query(petsQuery);
    const allPets = await db.query("SELECT * FROM pets");
    const clientsQuery = creatingClientSeedQuery(allPets.rows);
    console.info("Creating Clients...");
    await db.query(clientsQuery);
    const allClients = await db.query("SELECT * FROM clients");
    const schedulesQuery = creatingScheduleSeedQuery(allClients.rows);
    console.info("Creating Schedules...");
    await db.query(schedulesQuery);
    console.info("Seed finished!");
  } else {
    console.info("Database is not empty");
  }
}
start();
